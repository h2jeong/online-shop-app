import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images.map((img, idx) => (
        <div key={idx}>
          <img
            style={{ width: "100%", height: "150px" }}
            src={`http://localhost:5000/${img}`}
            alt="productImage"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
