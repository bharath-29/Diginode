import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import VideoContainer from "../VideoContainer/VideoContainer";
import "./Home.css";
const Home = (props) => {
  const deleteVideoHistory = async (video) => {
    try {
      const res = await fetch(
        `/video/${video.videoId}/delete`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("user"),
            videoId: video.videoId,
          }),
        }
      );
      const data = await res.json();
      if(res.status === 200) {
        props.setHistory(data);
        props.snackBar("Video deleted Successfully", "info");
      } else props.snackBar("Something wrong in the server", "error")
    } catch(e) {
      props.snackBar("Something wrong in the server", "error")
    }
  };
  const clearHistory = async () => {
    try{
      let res = await fetch(`/video/clearHistory`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("user"),
        }),
      });
      if(res.status === 200) {
        if (props.history.length !== 0)
          props.snackBar("History cleared Successfully", "info");
        props.setHistory([]);
      } else props.snackBar("Something wrong in the server", "error")
    } catch(e) {
      props.snackBar("Something wrong in the server", "error")
    }
  };
  useEffect(() => {
    props.getData();
    props.searchVideos();
  },[]);
  const historyFrame = (e) => {
    let videoId = e.currentTarget.id;
    let vid = props.history.find((data) => data.videoId === videoId);
    props.setCurrentVideo(vid);
    props.setToggle(true);
  };
  const onloadFrame = (e) => {
    props.addToHistory(e.currentTarget.id, "home")
    props.setHistory(props.addHistory)
  };
  return (
    <>
      {/* Banner Content */}
      
      <div className="trending-area mt-3 mb-5">
        <div className="container">
          <div className="trending-main">
            <div className="row">
              <div className="d-flex align-items-center justify-content-center col-lg-8 mb-2">
                <div className="d-flex align-items-center justify-content-center top-banner">
                  <div className="top-bannner-img position-relative">
                    <img
                      src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                      alt=""
                    />
                    <div className="top-banner-text position-absolute">
                      <h2>
                        Anna Lora Stuns In White At Her Australian Premiere
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-6 mb-3">
                    <div className="top-banner">
                      <div className="top-bannner-img position-relative">
                        <img
                          src="https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                        <div className="top-banner-text top-banner-text2 position-absolute">
                          <h2>
                            Secretart for Economic Air plane that looks like
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-6">
                    <div className="top-banner">
                      <div className="top-bannner-img position-relative">
                        <img
                          src="https://images.pexels.com/photos/2514035/pexels-photo-2514035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt=""
                        />
                        <div className="top-banner-text top-banner-text2 position-absolute">
                          <h2>
                            Secretart for Economic Air plane that looks like
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        props.history && (props.history.length !== 0)? (
          <div className="container continue-watch">
          <div className="continue-text mb-5">
            <h5 className="float-left mb-3">Continue Watching</h5>
            <button
              className="iconbutton float-right d-flex"
              onClick={clearHistory}
              style={{ color: "white", borderColor: "white" }}
            >
              <h6
                className="mt-2 mr-2"
                style={{ fontWeight: "700", letterSpacing: 1.3 }}
              >
                CLEAR
              </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="-2 -10 18 28"
                className="delete-animation"
              >
                <path
                  d="M10.5,2.3V1.5c0,0,0-0.1,0-0.1C10.5,0.6,9.8,0,9,0H6c0,0-0.1,0-0.1,0C5.1,0,4.5,0.7,4.5,1.5v0.8H0v1.5h15V2.3H10.5z M9,2.2  H6V1.5h3V2.2z"
                  className="lid"
                />
                <g className="can">
                  <path d="M12.8,3.8v12c0,0,0,0,0,0.1c0,0.4-0.4,0.7-0.8,0.7H3c0,0,0,0-0.1,0c-0.4,0-0.7-0.4-0.7-0.8v-12H0.8v12   c0,0.6,0.2,1.2,0.7,1.6C1.8,17.8,2.4,18,3,18h9c0,0,0,0,0,0c1.2,0,2.2-1,2.2-2.2v-12H12.8z" />
                  <rect x="3.8" y="6" width="1.5" height="8.2" />
                  <rect x="6.8" y="6" width="1.5" height="8.2" />
                  <rect x="9.8" y="6" width="1.5" height="8.2" />
                </g>
              </svg>
            </button>

            <div className="container-fluid continue-scroll py-3">
                
              <div className="row flex-nowrap watching mt-3 pb-5">
                {
                  props.history && props.history.map((item, index) => {
                  return (
                    <div
                      className="col-12  col-sm-6 col-md-6 col-lg-4"
                      key={index}
                    >
                      <div className="item-card-history">
                        <img
                          className="img-fluid"
                          src={item.thumbnails}
                          height="150"
                          width="150"
                          alt="img"
                        />
                        <div className="info-history">
                          <Link
                            id="play-video"
                            className="video-play-button-history"
                            to="/"
                          >
                            <span
                              className="play-span-history"
                              onClick={historyFrame}
                              id={item.videoId}
                            ></span>
                          </Link>
                          <div className="delete-button position-absolute">
                            <IconButton
                              onClick={() => deleteVideoHistory(item)}
                              aria-label="delete"
                              style={{ color: "white" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                          <div className="badges">
                            <span className="badge badge-danger text-left pb-1">
                              {item.title.split("|").shift()}
                            </span>
                            <br />
                            <span className="badge badge-warning text-left pb-1">
                              {item.channelTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        ) : null
      }
      <VideoContainer onloadFrame={onloadFrame} fetchData={props.fetchData} />
    </>
  );
};

export default Home;
