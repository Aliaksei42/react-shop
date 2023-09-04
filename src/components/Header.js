import React from 'react'
import { Link } from 'react-router-dom'
import cart from '../images/cart.svg'
import like from '../images/heart.svg'
import user from '../images/user.svg'

import { useCart } from '../hooks/useCart'

function Header(props) {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src={require('../images/logo.png')} alt="Logo" />

          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Shop of the best sneakers</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src={cart} alt="Cart" />
          <span>{totalPrice} Euro</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src={like} alt="Like" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src={user} alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
