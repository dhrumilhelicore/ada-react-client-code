import React, { Fragment,  useState } from "react";
import { useLocation } from "react-router-dom";
import waveBg from "../assets/images/wave-bg.png";
import quotation from "../assets/images/Q.png";

const Empowerment = () => {
  const location = useLocation();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  
  return (
    <>
      <section
        className="empowerment-sec text-center"
        style={{ backgroundImage: `url(${waveBg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col">
            {innerWidth <= 767 ? 
              <>
               <img src={quotation} alt="struggling" className="mb-3"/>
              </>
              :
              <></>
            }
             <h1 className="main-heading" id="oversame">“Choose empowerment over shame”</h1>
            </div>
          </div>
        </div>

        {/* <div
        className={
          location.pathname=== "/" ? "empowerment" : "empowerment about"
        }
      >
       
      </div> */}
      </section>
    </>
  );
};

export default Empowerment;
