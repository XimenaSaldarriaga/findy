import React from 'react'
import './profile.scss'

const Profile = () => {
  return (
    <div className='profile'>
      <img className='profile__image' src="https://s3-alpha-sig.figma.com/img/9b3b/6ddb/0ccefa9a4a76163a79e386eba01d08ba?Expires=1692576000&Signature=cUPjrviqt1qRSix6Kai52mgjogKJbwls~~8bYJtYG2o7DowGlKkU8iT~tuPLfeZAyWKM14MkqlNJeuoC93xPoaxv-Qq2Qm7gaJd4ENRwI9a3ksx1~OHC5LzkgdjcQvqMPPVZBkF82Bz~wp2QbcRnwMYbj7Gc-pdCC2P3W9TqGDnC57TwN9sNqZlZD8feXk47co-Ww33avVnXrFea7E3qXSlKkD~9Okx6rTBcq11-tNUUTqplryfxXGMM-dCVqofKcYfOs1GAO5WsWDemWzRAY98mPuNsjcW-39ifUecMBCATEYORuIASCnrS6na4zapL8N7-nFofpKZzurBbLDtO4A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />

      <div className='profile__info'>

        <div className='profile__likes'>
          <div className='profile__option'>
            <p className='profile__subtitle'>10.7 M</p>
            <p>Followers</p>
          </div>
          <input className='profile__input' type="url" />
          <div className='profile__option'>
            <p className='profile__subtitle'>108.3 M</p>
            <p >Likes</p>
          </div>
        </div>

        <div className='profile__personal'>
          <p className='profile__subtitle'>Jennie Kim</p>
          <div className='profile__about'>
            <p>Hello Guys</p>
            <p>Follow and like my post</p>
          </div>
        </div>

        <div className='profile__buttons'>
          <button>Follow</button>
          <button>Messages</button>
        </div>

      </div>




    </div>
  )
}

export default Profile