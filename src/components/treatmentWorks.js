import React from "react";
import ArrowSvg from "./arrowSvg";
import { NavLink } from "react-router-dom";
import { GETLINK } from "../utils/utils";

const TreatmentWorks = ({ fingerTipsData }) => {
  return (
    <>
      {fingerTipsData.map((item, index) => (
        <div className="treatment-works" key={index}>
          <div className="container text-center"> 
          <div className="quote">
          <svg
              width="35"
              height="30"
              viewBox="0 0 35 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0929 0.631996V2.168C12.7329 3.89599 10.0449 6.296 7.93288 9.368C5.82088 12.344 4.66888 15.32 4.38088 18.104H4.86088C5.62888 15.896 7.16488 14.84 9.56488 14.84C12.5409 14.84 15.9009 17.816 15.9009 22.424C15.9009 26.744 12.7329 29.912 8.41288 29.912C3.13287 29.912 0.444875 25.976 0.444875 20.888C0.444875 14.36 4.57288 6.392 16.0929 0.631996ZM34.8129 0.631996V2.168C31.4529 3.89599 28.7649 6.296 26.6529 9.368C24.5409 12.344 23.3889 15.32 23.1009 18.104H23.5809C24.3489 15.896 25.8849 14.84 28.2849 14.84C31.2609 14.84 34.6209 17.816 34.6209 22.424C34.6209 26.744 31.4529 29.912 27.1329 29.912C21.8529 29.912 19.1649 25.976 19.1649 20.888C19.1649 14.36 23.2929 6.392 34.8129 0.631996Z"
                fill="black"
              />
            </svg>
          </div>
           
            <h1 className="sec-header fw-700">“{item?.title}</h1>
            <NavLink to={GETLINK(item?.button_link)}>
              <button className="primary-btn mx-auto" id="bok-btn-width3">
                {item?.button_title}
                <ArrowSvg />
              </button>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
};

export default TreatmentWorks;
