import React from 'react'
import './home.scss'
import logo from '../../assets/logo.png'
import heart from '../../assets/heart.png'
import messages from '../../assets/messages.png'

const Home = () => {
    return (
        <div className='home'>
        <div className='home__images'>
            <img src={logo} alt="" />
            <div className='home__vectors'>
                <img className='home__vector' src={heart} alt="" />
                <img className='home__vector' src={messages} alt="" />
            </div>
        </div>

        <div className='home__yourStory'>
            <input className='home__url' type="url" />
            <span className='home__span'>Your Story</span>
        </div>

        </div>
    )
}

export default Home