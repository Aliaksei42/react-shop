import React from 'react'
import Card from '../components/Card/Card'
import btnRemove from '../images/btn-remove.svg'
import search from '../images/search.svg'

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems =
      items &&
      items?.filter((item) =>
        item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase())
      )

    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40 ">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Search by request: "${searchValue}"` : `All sneakers`}
        </h1>
        <div className="search-block d-flex">
          <img src={search} alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src={btnRemove}
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
