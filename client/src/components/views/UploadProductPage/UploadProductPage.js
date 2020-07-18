import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { useSelector } from "react-redux";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" }
];

function UploadProductPage(props) {
  const user = useSelector(state => state.user);
  const [TitleValue, setTitleValue] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [Images, setImages] = useState([]);

  const onTitleChange = e => {
    setTitleValue(e.currentTarget.value);
  };
  const onDescriptionChange = e => {
    setDescription(e.currentTarget.value);
  };
  const onPriceChange = e => {
    setPrice(e.currentTarget.value);
  };
  const onContinentsSelectChange = e => {
    setContinentValue(e.currentTarget.value);
  };
  const updateImages = newImages => {
    // console.log(newImages);
    setImages(newImages);
  };
  const onSubmit = e => {
    e.preventDefault();

    if (!TitleValue || !Description || !Price || !ContinentValue || !Images) {
      return alert("Fill all the fields first!");
    }

    const variables = {
      writer: user.auth.user._id,
      title: TitleValue,
      description: Description,
      price: Price,
      continent: ContinentValue,
      images: Images
    };
    axios.post("/api/product/uploadProduct", variables).then(res => {
      if (res.data.success) {
        alert("Products Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem"
        }}
      >
        <Title level={3}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        {/* Dropzone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" onChange={onPriceChange} value={Price} />
        <br />
        <br />
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map(item => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadProductPage);
