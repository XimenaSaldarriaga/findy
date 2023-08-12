import React from 'react'
import './home.scss'
import logo from '../../assets/logo.png'
import heart from '../../assets/heart.png'
import messages from '../../assets/messages.png'
import comment from '../../assets/comment.png'
import send from '../../assets/send.png'
import save from '../../assets/save.png'

const Home = () => {

    const storyData = [

        { name: 'Ximena' },
        { name: 'Neis' },
        { name: 'Ana Maria' },
        { name: 'Juanito' },
    ];
    return (
        <div className='home'>

            <div className='home__header'>
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

            <div className='home__main'>

                <div className='home__post'>

                    <div className=' home__postHeader'>
                        <div className='home__input'>
                            <input className='home__imgPost' type="url" />
                        </div>
                        <span className='home__span'>Neis</span>
                    </div>

                    <img className='home__postImagen' src="https://s3-alpha-sig.figma.com/img/0d75/74ae/a75180ac4497e875a99cbb62895b8aa8?Expires=1692576000&Signature=XqdnCHyXrL-uhi3VcWyfyoaVFW9dnxk~C5bbGUnJ6IeTP3JxURzah0JWpFV0szsIa99nVRwjaO3GkrMZLAR8kByPiiEQEOVzWV4TARWaytnKsUNm525x6oSjcTDQB6tQh5y1hoGVv~3HYPHKZDai6g-o2SxZuIyyWU11fs6Ba~V4I1kz84-16o3ySwbZxYyVV5qOHMKTxQn0svD6~bJ4cPpSCa8pA26QYxChb81yhinkNAj9q8f1qTj7ABr1ag0z5haUDdx~PbEyrUGKwgkS06ofOP~54wPcW7V8mxZL2JwOf0oFy7m5T-zgjspM6ugCcpKS7VHtE3NwI3rQbeAoag__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />


                    <div>


                        <div className='home__postOptions'>
                            <div className='home__options'>
                                <div className='home__option'>
                                    <img src={heart} alt="" />
                                    <p>300K</p>
                                </div>
                                <div className='home__option'>
                                    <img src={comment} alt="" />
                                    <p>87K</p>
                                </div>
                                <div className='home__option'>
                                    <img src={send} alt="" />
                                    <p>10K</p>
                                </div>
                            </div>

                            <div><img src={save} alt="" /></div>
                        </div>

                        <div>
                            <p className='home__footer'> <span className='home__nameFooter'>Neis Rosado</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam consectetur maiores aperiam cumque eum voluptatibus dignissimos accusantium natus aspernatur veritatis, quia harum sunt sint blanditiis ipsa autem molestias quae culpa.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home









