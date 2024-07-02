import React, { Fragment, useEffect, useRef, useState } from "react";
import map from "../../assets/images/map-pin.png";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import { createMarkup } from "../../utils/utils";
import map4 from "../../assets/images/ph.svg";
import { Helmet } from "react-helmet";

const Fees = () => {
  document.title = "Fees and Insurance | Ada";
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [pageLoader, setPageLoader] = useState(true);
  const [footerData, setFooterData] = useState();
  const [feeStructure, setFeeStructure] = useState();
  const [psychiatryServices, setPsychiatryServices] = useState();
  const [additionRecovery, setAdditionRecovery] = useState();
  const [supervisedMedical, setSupervisedMedical] = useState();
  const [virtualTeleMedicine, setVirtualTeleMedicine] = useState();
  const [cancellationPolicy, setCancellationPolicy] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  const ref = useRef(null);
  const additionref = useRef(null);
  const weightref = useRef(null);

  useEffect(() => {
    getCommonPageDetails();
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
        document.querySelector('meta[name="description"]').setAttribute("content", metaData.description);
        document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
        document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  // Function to calculate the maximum height of .panel elements
  const MaxHeight = () => {
    setWindowWidth(window.innerWidth);
    let panels;
    let additionDiv;
    let weightLossDiv;

    if (!window.cn(psychiatryServices)) {
      panels = ref.current.querySelectorAll(".para-psy");
      let maxHeight = 0;

      panels.forEach((panel) => {
        const height = panel.getBoundingClientRect().height;
        maxHeight = Math.max(maxHeight, height);
      });

      panels.forEach((panel) => {
        panel.style.height = `${maxHeight}px`;
      });
    }

    if (!window.cn(additionRecovery)) {
      //additional recovery div set hight
      additionDiv = additionref.current.querySelectorAll(".para-addition");
      let additionDivminHeight = 0;

      additionDiv.forEach((panel) => {
        const height = panel.getBoundingClientRect().height;
        additionDivminHeight = Math.max(additionDivminHeight, height);
      });

      additionDiv.forEach((panel) => {
        panel.style.height = `${additionDivminHeight}px`;
      });
    }
    if (!window.cn(supervisedMedical)) {
      //weight loss div set hight
      weightLossDiv = weightref.current.querySelectorAll(".para-weight");
      let weightLossDivminHeight = 0;

      weightLossDiv.forEach((panel) => {
        const height = panel.getBoundingClientRect().height;
        weightLossDivminHeight = Math.max(weightLossDivminHeight, height);
      });

      weightLossDiv.forEach((panel) => {
        panel.style.height = `${weightLossDivminHeight}px`;
      });
    }
  };

  useEffect(() => {
    // Call the function once the component has loaded
    MaxHeight();

    // Add event listener for resizing the window (in case the content changes dynamically)
    window.addEventListener("resize", MaxHeight);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", MaxHeight);
    };
  }, [
    psychiatryServices,
    innerWidth,
    windowWidth,
    psychiatryServices,
    additionRecovery,
    supervisedMedical,
  ]);

  //api call for get common details
  const getCommonPageDetails = () => {
    getPageDetails(GETALLDATA, "fees_insurance").then((response) => {
      const {
        common_footer_block,
        feeinsurance_feestructure_block,
        feeinsurance_psychiatry_services_block,
        feeinsurance_addition_recovery_block,
        feeinsurance_supervised_medical_block,
        feeinsurance_cancellation_policy_block,
        feeinsurance_virtual_telemedicine_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFooterData(common_footer_block);
      setFeeStructure(feeinsurance_feestructure_block);
      setPsychiatryServices(feeinsurance_psychiatry_services_block);
      setAdditionRecovery(feeinsurance_addition_recovery_block);
      setSupervisedMedical(feeinsurance_supervised_medical_block);
      setCancellationPolicy(feeinsurance_cancellation_policy_block);
      setVirtualTeleMedicine(feeinsurance_virtual_telemedicine_block);
      setMetaData(
        meta_data.find((item) => item.page_name === "fees-insurance")
      );
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

      <div className="fees top-sec-gap" id="pfs">
        <div className="top-vector"></div>
        <div className="main-content">
          {/* fee structure block start */}
          {!window.cn(feeStructure) && (
            <div className="container small fees-content">
              {feeStructure.length > 0 &&
                feeStructure.map((item, index) => (
                  <div className="header" key={index}>
                    <h1 className="main-header fw-900">{item?.title}</h1>
                    <h6
                      className="p-txt"
                      dangerouslySetInnerHTML={createMarkup(
                        item?.description && item.description
                      )}
                    ></h6>
                  </div>
                ))}
            </div>
          )}
          {/* fee structure block end */}

          {/* Psychiatry Services block start */}
          {!window.cn(psychiatryServices) && psychiatryServices && (
            <div className="psychiatry-services ">
              <div className="container small content">
                <h1 className="sec-header fw-900">Psychiatry Services</h1>
                <div className="row" ref={ref}>
                  {psychiatryServices.length > 0 &&
                    psychiatryServices.map((item, index) => (
                      <div
                        className="col-xl-3 col-lg-3 col-md-6 col-12 col-sm-12 main-div"
                        key={index}
                      >
                        <div className="inner-content">
                          <h6 className="p-txt client">{item?.title}</h6>
                          <h6 className="p-txt follow-up">{item?.sub_title}</h6>
                          <h6 className="p-txt starting-at">Starting at</h6>
                          <h4 className="p-header">${item?.price}</h4>

                          <hr className="client-hr" />
                          <h6
                            className="p-txt para-psy"
                            dangerouslySetInnerHTML={createMarkup(
                              item?.description && item.description
                            )}
                          ></h6>
                          <hr className="client-hr other" />
                          <h6 className="p-txt minute">{item?.session_time}</h6>

                          <div className="d-flex justify-content-center">
                            <a
                              href={item?.button_link}
                              target="_blank"
                              rel="noreferrer"
                              className="w-100"
                            >
                              <button className="primary-btn">
                                {item?.button_title}
                                <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-2"
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
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {/* Psychiatry Services block end */}
        </div>
      </div>

      {/*addition-recovery sec start */}

      {!window.cn(additionRecovery) && additionRecovery && (
        <div className="addition-recovery" id="a_recovery">
          <div className="container small main-content">
            <div className="header">
              <h1 className="sec-header text-center mb-0">Addition Recovery</h1>
              <h6 className="p-txt">
                Outpatient Suboxone medication assistant treatment
              </h6>
            </div>

            <div className="content">
              <div
                className="row  justify-content-center"
                ref={additionref}
              >
                {!window.cn(additionRecovery) &&
                  additionRecovery.length > 0 &&
                  additionRecovery.map((item, index) => (
                    <div
                      className="col-xl-5 col-lg-5 col-md-6 col-12 col-sm-12"
                      key={index}
                    >
                      <div className="inner-content">
                        <div className="header-content-tab">
                          <h6 className="p-txt client">{item?.title}</h6>
                          <h6 className="p-txt follow-up">{item?.sub_title}</h6>
                          <h6 className="p-txt starting-at">Starting at</h6>
                          <h4 className="p-header price">${item?.price}</h4>
                        </div>

                        <hr className="client-hr" />
                        <h6
                          className="p-txt para-addition"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description && item.description
                          )}
                        ></h6>
                        <hr class="client-hr"></hr>
                        <div className="footer-content">
                          <h6 className="p-txt minute">{item?.session_time}</h6>
                          <a
                            href={item?.button_link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-100"
                          >
                            <button className="primary-btn w-100">
                              {item?.button_title}
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2"
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
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/*addition-recovery sec end */}

      {/*Supervised medical sec start */}
      {!window.cn(supervisedMedical) && supervisedMedical && (
        <div className="addition-recovery weight-loss" id="a_recovery2">
          <div className="container small main-content">
            <div className="header">
              <h1 className="sec-header text-center">
                Supervised medical weight loss program
              </h1>
            </div>
            <div className="content">
              <div
                className="row  justify-content-center"
                ref={weightref}
              >
                {supervisedMedical.length > 0 &&
                  supervisedMedical.map((item, index) => (
                    <div
                      className="col-xl-5 col-lg-5 col-md-6 col-12 col-sm-12"
                      key={index}
                    >
                      <div className="inner-content">
                        <div className="header-content-tab">
                          <h6 className="p-txt client">{item?.title}</h6>
                          <h6 className="p-txt">{item?.sub_title}</h6>
                          <h6 className="p-txt starting-at">Starting at</h6>
                          <h4 className="p-header">${item?.price}</h4>
                        </div>

                        <hr className="client-hr" />
                        <h6
                          className="p-txt para-addition"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description && item.description
                          )}
                        ></h6>
                        <hr className="client-hr" />

                        <div className="footer-content">
                          <h6 className="p-txt minute">{item?.session_time}</h6>
                          <a
                            href={item?.button_link}
                            target="_blank"
                            rel="noreferrer"
                            className="w-100"
                          >
                            <button className="primary-btn w-100">
                              {item?.button_title}
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2"
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
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/*Supervised medical sec end */}

      {/*telemedicine sec start */}

      {!window.cn(virtualTeleMedicine) && (
        <div className="telemedicine" id="provide-v">
          <div className="container small main-content">
            <div className="content">
              <div className="row">
                {virtualTeleMedicine.length > 0 &&
                  virtualTeleMedicine.map((item, index) => (
                    <Fragment key={index}>
                      <div className="header text-center">
                        <h1 className="sec-header">{item?.title}</h1>
                        <p className="sub-text">{item?.sub_title}</p>
                      </div>

                      {!window.cn(item?.extra_obj) && item?.extra_obj && (
                        <div className="col-12">
                          <div className="inner-content">
                            <div className="row justify-content-center">
                              <div className="col-lg-11 col-md-12">
                                <div className="row two-boxes">
                                  {JSON.parse(item?.extra_obj).length > 0 &&
                                    JSON.parse(item?.extra_obj).map(
                                      (subItem, subIndex) => (
                                        <div
                                          className="col-lg-6 col-md-6"
                                          id={`box${subIndex}`}
                                          key={subIndex}
                                        >
                                          <div className="box">
                                            <h4 className="p-header">
                                              {subItem?.title}
                                            </h4>
                                            <h6
                                              className="p-txt"
                                              dangerouslySetInnerHTML={createMarkup(
                                                subItem?.description &&
                                                  subItem.description
                                              )}
                                            ></h6>
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-12">
                        {!window.cn(item?.cities) && item?.cities && (
                          <div className="state">
                            <div className="first">
                              <div className="row mx-auto state">
                                {item?.cities.split(",").map((item, index) => (
                                  <div className="item" key={index}>
                                    <h6 className="p-txt">
                                      <img
                                        src={map4}
                                        alt="map"
                                        className="img-fluid mr-1"
                                      />
                                      {item}
                                    </h6>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/*telemedicine sec end */}

      {/*cancallation policy sec start */}

      {!window.cn(cancellationPolicy) && cancellationPolicy && (
        <div className="cancallation">
          <div className="container  small main-content">
            {!window.cn(cancellationPolicy) &&
              cancellationPolicy.length > 0 &&
              cancellationPolicy.map((item, index) => (
                <div className="content" key={index}>
                  <h1 className="sec-header">{item?.title}</h1>
                  <h6
                    className="p-txt"
                    dangerouslySetInnerHTML={createMarkup(
                      item?.description && item.description
                    )}
                  ></h6>
                  <p className="p-txt highlighted">{item?.sub_title}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      {/*cancallation policy sec end */}

      <div className="footer-vector fees" id="removeP">
        <Footer
          footerProps={!window.cn(footerData) && footerData}
          menuSettings={!window.cn(menuSettings) && menuSettings}
        />
      </div>

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};
export default Fees;
