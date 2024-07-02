import React, { Fragment, useEffect, useState } from "react";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import { createMarkup } from "../../utils/utils";
import { getPageDetails } from "../../service/pageDetailsService";
import SimpleSteps from "../../components/simpleSteps";
import Empowerment from "../../components/empowerment";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import psychiatry from "../../assets/images/psychiatry.webp";
import Struggling from "../../components/struggling";
import pageTitleBg from "../../assets/images/about.png";
import bgWave from "../../assets/images/bg-wave.png";
import bgWaveMobile from "../../assets/images/bg-wave-mobile.svg";
import { Helmet } from "react-helmet";

export const About = () => {
  const [aboutData, setAboutData] = useState();
  const [visionData, setVisionData] = useState();
  const [ourValues, setOueValues] = useState();
  const [psychiatric, setPsychiatric] = useState();
  const [fourSimpleSteps, setFourSimpleSteps] = useState();
  const [struggling, setStruggling] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState();
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  document.title = "About | Ada";

  useEffect(() => {
    getAboutPageDetails();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
      document
        .querySelector('meta[name="keywords"]')
        .setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  //get about page details
  const getAboutPageDetails = async () => {
    getPageDetails(GETALLDATA, "about").then((response) => {
      const {
        aboutus_aboutada_block,
        aboutus_our_vision_block,
        aboutus_our_values_block,
        common_why_ada_psychiatry_block,
        common_four_simple_steps_block,
        common_ada_help_block,
        common_footer_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setAboutData(aboutus_aboutada_block);
      setVisionData(aboutus_our_vision_block);
      setOueValues(aboutus_our_values_block);
      setPsychiatric(common_why_ada_psychiatry_block);
      setStruggling(common_ada_help_block);
      setFourSimpleSteps(common_four_simple_steps_block);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "about"));
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

  return (
    <>
      <Header
        headerData={
          !window.cn(globalSetting) &&
          globalSetting != "" &&
          globalSetting != null
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

      {metaData && (
        <Helmet>{metaData.title && <title>{metaData?.title}</title>}</Helmet>
      )}

      {/* about sec page header */}

      <section
        className="page-title"
        style={{ backgroundImage: `url(${pageTitleBg})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="text-wrap">
                <h1>About us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aboutData && aboutData.length > 0 && (
        <section className="about-sec bg-sec">
          <div className="container">
            <div className="row">
              <div className="col">
                <div>
                  <div className="header">
                    <h3 className="heading-tagline">An Overview of</h3>
                    <h2 className="sec-heading">Ada Psychiatry</h2>
                    <div className="img-box">
                      <img
                        src={aboutData[0]?.image}
                        className="img-fluid border-2 border-radius-8"
                        alt="about"
                      />
                    </div>
                    <div className="content-block about-overview border-2 border-radius-20">
                      <div
                        className="text-wrap"
                        dangerouslySetInnerHTML={createMarkup(
                          aboutData[0]?.description && aboutData[0].description
                        )}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* vison sec start */}

      {visionData && (
        <section className="about-vision ptb-80 bg-sec">
          <div className="container">
            <div>
              <div className="row">
                <div className="col">
                  <div>
                    <div className="header">
                      <h2 className="main-header sec-heading">
                        Ada Psychiatry
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-wrapper  overflow-hidden gradient-border-bottom">
                <div className="row">
                  {visionData.length > 0 &&
                    visionData.map((item, index) => (
                      <div
                        className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12 col-hr"
                        key={index}
                        id={`box${index}`}
                      >
                        <div className="content">
                          <div className="img-box">
                            <img
                              src={item?.image}
                              alt="vision"
                              className="img-fluid"
                            />
                          </div>
                          <div className="inner-content">
                            <h2 className="col-heading">{item?.title}</h2>
                            <h6
                              className="p-txt"
                              dangerouslySetInnerHTML={createMarkup(
                                item?.description && item.description
                              )}
                            ></h6>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* vison sec end */}

      {/* values sec start */}

      {ourValues && ourValues.length > 0 && (
        <section
          className="our-values ptb-80 bg-sec bg-cover p-mobile"
          style={{ backgroundImage: `url(${bgWave})` }}
        >
          <img src={bgWaveMobile} className="wave-mobile top" />
          <img src={bgWaveMobile} className="wave-mobile bottom" />

          <div className="container">
            <div>
              <div className="row">
                <div className="col">
                  <div className="header">
                    <h2 className="main-header sec-heading gradient-text">
                      Our Values
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className="row our-values-row justify-content-center mt-5"
                id="mt-padding"
              >
                {ourValues.length > 0 &&
                  ourValues.map((item, index) => (
                    <Fragment key={index}>
                      {index <= 2 ? (
                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12 each-div">
                          <div className="each-div-blog" id={`box${index + 1}`}>
                            <div className="img-box">
                              <img
                                src={item?.image}
                                className="img-fluid"
                                alt="values-img"
                              />
                            </div>
                            <div className="inner-content">
                              <h6 className="p-header">{item?.title}</h6>
                              <div className="para">
                                <h6
                                  className="p-txt"
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.description && item?.description
                                  )}
                                ></h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-xl-4 col-lg-5 col-md-5 col-12 col-sm-12 each-div">
                          <div className="each-div-blog" id={`box${index + 1}`}>
                            <div className="img-box">
                              <img
                                src={item?.image}
                                className="img-fluid"
                                alt="values-img"
                              />
                            </div>
                            <div className="inner-content">
                              <h6 className="p-header">{item?.title}</h6>
                              <div className="para">
                                <h6
                                  className="p-txt"
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.description && item?.description
                                  )}
                                ></h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ada Psychiatric sec start */}

      {psychiatric && psychiatric.length > 0 && (
        <section className="why-choose ptb-80 bg-sec bg-cover" id="mt-padding2">
          <div className="container">
            <div>
              <div className="row">
                <div className="col">
                  <div className="header">
                    <h2 className="main-header sec-heading ">
                      Why Should You Choose <br />
                      Ada Psychiatry?
                    </h2>
                  </div>
                </div>
              </div>
              <div className="box-wrap mt-5">
                {psychiatric.length > 0 &&
                  psychiatric.map((item, index) => (
                    <div className="item" key={index}>
                      <h4 className="head-text">{item?.title}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.description || "", // You should provide a default value
                        }}
                      ></p>
                      <div class="circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                        >
                          <circle
                            cx="17.21"
                            cy="17.0797"
                            r="12.5"
                            transform="rotate(-90 17.21 17.0797)"
                            fill="#FFF9F1"
                            stroke="url(#paint0_linear_1_2338)"
                            stroke-width="9"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1_2338"
                              x1="0.209961"
                              y1="17.0797"
                              x2="34.21"
                              y2="17.0797"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#CEA341" />
                              <stop offset="0.497917" stop-color="#E8D16B" />
                              <stop offset="1" stop-color="#F0DF78" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ada Psychiatric sec end */}

      {/* get started sec */}
      {fourSimpleSteps && (
        <SimpleSteps
          simpleSteps={fourSimpleSteps}
          globalSetting={globalSetting}
        />
      )}

      {/*struggling sec */}
      <div className="about">
        {struggling && <Struggling struggling={struggling} />}
      </div>

      <Empowerment />

      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default About;
