import React, { useEffect, useState } from "react";
import ArrowSvg from "./arrowSvg";
import { getHeaderLink, getScheduleCallLink } from "../utils/utils";
import calenderIcon from "../assets/images/calender-icon.svg";

const SimpleSteps = ({ simpleSteps, globalSetting }) => {
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
      {simpleSteps && simpleSteps.length > 0 && (
        <section className="get-started gradient-border-top gradient-border-bottom pt-50 pb-50" id="mt-padding3">
          <div className="main-content">
            <div className="container">
              <div className="header">
                <h2 className="sec-heading gradient-text">
                  Four Simple Steps To <br /> Get Started
                </h2>
              </div>
              <div className="content">
                <div className="box-wrap">

                  {simpleSteps.length > 0 &&
                    simpleSteps.map((item, index) => (
                      <div className="item" key={index}>
                        <img
                            src={item?.image}
                            className="img-fluid"
                            alt="steps-img"
                          />
                          <div className="index gradient-text">{"0" + `${index + 1}`}</div>
                          <h6 className="p-txt">{item?.title}</h6>
                      </div>
                    ))}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <a
                  href={
                    !window.cn(globalSetting) &&
                    globalSetting &&
                    getHeaderLink(globalSetting, "schedule_call")
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="primary-btn sechedule-call">
                    Schedule a Call
                    <ArrowSvg />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SimpleSteps;
