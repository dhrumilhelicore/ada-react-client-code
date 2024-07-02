import React, { useEffect, useState } from "react";
import { getInnerPageDetails } from "../../service/pageDetailsService";
import { STATICTODYNAMIC } from "../../config/apiConstant";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import CommonFaq from "../../components/commonFaq";
import OwlCarousel from "react-owl-carousel";
import { ADHD_CARO } from "../../config/setting";
import TreatmentWorks from "../../components/treatmentWorks";
import { createMarkup, getHeaderLink } from "../../utils/utils";
import Loader from "../../components/loader";
import CommonFindTreatment from "../../components/commonFindTreatment";
import { Helmet } from "react-helmet";

const PersonalityDisorder = () => {
  const [faqData, setFaqData] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [conditionBlock, setConditionBlock] = useState();
  const [whatBlock, setWhatBlock] = useState();
  const [causeBlock, setCauseBlock] = useState();
  const [symptomsBlock, setSymptomsBlock] = useState();
  const [treatmentBlock, setTreatmentBlock] = useState();
  const [footerData, setFooterData] = useState();
  const [fingerTipsData, setFingerTipsData] = useState();
  const [globalSetting, setGlobalSetting] = useState();
  const [loader, setLoader] = useState(true);
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  document.title = "Personality Disorder| Ada";

  useEffect(() => {
    getPersonalityPageDetalis();
    window.scroll(0, 0);
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
      document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  const getPersonalityPageDetalis = () => {
    getInnerPageDetails(
      STATICTODYNAMIC,
      "mental_health",
      "Personality Disorder"
    ).then((response) => {
      const {
        mental_health_other_condition_block,
        mental_health_other_whatis_block,
        mental_health_other_causes_block,
        mental_health_other_faqs_block,
        mental_health_other_find_treatment_block,
        mental_health_other_symptoms_block,
        mental_health_other_treatment_fingertips_block,
        common_footer_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;

      setConditionBlock(mental_health_other_condition_block);
      setWhatBlock(mental_health_other_whatis_block);
      setCauseBlock(mental_health_other_causes_block);
      setFaqData(mental_health_other_faqs_block);
      setTreatmentBlock(mental_health_other_find_treatment_block);
      setSymptomsBlock(mental_health_other_symptoms_block);
      setFooterData(common_footer_block);
      setFingerTipsData(mental_health_other_treatment_fingertips_block);
      setMetaData(meta_data.find((item) => item.page_name === "personality-disorder"));
      setGlobalSetting(
        !window.cn(common_global_settings_block) &&
          !window.cn(common_global_settings_block[0])
          ? common_global_settings_block
          : ""
      );
      setMenuSettings(!window.cn(common_menu_settings_block) &&
        !window.cn(common_menu_settings_block[0])
        ? common_menu_settings_block
        : "");
      setLoader(false);
    });
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
            : ""}
      />

      {metaData && 
        <Helmet>
          {metaData.title && <title>{metaData?.title}</title>}
        </Helmet>
      }

           {/* adhd sec start */}
           <div className="top-sec-gap adHd-condition">
        {conditionBlock && conditionBlock.length > 0 && (
          <div className="adhd-sec">
            <div className="container">
              <div className="row">
                {conditionBlock.map((item, index) => (
                  <>
                    <div className="col">
                      <p className="condition-text text-center">Condition</p>
                      <h1 className="sec-heading text-center">{item.title}</h1>

                      <div className="featured-img-box">
                        <div className="img-box">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="adhd"
                          />
                        </div>
                        <div className="content">
                          <p
                            dangerouslySetInnerHTML={createMarkup(
                              item?.description && item.description
                            )}
                          ></p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* adhd sec end */}
        {/* what-adhd sec start */}
        {whatBlock && whatBlock.length > 0 && (
          <div className="what-adhd1">
            <div className="container">
              <div className="content">
                {whatBlock.map((item, index) => (
                  <>
                    <div className="top">
                      <h1 className="sec-heading mb-0" key={index}>
                        {item.title}
                      </h1>
                    </div>
                    <div className="bottom">
                      <p
                        dangerouslySetInnerHTML={createMarkup(
                          item?.description && item.description
                        )}
                      ></p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* what-adhd sec end */}
        {/* adhd symptoms sec start */}
        {symptomsBlock && symptomsBlock.length > 0 && (
          <>
            {symptomsBlock.map((item, index) => (
              <>
                <div className={`symptons ${index % 2 === 0 ? "" : "second"}`}>
                  <div className="container">
                    <div className="content" key={index}>
                      <div className="header">
                        <h1 className="sec-heading">{item.title}</h1>
                      </div>
                      <div className="img-wrapper">
                        {/*  <h1 className="main-header">Adolescents</h1> */}
                        <div className="img-box">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="symptons1"
                          />
                        </div>
                      </div>
                      {item?.sub_title && (
                        <h6 className="p-txt">{item.sub_title}</h6>
                      )}
                      <div className="row">
                        {item?.description && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                            <div className="inner-content">
                              <p
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></p>
                            </div>
                          </div>
                        )}

                        {item?.description2 && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                            <div className="inner-content">
                              <p>
                                <div
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.description2 && item.description2
                                  )}
                                ></div>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="text-center">
              <div className="container ">
                <div className="app-btn ">
                  <a
                    href={
                      !window.cn(globalSetting) &&
                      globalSetting &&
                      getHeaderLink(globalSetting, "book_appointment")
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="primary-btn mx-auto" id="bok-btn-width">
                      Book An Appointment
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
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* adhd symptoms sec end */}
        {/* content-adhd sec start */}
        {causeBlock && causeBlock.length > 0 && (
          <div className="adhd-content">
            <div className="container">
              <div className="content">
                {causeBlock.map((item, index) => (
                  <>
                    {index % 2 === 0 ? (
                      <>
                        <div className="row">
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 first-div first"
                            key={index}
                            style={{
                              order: window.innerWidth < 767 ? 1 : "unset",
                            }}
                          >
                            <div className="img-box">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="adhd-content1"
                              />
                            </div>
                          </div>
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 sec-div"
                            id={`${index % 2 === 0 ? "even" : ""}`}
                          >
                            <div className="inner-content">
                              <h2 className="service-heading">{item.title}</h2>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></h6>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 sec-div "
                            key={index}
                            id={`${index % 2 === 0 ? "even" : ""}`}
                          >
                            <div className="inner-content">
                              <h2 className="service-heading">{item.title}</h2>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></h6>
                            </div>
                          </div>
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 first-div second"
                            style={{
                              order: window.innerWidth < 767 ? 1 : "unset",
                            }}
                          >
                            <div className="img-box">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="adhd-content"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* content-adhd sec end */}
        {/* adhd treatment sec start */}
        {treatmentBlock && (
          <CommonFindTreatment tratmentData={treatmentBlock} />
        )}
        {/* adhd treatment sec end */}
        {/* FAQ sec */}

        <div className="container adhd">
          {faqData && <CommonFaq faqData={faqData} />}
        </div>

        {fingerTipsData && fingerTipsData.length > 0 && (
          <TreatmentWorks fingerTipsData={fingerTipsData} />
        )}
      </div>

      {/* adhd sec start */}
      <div className="top-sec-gap adHd-condition">
        {conditionBlock && conditionBlock.length > 0 && (
          <div className="adhd-sec">
            <div className="container">
              <div className="row">
                {conditionBlock.map((item, index) => (
                  <>
                    <div className="col">
                      <p className="condition-text text-center">Condition</p>
                      <h1 className="sec-heading text-center">{item.title}</h1>

                      <div className="featured-img-box">
                        <div className="img-box">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="adhd"
                          />
                        </div>
                        <div className="content">
                          <p
                            dangerouslySetInnerHTML={createMarkup(
                              item?.description && item.description
                            )}
                          ></p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* adhd sec end */}
        {/* what-adhd sec start */}
        {whatBlock && whatBlock.length > 0 && (
          <div className="what-adhd1">
            <div className="container">
              <div className="content">
                {whatBlock.map((item, index) => (
                  <>
                    <div className="top">
                      <h1 className="sec-heading mb-0" key={index}>
                        {item.title}
                      </h1>
                    </div>
                    <div className="bottom">
                      <p
                        dangerouslySetInnerHTML={createMarkup(
                          item?.description && item.description
                        )}
                      ></p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* what-adhd sec end */}
        {/* adhd symptoms sec start */}
        {symptomsBlock && symptomsBlock.length > 0 && (
          <>
            {symptomsBlock.map((item, index) => (
              <>
                <div className={`symptons ${index % 2 === 0 ? "" : "second"}`}>
                  <div className="container">
                    <div className="content" key={index}>
                      <div className="header">
                        <h1 className="sec-heading">{item.title}</h1>
                      </div>
                      <div className="img-wrapper">
                        {/*  <h1 className="main-header">Adolescents</h1> */}
                        <div className="img-box">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="symptons1"
                          />
                        </div>
                      </div>
                      {item?.sub_title && (
                        <h6 className="p-txt">{item.sub_title}</h6>
                      )}
                      <div className="row">
                        {item?.description && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                            <div className="inner-content">
                              <p
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></p>
                            </div>
                          </div>
                        )}

                        {item?.description2 && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                            <div className="inner-content">
                              <p>
                                <div
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.description2 && item.description2
                                  )}
                                ></div>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="text-center">
              <div className="container ">
                <div className="app-btn ">
                  <a
                    href={
                      !window.cn(globalSetting) &&
                      globalSetting &&
                      getHeaderLink(globalSetting, "book_appointment")
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="primary-btn mx-auto" id="bok-btn-width">
                      Book An Appointment
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
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* adhd symptoms sec end */}
        {/* content-adhd sec start */}
        {causeBlock && causeBlock.length > 0 && (
          <div className="adhd-content">
            <div className="container">
              <div className="content">
                {causeBlock.map((item, index) => (
                  <>
                    {index % 2 === 0 ? (
                      <>
                        <div className="row">
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 first-div first"
                            key={index}
                            style={{
                              order: window.innerWidth < 767 ? 1 : "unset",
                            }}
                          >
                            <div className="img-box">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="adhd-content1"
                              />
                            </div>
                          </div>
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 sec-div"
                            id={`${index % 2 === 0 ? "even" : ""}`}
                          >
                            <div className="inner-content">
                              <h2 className="service-heading">{item.title}</h2>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></h6>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 sec-div "
                            key={index}
                            id={`${index % 2 === 0 ? "even" : ""}`}
                          >
                            <div className="inner-content">
                              <h2 className="service-heading">{item.title}</h2>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></h6>
                            </div>
                          </div>
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12 first-div second"
                            style={{
                              order: window.innerWidth < 767 ? 1 : "unset",
                            }}
                          >
                            <div className="img-box">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="adhd-content"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* content-adhd sec end */}
        {/* adhd treatment sec start */}
        {treatmentBlock && (
          <CommonFindTreatment tratmentData={treatmentBlock} />
        )}
        {/* adhd treatment sec end */}
        {/* FAQ sec */}

        <div className="container adhd">
          {faqData && <CommonFaq faqData={faqData} />}
        </div>

        {fingerTipsData && fingerTipsData.length > 0 && (
          <TreatmentWorks fingerTipsData={fingerTipsData} />
        )}
      </div>


      <Footer footerProps={!window.cn(footerData) && footerData} menuSettings={!window.cn(menuSettings) && menuSettings} />

      {/*loaddeerr*/}
      {loader && <Loader />}
    </>
  );
};

export default PersonalityDisorder;
