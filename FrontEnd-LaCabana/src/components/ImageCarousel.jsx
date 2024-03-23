import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";

export default function ImageCarousel() {
  const images = [
    process.env.PUBLIC_URL + "/foto1.gif",
    process.env.PUBLIC_URL + "/foto2.jpg",
    process.env.PUBLIC_URL + "/foto4.png",
    process.env.PUBLIC_URL + "/foto3.jpg",
  ];

  return (
    <Carousel
      autoPlay
      interval={5000}
      infiniteLoop
      showThumbs={false}
      className="carousel slide"
      heightRatio={0.5}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={` ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
}
