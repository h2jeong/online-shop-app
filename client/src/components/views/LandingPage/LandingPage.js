import React from "react";
import { Checkbox, Radio, Row, Col } from "antd";
import Search from "antd/lib/input/Search";
import { RocketOutlined } from "@ant-design/icons";

function LandingPage() {
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
          <Checkbox onChange checked />
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

      <Row gutter={[16, 16]}>cards</Row>

      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
