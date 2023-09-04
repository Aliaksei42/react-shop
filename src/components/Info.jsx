import React from 'react'
import AppContext from '../context'
import arrow from '../images/arrow.svg'

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="Cart is empty"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>

      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src={arrow} alt="Arrow" />
        Come back
      </button>
    </div>
  )
}

export default Info
