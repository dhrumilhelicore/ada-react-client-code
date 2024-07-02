import React, { useEffect, useState } from "react";
import ArrowSvg from "./arrowSvg";
import strugglingImage from "../assets/images/stock-img2.png";
import strugglingImageSm from "../assets/images/stock-img-small.png";

const Struggling = ({ struggling }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {struggling && struggling.length > 0 && (
        <section className="struggling-sec" id="numberBottom">
         
              <div className={innerWidth <= 767 ? "container" : "container"}>
                <div className="row align-items-center">
                  <div className={innerWidth <= 767 ? "col-xl-6 col-lg-6 col-md-5 col-12 col-sm-12 px-0" : "col-xl-6 col-lg-6 col-md-5 col-12 col-sm-12"}>
                    <div className="img-box">
                      {innerWidth <= 375 ? (
                        <img
                          src={strugglingImageSm}
                          alt="struggling"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src={strugglingImage}
                          alt="struggling"
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-7 col-12 col-sm-12 first-div" >
                    <div className="inner-content">
                      <h1 className="sec-heading text-left">
                        {struggling[0]?.title}
                      </h1>
                      <h6 className="subheading">{struggling[0]?.sub_title}</h6>
                      <div className="multi-buttons">
                        {struggling[0]?.button_title &&
                        !window.cn(struggling[0]?.button_title) ? (
                          <a
                            href={struggling[0]?.button_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button className="primary-btn mr-4">
                              {struggling[0]?.button_title}
                              <ArrowSvg />
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                        {struggling[0]?.help_mobile &&
                        !window.cn(struggling[0]?.help_mobile) ? (
                          <a href={"tel:" + `${struggling[0]?.help_mobile}`}>
                            <button className="secondary-btn">
                              {struggling[0]?.help_mobile}
                            </button>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Struggling;
