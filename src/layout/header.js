/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import mainlogo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { checkMenuDisplayStatus, getHeaderLink } from "../utils/utils";

const Header = ({ headerData, menuSettings }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  // const [menuItems, setMenuItems] = useState();
  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [mentalHealthMenuOpen, setMentalHealthMenuOpen] = useState(
    innerWidth <= 991 ? false : true
  );
  const [substanceAbuseMenuOpen, setSubstanceAbuseMenuOpen] = useState(false);

  const [weightLossMenuOpen, setWeightLossMenuOpen] = useState(false);

  // For Mental Health
  const toggleMentalHealthMenu = (event) => {
    event.stopPropagation();

    innerWidth <= 991
      ? setMentalHealthMenuOpen(!mentalHealthMenuOpen)
      : setMentalHealthMenuOpen(true);

    setSubstanceAbuseMenuOpen(false);
    setWeightLossMenuOpen(false);
  };
  // For Substance Abuse
  const toggleSubstanceAbuseMenu = (event) => {
    event.stopPropagation();

    innerWidth <= 991
      ? setSubstanceAbuseMenuOpen(!substanceAbuseMenuOpen)
      : setSubstanceAbuseMenuOpen(true);

    setMentalHealthMenuOpen(false);
    setWeightLossMenuOpen(false);
  };

  // For Weight Loss
  const toggleWeightLossMenu = (event) => {
    event.stopPropagation();

    innerWidth <= 991
      ? setWeightLossMenuOpen(!substanceAbuseMenuOpen)
      : setWeightLossMenuOpen(true);

    setMentalHealthMenuOpen(false);
    setSubstanceAbuseMenuOpen(false);
  };

  const onToggleOpen = () => {
    const burger = document.querySelector(".collapse");
    burger.classList.toggle("show");
    setShowBurgerMenu(!showBurgerMenu);
    if (showBurgerMenu === false) {
      document.querySelector("body").classList.add("overflowHidden");
      document
        .querySelector(".top-nav-main")
        .classList.add("top-nav-main-mobile");
    } else if (showBurgerMenu === true) {
      document.querySelector("body").classList.remove("overflowHidden");
      document
        .querySelector(".top-nav-main")
        .classList.remove("top-nav-main-mobile");
    }
  };

  let menuItems = !window.cn(menuSettings) &&
    !window.cn(menuSettings[0])
    ? JSON.parse(menuSettings[0]?.extra_obj)
    : "";

  return (
    <>
      <nav className="navbar navbar-expand-lg main-nav top-nav-main fixed-top">
      <div className="upper-header">
          <div className="container-fluid d-flex justify-content-end">

            {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'contactus') &&
              <NavLink to="/contact-us" className="link">
                Contact us
              </NavLink>
            }
            <a
              href={
                !window.cn(headerData) &&
                headerData &&
                getHeaderLink(headerData, "patientportal")
              }
              className="link"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              Patient Portal
            </a>
          </div>
        </div>
        <div className="container-fluid main">
          <div className="d-flex align-items-center mobile-responsive-header">
            <NavLink to="/" className="navbar-brand">
              <img src={mainlogo} alt="logo" className="img-fluid" />
            </NavLink>
            <NavLink to="/">
              <div
                className={
                  showBurgerMenu === true && innerWidth <= 991
                    ? "navbar-name navbar-name-mobile"
                    : "navbar-name"
                }
              >
                <span className="ada-txt">Ada</span>
                <span>Psychiatry</span>
              </div>
              
            </NavLink>
            <button
            className="navbar-toggler"
            type="button"
            // data-toggle="collapse"
            // data-target="#navbarNavDropdown"
            // aria-controls="navbarNavDropdown"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
            onClick={onToggleOpen}
          >
            <span className="navbar-toggler-icon">
              {showBurgerMenu === true && innerWidth <= 991 ? (
                <div className="close-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.31938 0.31938C0.745221 -0.10646 1.43542 -0.10646 1.86104 0.31938L7 5.45834L12.139 0.31938C12.5648 -0.10646 13.255 -0.10646 13.6806 0.31938C14.1065 0.745221 14.1065 1.43542 13.6806 1.86104L8.54166 7L13.6806 12.139C14.1065 12.5648 14.1065 13.255 13.6806 13.6806C13.2548 14.1065 12.5646 14.1062 12.139 13.6806L7 8.54166L1.86104 13.6806C1.4352 14.1062 0.744994 14.1062 0.31938 13.6806C-0.10646 13.2548 -0.10646 12.5646 0.31938 12.139L5.45834 7L0.31938 1.86104C-0.10646 1.4352 -0.10646 0.744994 0.31938 0.31938Z"
                      fill="#F0EBE1"
                    />
                  </svg>
                </div>
              ) : (
                <i
                  className="fa fa-bars"
                  aria-hidden="true"
                  style={{ color: "#C18C2C" }}
                ></i>
              )}
            </span>
          </button>
          </div>
        
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Who we are
                </a>
                <div className="dropdown-menu">
                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'about') &&
                    <NavLink
                      to="/about"
                      className="dropdown-item p-txt"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      About Ada
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>}

                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'meet-the-team') &&
                    <NavLink
                      to="/team"
                      className="dropdown-item p-txt"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      Meet The Team
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>}
                </div>
              </li>
              <li className="nav-item dropdown position">
                <a
                  className="nav-link dropdown-toggle"
                  href=""
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  What we treat
                </a>
                <ul 
                  className="dropdown-menu withsubmenu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <div className="submenu"> 
                    <li className="dropdown-submenu">
                      {innerWidth > 991 ? (

                        <NavLink to="/mental-health">
                          <div
                            className="submenu-inline"
                            onMouseEnter={toggleMentalHealthMenu}
                          >
                            <div className="arrow-link">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.63916 9L14.1145 9"
                                  stroke="#232020"
                                />
                                <path
                                  d="M8.2561 4C8.2561 4 8.95926 8.99076 14.5108 8.99076"
                                  stroke="#232020"
                                />
                                <path
                                  d="M8.2561 14C8.2561 14 8.95926 9.00924 14.5108 9.00924"
                                  stroke="#232020"
                                />
                              </svg>
                            </div>

                            <span
                              className="dropdown-item dropdown-toggle"
                              role="button"
                            // onMouseEnter={toggleMentalHealthMenu}
                            >
                              Mental Health
                            </span>
                          </div>
                        </NavLink>
                      ) : (
                        <div className="submenu-inline">
                          <div className="arrow-link">

                            <NavLink
                              to="/mental-health"
                              onClick={
                                showBurgerMenu === true && innerWidth <= 991
                                  ? onToggleOpen
                                  : ""
                              }
                            >
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.63916 9L14.1145 9"
                                  stroke="#232020"
                                />
                                <path
                                  d="M8.2561 4C8.2561 4 8.95926 8.99076 14.5108 8.99076"
                                  stroke="#232020"
                                />
                                <path
                                  d="M8.2561 14C8.2561 14 8.95926 9.00924 14.5108 9.00924"
                                  stroke="#232020"
                                />
                              </svg>
                            </NavLink>
                          </div>

                          <span
                            className="dropdown-item dropdown-toggle"
                            role="button"
                            // onMouseEnter={toggleMentalHealthMenu}
                            onClick={
                              innerWidth <= 991 ? toggleMentalHealthMenu : ""
                            }
                          >
                            Mental Health
                          </span>
                        </div>
                      )}

                      <ul
                        className={`dropdown-menu first ${mentalHealthMenuOpen ? "show" : ""
                          }`}
                      >
                        <div className="row">
                          <div className="col-xl-7 col-lg-7 col-md-7 col-12 col-sm-12">
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'adhd') &&
                                <NavLink
                                  to="/adhd"
                                  className="dropdown-item"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  ADHD
                                </NavLink>}
                            </li>
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'depression') &&
                                <NavLink
                                  to="/depression"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Depression
                                </NavLink>}
                            </li>
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'generalized-anxity-disorder') &&
                                <NavLink
                                  to="/generalized-anxity-disorder"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Generalized anxity Disorder
                                </NavLink>}
                            </li>

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'post-traumatic-stress-disorder') &&
                                <NavLink
                                  to="/post-traumatic-stress-disorder"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Post Traumatic Stress Disorder
                                </NavLink>}
                            </li>

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'panic-attacks') &&
                                <NavLink NavLink
                                  to="/panic-attacks"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Panic Attacks
                                </NavLink>}
                            </li>

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'premenstrual-dysphoric-disorder') &&
                                <NavLink
                                  className="dropdown-item"
                                  to="/pmdd"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  Premenstrual Dysphoric Disorder
                                </NavLink>}
                            </li>
                          </div>
                          <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12">
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'postpartum-depression') &&
                                <NavLink
                                  className="dropdown-item"
                                  to="/postpartum-depression"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  Postpartum depression
                                </NavLink>}
                            </li>
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'LGNTQUIA-community') &&
                                <NavLink
                                  to="/LGNTQUIA-community"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  LGBTQIA Community
                                </NavLink>}
                            </li>

                            {/* <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={
                                  showBurgerMenu === true && innerWidth <= 991
                                    ? onToggleOpen
                                    : ""
                                }
                              >
                                Insomnia
                              </a>
                            </li> */}

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'mood-disorder') &&
                                <NavLink
                                  to="/mood-disorder"
                                  className="dropdown-item"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  Mood Disorder
                                </NavLink>}
                            </li>

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'personality-disorder') &&
                                <NavLink
                                  className="dropdown-item"
                                  to="/personality-disorder"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  Personality Disorder
                                </NavLink>}
                            </li>

                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'anger') &&
                                <NavLink
                                  to="/anger"
                                  className="dropdown-item"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                >
                                  Anger
                                </NavLink>}
                            </li>
                          </div>
                        </div>
                      </ul>
                    </li>
                    <li className="dropdown-submenu">
                      {innerWidth > 991 ? (
                        <div
                          className="submenu-inline"
                          onMouseEnter={toggleSubstanceAbuseMenu}
                        >
                          <div className="arrow-link">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
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
                          </div>
                          <span
                            className="dropdown-item dropdown-toggle"
                            role="button"
                          >
                            Substance Abuse
                          </span>
                        </div>
                      ) : (
                        <div
                          className="submenu-inline"
                          onMouseEnter={toggleSubstanceAbuseMenu}
                        >
                          <div className="arrow-link">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
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
                          </div>
                          <span
                            className="dropdown-item dropdown-toggle"
                            role="button"
                            onClick={toggleSubstanceAbuseMenu}
                          >
                            Substance Abuse
                          </span>
                        </div>
                      )}

                      <ul
                        className={`dropdown-menu first second ${substanceAbuseMenuOpen ? "show" : ""
                          }`}
                      >
                        <div className="row">
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'opioid-addication') &&
                                <NavLink
                                  to="/opioid-addication"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Opioid addication
                                </NavLink>}
                            </li>
                            <li>
                              {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'medication-assistant-therapy') &&
                                <NavLink
                                  to="/medication-assitant-therapy"
                                  onClick={
                                    showBurgerMenu === true && innerWidth <= 991
                                      ? onToggleOpen
                                      : ""
                                  }
                                  className="dropdown-item"
                                >
                                  Medication Assistant Therapy
                                </NavLink>}
                            </li>
                          </div>
                        </div>
                      </ul>
                    </li>

                    <li className="dropdown-submenu">

                      {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'weight-loss-program') &&
                        <NavLink
                          to="/weight-loss-program"
                          onClick={
                            showBurgerMenu === true && innerWidth <= 991
                              ? onToggleOpen
                              : ""
                          }
                        >
                          <div
                            className="submenu-inline"
                            onMouseEnter={toggleWeightLossMenu}
                          >
                            <div className="arrow-link">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                            </div>
                            <span
                              className="dropdown-item dropdown-toggle"
                              role="button"
                            // onClick={
                            //   innerWidth <= 526 ? toggleWeightLossMenu : ""
                            // }
                            >
                              Weight Loss Program
                            </span>
                          </div>
                        </NavLink>}
                    </li>
                  </div>
                </ul>
              </li>

              <li className="nav-item ">

                {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'services') &&
                  <NavLink
                    to="/services"
                    className="nav-link service"
                    onClick={
                      showBurgerMenu === true && innerWidth <= 991
                        ? onToggleOpen
                        : ""
                    }
                  >
                    Services
                  </NavLink>}
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resources
                </a>
                <div className="dropdown-menu">
                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'blog') &&
                    <NavLink
                      to="/blogs"
                      className="dropdown-item"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      Blog
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>}
                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'faq') &&
                    <NavLink
                      to="/faq"
                      className="dropdown-item"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      Faq
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>
                  }
                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'fees-insurance') &&
                    <NavLink
                      to="/fees-insurance"
                      className="dropdown-item"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      Fees And Insurance
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>}
                  {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'important-info') &&
                    <NavLink
                      to="/important-info"
                      className="dropdown-item"
                      onClick={
                        showBurgerMenu === true && innerWidth <= 991
                          ? onToggleOpen
                          : ""
                      }
                    >
                      Important Info
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                    </NavLink>}
                </div>
              </li>

              <li className="nav-item mobile">
                {!window.cn(menuItems) && checkMenuDisplayStatus(menuItems, 'contactus') &&
                  <NavLink
                    to="/contact-us"
                    className="nav-link"
                    onClick={
                      showBurgerMenu === true && innerWidth <= 991
                        ? onToggleOpen
                        : ""
                    }
                  >
                    Contact us
                  </NavLink>}
              </li>

              <li className="nav-item mobile">
                <a
                  className="nav-link"
                  href={
                    !window.cn(headerData) &&
                    headerData &&
                    getHeaderLink(headerData, "patientportal")
                  }
                  target="_blank"
                  role="button"
                  onClick={
                    showBurgerMenu === true && innerWidth <= 991
                      ? onToggleOpen
                      : ""
                  }
                  rel="noreferrer"
                >
                  Patient Portal
                </a>
              </li>

              <li className="nav-item right-btn">
                <a
                  href={
                    !window.cn(headerData) &&
                    headerData &&
                    getHeaderLink(headerData, "book_appointment")
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="primary-btn header-btn">
                    Book An Appointment
                  </button>
                </a>
              </li>

              <li className="nav-item follow">
                <div className="follow-us">
                  <h6 className="p-txt">FOLLOW US</h6>
                  <div className="links">
                    <a className="f-link">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="f-link ml-2">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="f-link ml-2">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="f-link ml-2">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div >
      </nav >
    </>
  );
};

export default Header;
