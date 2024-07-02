import { NavLink } from "react-router-dom";
import img1 from "../assets/images/not-found1.png";
import img2 from "../assets/images/not-found2.png";
import img3 from "../assets/images/not-found3.png";

export const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <div className="main-content">
          <div className="content">
          <div className="container px-0">
            <div className="img-box">
              <img src={img1} className="img-fluid" alt="404" />
            </div>
            </div>
            <h4 className="sec-header">Page Not found</h4>
            <div className="d-flex justify-content-center mb-5">
              <NavLink to="/">
                <button className="primary-btn">Back To Home</button>
              </NavLink>
            </div>
          </div>
          <div className="first-img-box">
            <img src={img3} className="img-fluid" alt="404" />
          </div>

          <div className="second-img-box">
            <img src={img2} className="img-fluid" alt="404" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
