import React from "react";
import moment from "moment";
import dmemoImg from "assets/imgs/demo.jpg";

export default function NewsCard({
  name,
  image,
  url,
  description,
  provider,
  datePublished,
}) {
  
  return (
    <div role='news-card-container' className="news-card-container">
      <a href={url} target="_blank" rel="noreferrer">
        <div className="news-card">
          <div className="news-card-img-container">
            <img
              className="news-card-img"
              alt="cryptocurrency news"
              src={image?.thumbnail?.contentUrl || dmemoImg}
            />
            <h2>{name}</h2>
          </div>
          <div className="news-card-content">
            <p>
              {description.length > 140
                ? `${description.substring(0, 140)}...`
                : description}
            </p>
            <div className="news-card-detail">
              <div className="news-provider">
                <img
                  alt="cryptocurrency news provider"
                  src={provider[0]?.image?.thumbnail?.contentUrl || dmemoImg}
                />
                <p>{provider[0]?.name} </p>
              </div>
              <p>{moment(datePublished).startOf("ss").fromNow()}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
