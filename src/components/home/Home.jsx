import React from 'react'
import './home.scss'
import logo from '../../assets/logo.png'
import heart from '../../assets/heart.png'
import messages from '../../assets/messages.png'

const Home = () => {

    const storyData = [

        { name: 'Ximena' },
        { name: 'Neis' },
        { name: 'Ana Maria' },
        { name: 'Juanito' },
    ];
    return (
        <div className='home'>

            <div className='home__images'>
                <img src={logo} alt="" />
                <div className='home__vectors'>
                    <img className='home__vector' src={heart} alt="" />
                    <img className='home__vector' src={messages} alt="" />
                </div>
            </div>

            <div className='home__stories'>
                <div className='home__myStory home__yourStory'>
                    <div className='home__input'>
                        <input className='home__url home__myImage' type="url" placeholder='+' />
                    </div>
                    <span className='home__span'>Your Story</span>
                </div>

                <div className='home__allStories'>
                    {storyData.map((story, index) => (
                        <div className='home__yourStory' key={index}>
                            <input className='home__url' type="url" />
                            <span className='home__span'>{story.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home









