import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ReactSlider = props => {
  const {moviesList} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settings}>
        {moviesList.map(eachMovie => (
          <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
            <div className="slider-img-container">
              <img
                className="slider-img"
                src={eachMovie.backdropPath}
                alt={eachMovie.title}
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlider
