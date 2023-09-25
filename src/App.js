import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Drawer from './components/Drawer/Drawer'
import AppContext from './context'

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/cart'),
            axios.get('https://64db174b593f57e435b069be.mockapi.io/favorites'),
            axios.get('https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/items'),
          ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Data request error ;(')
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          'https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/cart',
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert("Something get wrong! Don't click too fast! MockAPI needs time")
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://64d8b8cb5f9bf5b879ce7d61.mockapi.io/cart/${id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
    } catch (error) {
      alert("Delete from cart error! Don't click too fast! MockAPI needs time")
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => +favObj.id === +obj.id)) {
        axios.delete(
          `https://64db174b593f57e435b069be.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://64db174b593f57e435b069be.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert("Add to favorites error! Don't click too fast! MockAPI needs time")
      console.error(error)
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => +obj.parentId === +id)
  }

  const isFavorited = (id) => {
    return favorites.some((obj) => +obj.parentId === +id)
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isFavorited,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path="favorites" exact element={<Favorites />}></Route>

          <Route path="orders" exact element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
