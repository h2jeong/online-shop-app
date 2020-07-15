import React, { useEffect, useState } from "react";
import Meta from "antd/lib/card/Meta";
import { Avatar, Col, Row, message } from "antd";
import Title from "antd/lib/typography/Title";
import { VIDEO_SERVER } from "../../Config";
import axios from "axios";
import moment from "moment";

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${VIDEO_SERVER}/getVideos`).then(res => {
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        message.error("Failed to get videos");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recomanded</Title>
      <hr />
      <Row gutter={[32, 16]}>
        {Videos.length > 0 &&
          Videos.map((video, i) => (
            <Col lg={6} md={8} xs={24} key={i}>
              <div style={{ position: "relative" }}>
                <a href={`video/${video._id}`}>
                  <img
                    src={`http://localhost:5000/${video.thumbnail}`}
                    style={{ width: "100%" }}
                    alt="thumbnail"
                  />
                </a>
                <div
                  className="duration"
                  style={{
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    margin: "4px",
                    color: "#fff",
                    backgroundColor: "rgba(17, 17, 17, 0.8)",
                    opacity: 0.8,
                    padding: "2px 4px",
                    borderRadius: "2px",
                    letterSpacing: "0.5px",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "12px"
                  }}
                >
                  <span>
                    {moment
                      .utc(
                        moment.duration(video.duration, "s").asMilliseconds()
                      )
                      .format("HH:mm:ss")}
                  </span>
                </div>
              </div>
              <br />
              <Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.title}
              />
              <span>{video.writer.name}</span>
              <br />
              <span style={{ marginLeft: "3rem" }}>{video.views} </span> ・
              <span>{moment(video.createdAt).format("YYYY-MM-DD")}</span>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default LandingPage;
