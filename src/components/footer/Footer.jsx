import React from 'react'
import './footer.scss'
import home from '../../assets/home.png'
import bell from '../../assets/bell.png'
import search from '../../assets/search.png'
import add from '../../assets/add.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__left'>
                <img src={home} alt="" />
                <img src={search} alt="" />
            </div>
            <div className='footer__center'>
                <img src={add} alt="" />
            </div>
            <div className='footer__right'>
                <img src={bell} alt="" />
                <button className='footer__user' ></button>
            </div>
        </div>
    )
}

export default Footer