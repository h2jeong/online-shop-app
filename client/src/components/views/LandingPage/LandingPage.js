import React, { useEffect, useState } from "react";
import { Radio, Row, Col, Card } from "antd";
import Search from "antd/lib/input/Search";
import { RocketOutlined } from "@ant-design/icons";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBoxGroup from "./Sections/CheckBoxGroup";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(6);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ continents: [], price: [] });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit
    };

    getProducts(variables);
  }, []);

  const getProducts = variables => {
    axios.post("/api/product/getProducts", variables).then(res => {
      if (res.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setPostSize(res.data.postSize);
        console.log(Products);
      } else {
        alert("Failed to fetch all projcets");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, idx) => {
    return (
      <Col key={idx} lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = filters => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    };

    getProducts(variables);

    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    console.log(category, filters);
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    if (category === "price") {
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketOutlined />{" "}
        </h2>
      </div>

      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <CheckBoxGroup
            handleFilters={filters => handleFilters(filters, "continents")}
          />
          <span>name</span>
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <Radio value> name </Radio>
        </Col>
      </Row>

      {/* Search */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto"
        }}
      >
        <div>
          <Search
            placeholder="input search text"
            onChange
            style={{ width: 200 }}
            value
          />
        </div>
      </div>

      {/* Cards */}

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>No Post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}

      <br />
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
