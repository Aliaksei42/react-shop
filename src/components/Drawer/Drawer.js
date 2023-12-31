import React from 'react'
import axios from 'axios'

import Info from '../Info'
import { useCart } from '../../hooks/useCart'
import remove from '../../images/btn-remove.svg'
import arrow from '../../images/arrow.svg'
import completeOrder from '../../images/complete-order.jpg'
import emptyCart from '../../images/empty-cart.jpg'

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        'https://64db174b593f57e435b069be.mockapi.io/orders',
        { items: cartItems }
      )
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          'https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/cart/' + item.id
        )
        await delay(1000)
      }
    } catch (error) {
      alert('Error creating order :(')
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Cart
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src={remove}
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <img
                    width="30%"
                    height="30%"
                    src={require(`../../images/sneakers/${obj.imageUrl}`)}
                    alt="Sneakers"
                  />

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} Euro</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn left"
                    src={remove}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} Euro</b>
                </li>
                <li>
                  <span>Taxes 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} Euro </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Checkout <img src={arrow} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Order is processed' : 'Cart is empty'}
            description={
              isOrderComplete
                ? `Your order #${orderId} will be handed over to the courier soon`
                : 'Add something to your cart to place an order'
            }
            image={isOrderComplete ? completeOrder : emptyCart}
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
