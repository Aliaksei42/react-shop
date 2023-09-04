import React from 'react'
import ContentLoader from 'react-content-loader'
import heartLiked from '../../images/heart-liked.svg'
import heartUnliked from '../../images/heart-unliked.svg'
import btnChecked from '../../images/btn-checked.svg'
import btnPlus from '../../images/btn-plus.svg'

import AppContext from '../../context'
import styles from './Card.module.scss'

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded, isFavorited } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const obj = { id, parentId: id, title, imageUrl, price }

  console.log(imageUrl)
  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickFavorite = () => {
    onFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 165 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="11" ry="11" width="155" height="90" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="8" ry="8" width="80" height="24" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorited(id) ? heartLiked : heartUnliked}
                alt="Unliked"
              />
            </div>
          )}
          <img
            width="100%"
            height={135}
            src={require(`../../images/sneakers/${imageUrl}`)}
          
            alt="Sneakers"
          />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price} Euro</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? btnChecked : btnPlus}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
