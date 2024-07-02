import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { HOME_CARO, PATIENT_CARO } from "../../config/setting";
import { GETALLDATA, GETGOOGLEREVIEWS } from "../../config/apiConstant";
import { GETLINK, createMarkup, getHeaderLink } from "../../utils/utils";
import Loader from "../../components/loader";
import googleLogo from "../../assets/images/google-icon.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import quotes from "../../assets/images/quotes-icon.svg";
import quotes1 from "../../assets/images/quotes.svg";
import psychiatry from "../../assets/images/psychiatry.webp";
import SimpleSteps from "../../components/simpleSteps";
import ArrowSvg from "../../components/arrowSvg";
import { NavLink } from "react-router-dom";
import { getPageDetails } from "../../service/pageDetailsService";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import CommonFaq from "../../components/commonFaq";
import axiosInstance from "../../config/axiosInstance";
import ReactStars from "react-rating-star-with-type";
import { Helmet } from "react-helmet";

const Home = () => {
  const [sliderData, setSliderData] = useState();
  const [treatmentData, setTreatmentData] = useState();
  const [founderData, setFounderData] = useState();
  const [serviceData, setServiceData] = useState();
  const [patientCaro, setPatientCaro] = useState();
  const [acceptingPatient, setAcceptingPatient] = useState();
  const [fourSimpleSteps, setFourSimpleSteps] = useState();
  const [faqData, setFaqData] = useState();
  const [psychiatric, setPsychiatric] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();
  const [reviews, setReviews] = useState();

  document.title = "Home | Ada";

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getHomePageDetails();
    getGoogleReviews();
    window.scrollTo(0, 0);
  }, []);

  // For MetaData & Description & Keywords
  useEffect(() => {
    if (metaData) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", metaData.description);
      document
        .querySelector('meta[name="title"]')
        .setAttribute("content", metaData.title);
      document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  //api call for get homepage details
  const getHomePageDetails = () => {
    getPageDetails(GETALLDATA, "home").then((response) => {
      const {
        home_slider_block,
        home_treatment_focus_block,
        home_meetfounder_block,
        home_services_block,
        home_patient_saying_block,
        home_accepting_patient_states_block,
        common_four_simple_steps_block,
        common_faqs_block,
        common_why_ada_psychiatry_block,
        common_footer_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;

      setSliderData(home_slider_block);
      setTreatmentData(home_treatment_focus_block);
      setFounderData(home_meetfounder_block);
      setServiceData(home_services_block);
      setPatientCaro(home_patient_saying_block);
      setAcceptingPatient(home_accepting_patient_states_block);
      setFourSimpleSteps(common_four_simple_steps_block);
      setFaqData(common_faqs_block);
      setPsychiatric(common_why_ada_psychiatry_block);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "home"));
      setGlobalSetting(
        !window.cn(common_global_settings_block) &&
          !window.cn(common_global_settings_block[0])
          ? common_global_settings_block
          : ""
      );
      setMenuSettings(
        !window.cn(common_menu_settings_block) &&
          !window.cn(common_menu_settings_block[0])
          ? common_menu_settings_block
          : ""
      );
      setPageLoader(false);
    });
  };

  //api call for google reviews
  const getGoogleReviews = async () => {
    try {
      const response = await axiosInstance(GETGOOGLEREVIEWS);
      const { data } = response;
      setReviews(data.data);
    } catch (error) { }
  };

  return (
    <>
      <Header
        headerData={
          !window.cn(globalSetting) &&
            globalSetting !== "" &&
            globalSetting !== null
            ? globalSetting
            : ""
        }
        menuSettings={
          !window.cn(menuSettings) &&
            menuSettings !== "" &&
            menuSettings !== null
            ? menuSettings
            : ""
        }
      />

      {metaData &&
        <Helmet>
          {metaData.title && <title>{metaData?.title}</title>}
        </Helmet>
      }

      {/*home slider sec start */}
      <div className="home top-sec-gap"></div>
      {sliderData && (
        <div className="home-sec">
          <div className="home-caro-cover">
            <OwlCarousel className="owl-theme home-caro" {...HOME_CARO}>
              {sliderData.length > 0 &&
                sliderData.map((item, index) => (
                  <div
                    className="home-bg-img img-fluid"
                    key={index}
                    style={{
                      backgroundImage: `url(${item?.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: innerWidth <= 768 ? "no-repeat" : "",
                      backgroundAttachment: innerWidth <= 768 ? "fixed" : "",
                      backgroundPositionX:
                        innerWidth <= 768
                          ? index === 3
                            ? "30%"
                            : index === 2
                              ? "68%"
                              : index === 1
                                ? "50%"
                                : index === 4
                                  ? "46%"
                                  : "70%"
                          : "",
                    }}
                  >
                    <div>
                      <div className="text-overlay position-relative">
                        <h2 className="main-header">{item?.title}</h2>
                        <h6 className="p-main-txt">{item.sub_title}</h6>
                        <span
                          className="p-txt goal-txt"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description
                          )}
                        ></span>
                        <div class="btn-link">
                          <NavLink to={GETLINK(item?.button_link)}>
                            <button className="primary-btn home-learn-btn mt-4">
                              {item?.button_title}
                              <ArrowSvg />
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </OwlCarousel>
          </div>
        </div>
      )}

      <section className="team-intro founder ptb-0">
        <div className="pt-90 pb-90">
          <div className="container">
            {innerWidth < 768 ? (
              <div className="row">
                <div className="col">
                  <div>
                    <h4 className="sec-heading">Meet The Founder</h4>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="inner-wrap">
              {founderData && founderData.length > 0 && (
                <>
                  <div className="profile-img ">
                    <LazyLoadImage
                      src={founderData[0]?.image}
                      className="founder-img img-fluid"
                      alt="founder-img"
                    />
                  </div>
                  <div className="details">
                    {innerWidth > 768 ? (
                      <h4 className="name">Meet The Founder</h4>
                    ) : null}
                    <h4 className="founder-name fw-600 mb-2">
                      {founderData[0]?.title}
                    </h4>
                    <p className="fw-500">FNP-C, PMHNP- BC</p>
                    <div
                      className="para"
                      dangerouslySetInnerHTML={createMarkup(
                        founderData[0]?.description
                      )}
                    ></div>
                    <NavLink to={GETLINK(founderData[0]?.button_link)}>
                      <button className="primary-btn home-learn-btn mt-4">
                        {founderData[0]?.button_title}
                        <ArrowSvg />
                      </button>
                    </NavLink>
                  </div>
                </>
              )}
              {/*founder sec end */}
            </div>
          </div>
        </div>
      </section>

      {/*treatment sec start */}
      {treatmentData && treatmentData.length > 0 && (
        <div className="treatment pt-120">
          <div className="main-content container">
            <h3 className="sec-heading mb-50">Our Treatment Focus</h3>
            <div className="content">
              <div>
                <div className="row">
                  {treatmentData.map((item, index) => (
                    <>
                      {innerWidth > 768 ? (
                        <>
                          {index % 2 === 0 ? (
                            <>
                              <div
                                className="col-md-6 col-sm-12 col-12 first-div box"
                                key={index}
                              >
                                <div className="img-box">
                                  <LazyLoadImage
                                    src={item?.image}
                                    className="img-fluid"
                                    alt="first"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12 col-12 sec-div mobile-sec box">
                                <div className="inner-content">
                                  <h6 className="p-header">{item?.title}</h6>
                                  <p
                                    className="p-txt"
                                    dangerouslySetInnerHTML={createMarkup(
                                      item?.description && item.description
                                    )}
                                  ></p>
                                  <NavLink to={GETLINK(item?.button_link)}>
                                    <button className="primary-btn learn-btn">
                                      {item?.button_title}
                                      <ArrowSvg />
                                    </button>
                                  </NavLink>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="col-md-6 col-sm-12 col-12 sec-div second box"
                                key={index}
                              >
                                <div className="inner-content">
                                  <h6 className="p-header">{item?.title}</h6>
                                  <p
                                    className="p-txt"
                                    dangerouslySetInnerHTML={createMarkup(
                                      item?.description && item.description
                                    )}
                                  ></p>

                                  <NavLink to={GETLINK(item?.button_link)}>
                                    <button className="primary-btn learn-btn">
                                      {item?.button_title}
                                      <ArrowSvg />
                                    </button>
                                  </NavLink>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12 col-12 first-div first">
                                <div className="img-box second">
                                  <LazyLoadImage
                                    src={item?.image}
                                    className="img-fluid"
                                    alt="second"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            className={
                              index % 2 === 0
                                ? "col-md-6 col-sm-12 col-12 first-div"
                                : "col-md-6 col-sm-12 col-12 first-div second-mobile-div"
                            }
                          >
                            <div className="img-box">
                              <LazyLoadImage
                                src={item?.image}
                                className="img-fluid"
                                alt="first"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12 col-12 sec-div mobile-sec box">
                            <div className="inner-content">
                              <h6 className="p-header">{item?.title}</h6>
                              <p
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></p>
                              <NavLink to={GETLINK(item?.button_link)}>
                                <button className="primary-btn learn-btn">
                                  {item?.button_title}
                                  <ArrowSvg />
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*treatment sec end*/}
      <div className="help" id="experiencing_hd">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <LazyLoadImage
                src={quotes1}
                className="img-fluid quote d-block mx-auto mb-1"
                alt=""
              />
              <h1 className="sec-heading">
                “We help people living with and experiencing difficult times”
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/*Services sec start */}
      {serviceData && serviceData.length > 0 && (
        <div className="services home pt-90 pb-90">
          <div className="main-content container">
            <h4 className="sec-heading mb-50">Our Services</h4>
            <div className="content">
              <div className="row">
                {serviceData.map((item, index) => (
                  <div
                    className="col-xl-2 col-lg-2 col-md-4 col-4 col-sm-6 each-div"
                    key={index}
                  >
                    <div className="img-box">
                      <LazyLoadImage
                        src={item?.image}
                        className="img-fluid"
                        alt="services"
                      />
                    </div>
                    <div className="para">
                      <h6 className="p-header">{item?.title}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/services">
              <button className="primary-btn services-btn mt-5 d-block mx-auto">
                View Our Services
                <ArrowSvg />
              </button>
            </NavLink>
          </div>
        </div>
      )}
      {/*Services sec end*/}
      {/*Psychiatry sec start */}
      {psychiatric && (
        <div className="psychiatry pt-90 pb-90">
          <div className="main-content">
            <div className="container">
              <div className="content">
                {innerWidth < 768 ? (
                  <div className="row">
                    <div className="col">
                      <h2 className="sec-heading">
                        {" "}
                        Why should you choose Ada Psychiatry?
                      </h2>
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <div className="col-md-6 col-12 col-sm-12 second-div">
                    <div className="img-box">
                      <LazyLoadImage
                        src={psychiatry}
                        alt="psychiatry"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12 col-sm-12 first-div">
                    <div className="box-wrap">
                      {innerWidth > 768 ? (
                        <h2 className="sec-heading text-left">
                          {" "}
                          Why should you choose Ada Psychiatry?
                        </h2>
                      ) : null}
                      <div className="accordion mt-3" id="accordionExample">
                        {psychiatric.length > 0 &&
                          psychiatric.slice(0, 4).map((item, index) => (
                            <div className="card" key={index}>
                              <div
                                className="card-header first"
                                id="headingOne"
                              >
                                <h2 className="mb-0">
                                  <button
                                    className={
                                      index === 0
                                        ? "btn accordion-btn btn-link btn-block text-left"
                                        : "btn accordion-btn btn-link btn-block text-left collapsed"
                                    }
                                    type="button"
                                    data-toggle="collapse"
                                    data-target={`#collapse${index}`}
                                    aria-expanded="true"
                                    aria-controls={`#collapse${index}`}
                                  >
                                    {item?.title}
                                  </button>
                                </h2>
                              </div>

                              <div
                                id={`collapse${index}`}
                                className={
                                  index === 0 ? "collapse show" : "collapse"
                                }
                                aria-labelledby="headingOne"
                                data-parent="#accordionExample"
                              >
                                <div
                                  className="card-body para-txt"
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.description && item?.description
                                  )}
                                ></div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*Psychiatry sec end*/}

      {/* patient saying sec start  */}
      {patientCaro && patientCaro.length > 0 && (
        <div className="patient pt-90 pb-90" id="p_saying">
          <div className="main-content">
            <div className="header">
              <h2 className="sec-heading">What our patients are saying </h2>
            </div>
            <div className="client-caro-over">
              <OwlCarousel className="owl-theme client-caro" {...PATIENT_CARO}>

                {reviews.map((item, index) => {
                  const review = JSON.parse(item.review);
                  return (
                    <>
                      {
                        !window.cn(review) && (
                          <div className="main-box" key={index}>
                            <div class="txt-wrap">
                            <div className="content">
                              <div className="client-info">
                                <div className="wrap">
                                  <div className="left">
                                    <div className="image">
                                      <LazyLoadImage src={review?.user?.thumbnail} alt="profile" />
                                    </div>
                                    <div>
                                      <div className="name">{review?.user?.name}</div>
                                      <div>

                                        <ReactStars
                                          value={review?.rating}
                                          inactiveColor="#E2C899"
                                          activeColor="#C18C2C"
                                          size={20}
                                        />
                                      </div>
                                      <div className="date">{review?.date}</div>
                                    </div>
                                  </div>
                                  <div className="right">
                                    <LazyLoadImage
                                      src={googleLogo}
                                      alt="Google Review"
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="scroll-content" id="scroll">
                            <h6
                                className="p-txt mt-2"
                                dangerouslySetInnerHTML={createMarkup(
                                  review?.snippet
                                )}
                              ></h6>
                            </div>
                            </div>
                          </div>
                        )
                      }
                    </>
                  )
                })}
                {/* {patientCaro.map((item, index) => (
                  <div className="main-box" key={index}>
                    <div className="content">
                      <div className="client-info">
                        <div className="wrap">
                          <div className="left">
                            <div className="image">
                              <LazyLoadImage src={item?.image} alt="profile" />
                            </div>
                            <div>
                              <div className="name">{item?.title}</div>
                              <div>
                                <svg
                                  width="114"
                                  height="18"
                                  viewBox="0 0 114 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.2974 2.6325L11.6174 5.2725C11.7974 5.64 12.2774 5.9925 12.6824 6.06L15.0749 6.45749C16.6049 6.71249 16.9649 7.82249 15.8624 8.91749L14.0024 10.7775C13.6874 11.0925 13.5149 11.7 13.6124 12.135L14.1449 14.4375C14.5649 16.26 13.5974 16.965 11.9849 16.0125L9.74243 14.685C9.33743 14.445 8.66993 14.445 8.25743 14.685L6.01493 16.0125C4.40993 16.965 3.43493 16.2525 3.85493 14.4375L4.38743 12.135C4.48493 11.7 4.31243 11.0925 3.99743 10.7775L2.13743 8.91749C1.04243 7.82249 1.39493 6.71249 2.92493 6.45749L5.31743 6.06C5.71493 5.9925 6.19493 5.64 6.37493 5.2725L7.69493 2.6325C8.41493 1.2 9.58493 1.2 10.2974 2.6325Z"
                                    fill="#C18C2C"
                                  />
                                  <path
                                    d="M34.2974 2.6325L35.6174 5.2725C35.7974 5.64 36.2774 5.9925 36.6824 6.06L39.0749 6.45749C40.6049 6.71249 40.9649 7.82249 39.8624 8.91749L38.0024 10.7775C37.6874 11.0925 37.5149 11.7 37.6124 12.135L38.1449 14.4375C38.5649 16.26 37.5974 16.965 35.9849 16.0125L33.7424 14.685C33.3374 14.445 32.6699 14.445 32.2574 14.685L30.0149 16.0125C28.4099 16.965 27.4349 16.2525 27.8549 14.4375L28.3874 12.135C28.4849 11.7 28.3124 11.0925 27.9974 10.7775L26.1374 8.91749C25.0424 7.82249 25.3949 6.71249 26.9249 6.45749L29.3174 6.06C29.7149 5.9925 30.1949 5.64 30.3749 5.2725L31.6949 2.6325C32.4149 1.2 33.5849 1.2 34.2974 2.6325Z"
                                    fill="#C18C2C"
                                  />
                                  <path
                                    d="M58.2974 2.6325L59.6174 5.2725C59.7974 5.64 60.2774 5.9925 60.6824 6.06L63.0749 6.45749C64.6049 6.71249 64.9649 7.82249 63.8624 8.91749L62.0024 10.7775C61.6874 11.0925 61.5149 11.7 61.6124 12.135L62.1449 14.4375C62.5649 16.26 61.5974 16.965 59.9849 16.0125L57.7424 14.685C57.3374 14.445 56.6699 14.445 56.2574 14.685L54.0149 16.0125C52.4099 16.965 51.4349 16.2525 51.8549 14.4375L52.3874 12.135C52.4849 11.7 52.3124 11.0925 51.9974 10.7775L50.1374 8.91749C49.0424 7.82249 49.3949 6.71249 50.9249 6.45749L53.3174 6.06C53.7149 5.9925 54.1949 5.64 54.3749 5.2725L55.6949 2.6325C56.4149 1.2 57.5849 1.2 58.2974 2.6325Z"
                                    fill="#C18C2C"
                                  />
                                  <path
                                    d="M82.2974 2.6325L83.6174 5.2725C83.7974 5.64 84.2774 5.9925 84.6824 6.06L87.0749 6.45749C88.6049 6.71249 88.9649 7.82249 87.8624 8.91749L86.0024 10.7775C85.6874 11.0925 85.5149 11.7 85.6124 12.135L86.1449 14.4375C86.5649 16.26 85.5974 16.965 83.9849 16.0125L81.7424 14.685C81.3374 14.445 80.6699 14.445 80.2574 14.685L78.0149 16.0125C76.4099 16.965 75.4349 16.2525 75.8549 14.4375L76.3874 12.135C76.4849 11.7 76.3124 11.0925 75.9974 10.7775L74.1374 8.91749C73.0424 7.82249 73.3949 6.71249 74.9249 6.45749L77.3174 6.06C77.7149 5.9925 78.1949 5.64 78.3749 5.2725L79.6949 2.6325C80.4149 1.2 81.5849 1.2 82.2974 2.6325Z"
                                    fill="#C18C2C"
                                  />
                                  <path
                                    d="M106.297 2.6325L107.617 5.2725C107.797 5.64 108.277 5.9925 108.682 6.06L111.075 6.45749C112.605 6.71249 112.965 7.82249 111.862 8.91749L110.002 10.7775C109.687 11.0925 109.515 11.7 109.612 12.135L110.145 14.4375C110.565 16.26 109.597 16.965 107.985 16.0125L105.742 14.685C105.337 14.445 104.67 14.445 104.257 14.685L102.015 16.0125C100.41 16.965 99.4349 16.2525 99.8549 14.4375L100.387 12.135C100.485 11.7 100.312 11.0925 99.9974 10.7775L98.1374 8.91749C97.0424 7.82249 97.3949 6.71249 98.9249 6.45749L101.317 6.06C101.715 5.9925 102.195 5.64 102.375 5.2725L103.695 2.6325C104.415 1.2 105.585 1.2 106.297 2.6325Z"
                                    fill="#C18C2C"
                                    fill-opacity="0.39"
                                  />
                                </svg>
                              </div>
                              <div className="date">Nov 10, 2023</div>
                            </div>
                          </div>
                          <div className="right">
                            <LazyLoadImage
                              src={googleLogo}
                              alt="Google Review"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>

                      <h6
                        className="p-txt mt-2"
                        dangerouslySetInnerHTML={createMarkup(
                          item?.description && item.description
                        )}
                      ></h6>
                    </div>
                  </div>
                ))} */}
              </OwlCarousel>
            </div>
          </div>
        </div>
      )}
      {/* patient saying sec end */}
      {/* get started sec start  */}
      <div className="home">
        {fourSimpleSteps && (
          <SimpleSteps
            simpleSteps={fourSimpleSteps}
            globalSetting={globalSetting}
          />
        )}
      </div>

      {/* get started sec end  */}
      {/* Accepting patient sec start  */}
      {acceptingPatient && acceptingPatient.length > 0 && (
        <div className="accepting-patient pt-120">
          <div className="main-content container">
            <h2 className="sec-heading mb-50">
              Now Accepting Patients In The Following States
            </h2>

            <div className="content">
              <div className="row">
                {acceptingPatient.map((item, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12 mobile-div"
                    key={index}
                  >
                    <div className="img-box-main">
                      <div className="img-boxes">
                        <LazyLoadImage
                          src={item?.image}
                          className="img-fluid"
                          alt="Nature-img"
                        />
                      </div>
                      <div className="info">
                        <h6 className="p-main-txt">{item?.title}</h6>
                        <h6 className="p-txt">{item?.sub_title}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Accepting patient sec end */}
      {/* FAQ sec */}

      <div class="container home">
        {faqData && <CommonFaq faqData={faqData} />}
      </div>

      <div className="pb-120"></div>

      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />
      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default Home;
