import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const onDrop = files => {
    let formData = new FormData();
    const config = { header: { "content-type": "multipart/form-data" } };
    formData.append("file", files[0]);

    axios.post("/api/product/uploadImage", formData, config).then(res => {
      if (res.data.success) {
        setImages([...Images, res.data.image]);
        props.refreshFunction([...Images, res.data.image]);
      } else {
        alert("Failed to save the image in Server");
      }
    });
  };

  const onDelete = image => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll"
        }}
      >
        {Images.map((img, idx) => (
          <div onClick={() => onDelete(img)}>
            <img
              src={`http://localhost:5000/${img}`}
              alt={`productImg-${idx}`}
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
