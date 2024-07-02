import React, { Fragment, useEffect, useState } from "react";
import mainlogo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { checkMenuDisplayStatus, getSocialIcon } from "../utils/utils";
import chevronDown from "../assets/images/chevron-down.svg";

const Footer = ({ footerProps, menuSettings }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isContentVisible, setContentVisibility] = useState(true);
  const [isContentVisible2, setContentVisibility2] = useState(true);
  const [isContentVisible3, setContentVisibility3] = useState(true);

  const toggleContentVisibility = () => {
    setContentVisibility(!isContentVisible);
  };
  const toggleContentVisibility2 = () => {
    setContentVisibility2(!isContentVisible2);
  };
  const toggleContentVisibility3 = () => {
    setContentVisibility3(!isContentVisible3);
  };

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let footerObject =
    !window.cn(footerProps) && !window.cn(footerProps[0]?.footer_obj)
      ? JSON.parse(footerProps[0]?.footer_obj)
      : "";

  let menuItems =
    !window.cn(menuSettings) && !window.cn(menuSettings[0])
      ? JSON.parse(menuSettings[0]?.extra_obj)
      : "";
  return (
    <>
      <footer>
        <div className="footer">
          <div className="footer-main">
            <div className="container-fluid">
              {innerWidth >= 767 ? (
                <>
                  <div className="row main-content">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12">
                          <div className="menu-links">
                            <h3 className="menu-title">Quick Links</h3>

                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(menuItems, "about") && (
                                <NavLink to="/about" className="link">
                                  Who we are
                                </NavLink>
                              )}
                            <NavLink to="/mental-health" className="link">
                              What We Treat
                            </NavLink>
                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(menuItems, "services") && (
                                <NavLink to="/services" className="link">
                                  Services
                                </NavLink>
                              )}
                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(
                                menuItems,
                                "contactus"
                              ) && (
                                <NavLink to="/contact-us" className="link">
                                  Contact Us
                                </NavLink>
                              )}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-3 col-12 col-sm-12">
                          <div className="menu-links link-p">
                            <h3 className="menu-title">Resources</h3>

                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(menuItems, "faq") && (
                                <NavLink to="/faq" className="link">
                                  FAQs
                                </NavLink>
                              )}
                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(menuItems, "blog") && (
                                <NavLink to="/blogs" className="link">
                                  Blog
                                </NavLink>
                              )}
                            {!window.cn(menuItems) &&
                              checkMenuDisplayStatus(
                                menuItems,
                                "fees-insurance"
                              ) && (
                                <NavLink to="/fees-insurance" className="link">
                                  Fees and insurance
                                </NavLink>
                              )}
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-3 col-12 col-sm-12">
                          <div className="menu-links">
                            <h3 className="menu-title">Legal</h3>

                            <NavLink to="/terms-condition" className="link">
                              Terms & Conditions
                            </NavLink>

                            <NavLink to="/privacy-policy" className="link">
                              Privacy Policy
                            </NavLink>

                            <a className="link">Cookie Settings</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12">
                      <div className="menu-links">
                        <h3 className="menu-title">Business Hours</h3>
                        <span className="link other">
                          {!window.cn(
                            footerObject?.business_data?.business_days
                          ) && footerObject?.business_data?.business_days}
                        </span>
                        <span className="link other">
                          {!window.cn(
                            footerObject?.business_data?.business_hours
                          ) && footerObject?.business_data?.business_hours}
                        </span>
                      </div>

                      <h3 className="menu-title">For Careers</h3>
                      <div class="menu-text">
                        <p class="p-text">
                          Interested in joining the ADA Team?
                        </p>
                        <p class="p-text">
                          <a
                            href="mailto:Career@adapsychiatry.com"
                            class="email"
                          >
                            Career@adapsychiatry.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12 ">
                      <div className="content last-widget">
                        <div className="d-flex align-items-center mb-4">
                          <NavLink to="/" className="brand">
                            <img
                              className="img-fluid"
                              src={mainlogo}
                              alt="logo"
                            />
                          </NavLink>
                          <NavLink to="/">
                            <div className="navbar-name">
                              <span className="ada-txt">Ada</span>
                              <span>Psychiatry</span>
                            </div>
                          </NavLink>
                        </div>

                        <div class="widget-box">
                          <h3 class="menu-title">Locate us</h3>

                          <p class="p-text">
                            1820 E Ray Road, STE A107, <br />
                            Chandler, Arizona 85225
                          </p>
                          <p class="p-text"> Phone: 480-526-9292</p>
                          
                        </div>

                        <div class="widget-box">
                          <h3 class="menu-title">Follow us</h3>
                          <div className="social-links">
                            {!window.cn(footerObject?.social_links) &&
                              Object.entries(footerObject?.social_links).map(
                                (item, index) => {
                                  if (item[1]) {
                                    return (
                                      <Fragment key={index}>
                                        <a
                                          className="f-link mr-3"
                                          target="_blank"
                                          href={item[1]}
                                          rel="noreferrer"
                                        >
                                          <i
                                            className={getSocialIcon(item[0])}
                                          ></i>
                                        </a>
                                      </Fragment>
                                    );
                                  } else {
                                    return null;
                                  }
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="col">
                        <div className="menu-links footer-strip">
                          <div className="left-strip">
                            <a className="link other">
                              © Ada Psychiatry. All rights reserved.
                              {!window.cn(
                                footerObject?.copyrights?.copyright_year
                              ) &&
                                ` ${footerObject?.copyrights?.copyright_year}`}
                            </a>
                          </div>
                          <div className="right-strip"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="content">
                    <div className="d-flex align-items-center">
                      <NavLink to="/" className="brand">
                        <img className="img-fluid" src={mainlogo} alt="logo" />
                      </NavLink>

                      <NavLink to="/">
                        <div className="navbar-name">
                          <span className="ada-txt">Ada</span>
                          <span>Psychiatry</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">Quick Links</span>
                        <div
                          className="hide-show-collapse"
                          onClick={toggleContentVisibility}
                          id={`${isContentVisible ? "opened" : "closed"}`}
                        >
                          {isContentVisible ? (
                            <img src={chevronDown} alt="down" />
                          ) : (
                            <img src={chevronDown} className="down" alt="up" />
                          )}
                        </div>
                        <div
                          className={`hide-content ${
                            isContentVisible ? "d-block" : "d-none"
                          }`}
                        >
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(menuItems, "about") && (
                              <NavLink to="/about" className="link">
                                Who We Are
                              </NavLink>
                            )}
                          <NavLink to="/mental-health" className="link">
                            What We Treat
                          </NavLink>
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(menuItems, "services") && (
                              <NavLink to="/services" className="link">
                                Services
                              </NavLink>
                            )}
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(menuItems, "contactus") && (
                              <NavLink to="/contact-us" className="link">
                                Contact Us
                              </NavLink>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">Resources</span>
                        <div
                          className="hide-show-collapse"
                          onClick={toggleContentVisibility2}
                          id={`${isContentVisible2 ? "opened" : "closed"}`}
                        >
                          {isContentVisible ? (
                            <img src={chevronDown} alt="down" />
                          ) : (
                            <img src={chevronDown} className="down" alt="up" />
                          )}
                        </div>
                        <div
                          className={`hide-content ${
                            isContentVisible2 ? "d-block" : "d-none"
                          }`}
                        >
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(menuItems, "faq") && (
                              <NavLink to="/faq" className="link">
                                Faqs
                              </NavLink>
                            )}
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(menuItems, "blog") && (
                              <NavLink to="/blogs" className="link">
                                Blog
                              </NavLink>
                            )}
                          {!window.cn(menuItems) &&
                            checkMenuDisplayStatus(
                              menuItems,
                              "fees-insurance"
                            ) && (
                              <NavLink to="/fees-insurance" className="link">
                                Fees and Insurance
                              </NavLink>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">Legal</span>
                        <div
                          className="hide-show-collapse"
                          onClick={toggleContentVisibility3}
                          id={`${isContentVisible3 ? "opened" : "closed"}`}
                        >
                          <img src={chevronDown} alt="icon" />
                        </div>
                        <div
                          className={`hide-content ${
                            isContentVisible3 ? "d-block" : "d-none"
                          }`}
                        >
                           <NavLink to="/terms-condition" className="link">
                              Terms & Conditions
                            </NavLink>

                          <NavLink to="/privacy-policy" className="link">
                            Privacy Policy
                          </NavLink>

                          <a className="link">Cookie Settings</a>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">
                          Business Hours
                        </span>
                        <div>
                          <span className="link">
                            {!window.cn(
                              footerObject?.business_data?.business_days
                            ) && footerObject?.business_data?.business_days}
                          </span>
                          <span className="link">
                            {!window.cn(
                              footerObject?.business_data?.business_hours
                            ) && footerObject?.business_data?.business_hours}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">For Careers</span>

                        <span className="link">
                          Interested in joining the ADA Team?
                        </span>
                        <a
                          className="link mail"
                          href="mailto:career@adapsychiatry.com"
                        >
                          Career@adapsychiatry.com
                        </a>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links">
                        <span className="link mobile-header">Locate us</span>
                        <a
                          className="link"
                          href="https://goo.gl/maps/PQVQdfrdt1A4WF7x7"
                          target="_blank"
                          rel="noreferrer"
                        >
                          1820 E Ray Road, STE A107, <br />
                          Chandler, Arizona 85225
                        </a>
                        <span className="link tele">
                          <a className="tel-no" href="tel:4805269292">
                            Phone: 480-526-9292
                          </a>
                        </span>
                      </div>
                    </div>

                    <div className="col-12 widget">
                      <div className="menu-links social-links">
                        <span className="link mobile-header">Follow us</span>
                        <div className="links">
                          {!window.cn(footerObject?.social_links) &&
                            Object.entries(footerObject?.social_links).map(
                              (item, index) => {
                                if (item[1]) {
                                  return (
                                    <Fragment key={index}>
                                      <a
                                        className="f-link mr-3"
                                        target="_blank"
                                        href={item[1]}
                                        rel="noreferrer"
                                      >
                                        <i
                                          className={getSocialIcon(item[0])}
                                        ></i>
                                      </a>
                                    </Fragment>
                                  );
                                } else {
                                  return null;
                                }
                              }
                            )}
                        </div>

                      </div>
                    </div>
                    <div className="col-12">
                      <p className="link terms copyright text-center text-white pt-3">
                        © Ada Psychiatry. All rights reserved.
                        {!window.cn(footerObject?.copyrights?.copyright_year) &&
                          ` ${footerObject?.copyrights?.copyright_year}`}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
