import React, { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage(props) {
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    let productId = props.match.params.productId;

    // axios.post('/api/product/productsById', {productId})
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.product[0]);
        } else {
          message.error("Failed to get product by Id");
        }
      });
  }, []);

  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* productImage */}
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24}>
          {/* productInfo */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
