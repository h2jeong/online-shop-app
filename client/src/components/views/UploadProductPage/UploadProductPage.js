import React from "react";
import Title from "antd/lib/skeleton/Title";
import { Form, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

function UploadProductPage() {
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>
      <Form onSubmit>
        {/* Dropzone */}

        <br />
        <br />
        <label>Title</label>
        <Input onChange value />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange value />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange value />
        <br />
        <br />
        <select onChange value>
          <option value>option</option>
        </select>
        <br />
        <br />
        <Button onClick>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
