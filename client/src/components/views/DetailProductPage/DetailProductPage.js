import React from "react";
import { Row, Col } from "antd";
import ImageGallery from "react-image-gallery";

function DetailProductPage() {
  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>title</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* productImage */}
          <ImageGallery />
        </Col>
        <Col lg={12} xs={24}>
          info
          {/* productInfo */}
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
