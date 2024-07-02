import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { RECENT_BLOG_CARO } from "../config/setting";

const RecentBlogs = ({ recentBlogs }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
      {recentBlogs && recentBlogs.length > 0 && (
        <div className="container">
          <div className="header">
            <h1 className="sec-heading mb-5">Recent Blogs</h1>
          </div>
          <div className="inner-blog-content">
            <>
              <div className="row">
                {recentBlogs.map((item, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12"
                    key={index}
                  >
                    <div className="blog-card">
                      <div className="img-box1">
                        <img
                          src={item?.image}
                          className="img-fluid"
                          alt="recent"
                        />
                      </div>
                      <div className="info">
                        <h2 className="title">{item?.title}</h2>
                        <p className="excerpt">
                          Life can seem challenging at times for everyone. Those
                          with ADHD may experience symptoms that make them even
                          more complex than the average person. ADHD can impact
                          your home, work, and personal environment.
                        </p>
                        <h6
                          className="read-more-btn"
                          role="button"
                          onClick={() => navigate(`/blog/${item.id}`)}
                        >
                          Read More
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2"
                          >
                            <path d="M3.09473 12L19.1602 12" stroke="#C18C2C" />
                            <path
                              d="M10.959 5C10.959 5 11.9434 11.9871 19.7156 11.9871"
                              stroke="#C18C2C"
                            />
                            <path
                              d="M10.959 19C10.959 19 11.9434 12.0129 19.7156 12.0129"
                              stroke="#C18C2C"
                            />
                          </svg>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>

          {/* {location.pathname === "/faq" && (
              <div className="d-flex justify-content-center view-all-btn-mobile">
                <NavLink to="/blogs">
                  <button className="primary-btn">
                    View All
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2"
                    >
                      <path d="M2.63916 9L14.1145 9" stroke="#232020" />
                      <path
                        d="M8.2561 4C8.2561 4 8.95926 8.99076 14.5108 8.99076"
                        stroke="#232020"
                      />
                      <path
                        d="M8.2561 14C8.2561 14 8.95926 9.00924 14.5108 9.00924"
                        stroke="#232020"
                      />
                    </svg>
                  </button>
                </NavLink>
              </div>
            )} */}
        </div>
      )}
    </>
  );
};

export default RecentBlogs;
