import React from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Img = styled.div`
    max-height: 300px;

    @media (max-width: 768px) {
        max-height: 220px;
      }

    @media (max-width: 600px) {
        max-height: 150px;
    }
`;

const Container = styled.div`
    margin: 0 auto;
    jusify-items: center;
    width: 85%;
`;


function DropGallery({ images }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
            {
            breakpoint: 1000,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
        ]
      };
      
    return(
        <Container>
            <Slider {...settings}>
                {images.map((image, index) => (
                <Img key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                </Img>
            ))}
            </Slider>
        </Container>
    )
}

export default DropGallery;