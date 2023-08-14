import React from 'react'
import './postUser.scss'
import heart from '../../assets/heart.png'
import comment from '../../assets/comment.png'
import send from '../../assets/send.png'

const PostUser = () => {
  return (
    <div className='post'>
      <img className='post__image' src="https://s3-alpha-sig.figma.com/img/e16a/f17a/4805fb0a220637377cce1952fd4f4a39?Expires=1693180800&Signature=TIV6UK-wjy08selUQQsWxhJTU4O731UP8DrGCjlHxKfLQW49RMeiMLWM-vuQFZdhb0Vx~udYwPsEIFxoYXjEpb90REvuqtA9RL52gBd3hrpYhg5WID2H6USr20Ia6r3dcmiFFNESLHoZKtaQeCsPhy8pSJCmYcR99gU-bZi-zYqWsaZXY1zv9oZeCVugEpj52hWmpI-IdXqrBKrLjMcXx9o7qouAwEVz7xOTiIJENbgsZ9YnH2CiifsQpjyzDPZziU5FvMYct1Gschb9ElY8dj-Gc4O~1HEvYrLTky9iNwaIBvjnMZCco2Qnhf~YkldiWvH~wN6Qoq55~T9ZURKfuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />

      <div className='post__all'>

        <div className='post__info'>

          <div className='post__user-name'>
            <input className='post__input' type="url" />
            <p className='post__name'>Jennie Kim</p>
          </div>

          <div className='post__quantity'>
            
          <div className='post__div'>
            <img className='post__icons' src={heart} alt="" />
            <p>108K</p>
          </div>
          <div className='post__div'>
            <img className='post__icons' src={comment} alt="" />
            <p>54K</p>
          </div>
          <div className='post__div'>
            <img className='post__icons' src={send} alt="" />
            <p>2K</p>
          </div>

          </div>

        </div>

        <div className='post__paragraph'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat provident aperiam laboriosam delectus fugit tempore voluptatum soluta, rerum necessitatibus, esse perspiciatis cumque totam ratione iusto, ipsa sint repudiandae. Hic, facere.
          </p>
        </div>

        <div className='post__comment'>
          <input className='post__commentUser' type="url" />
          <input className='post__commentMessage' type="text" placeholder='Write comment as username...' />
        </div>

      </div>



    </div>
  )
}

export default PostUser