import { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getInnerPageDetails } from "../../service/pageDetailsService";
import { STATICTODYNAMIC } from "../../config/apiConstant";
import CommonFaq from "../../components/commonFaq";
import Loader from "../../components/loader";
import { createMarkup } from "../../utils/utils";
import care from "../../assets/images/care.svg";
import vector from "../../assets/images/vector13.svg";
import vectorTop from "../../assets/images/vector10.svg";
import vectorTopMobile from "../../assets/images/vector10-m.svg";
import { Helmet } from "react-helmet";

const MAT = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [faqData, setFaqData] = useState();
  const [matData, setMatData] = useState();
  const [worksData, setWorksData] = useState();
  const [tratmentData, setTreatmentData] = useState();
  const [appointmentData, setAppointmentData] = useState();
  const [sideEffects, setSideEffects] = useState();
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [loader, setLoader] = useState(true);
  const [metaData, setMetaData] = useState();

  document.title = "MAT | Ada";

  useEffect(() => {
    getMATPageDetalis();
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

  useEffect(()=>{
    if(metaData){
      document.querySelector('meta[name="description"]').setAttribute("content",metaData.description);
      document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
      document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  },[metaData])

  const getMATPageDetalis = () => {
    getInnerPageDetails(
      STATICTODYNAMIC,
      "substance_abuse",
      "Medication Assistant Therapy"
    ).then((response) => {
      const {
        substance_abuse_other_main_block,
        substance_abuse_other_how_it_work_block,
        substance_abuse_other_treatment_block,
        substance_abuse_other_appointment_work_block,
        substance_abuse_other_side_effects_block,
        substance_abuse_other_faqs_block,
        common_global_settings_block,
        common_footer_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setMatData(substance_abuse_other_main_block);
      setWorksData(substance_abuse_other_how_it_work_block);
      setTreatmentData(substance_abuse_other_treatment_block);
      setAppointmentData(substance_abuse_other_appointment_work_block);
      setSideEffects(substance_abuse_other_side_effects_block);
      setFaqData(substance_abuse_other_faqs_block);
      setFooterData(common_footer_block);
      setMetaData(
        meta_data.find(
          (item) => item.page_name === "medication-assistant-therapy"
        )
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
            : ""
        }
      />

      {metaData && 
        <Helmet>
          {metaData.title && <title>{metaData?.title}</title>}
        </Helmet>
      }

      <div class="page-width-full">
        <div className="top-sec-gap"></div>

        <div className="vector opioid-addication top">
          {innerWidth > 912 ? (
            <img src={vectorTop} className="vector" alt="" />
          ) : (
            <img src={vectorTopMobile} className="vector" alt="" />
          )}
        </div>

        <div className="vector opioid-addication mat right">
          {innerWidth > 768 ? (
            <img src={vector} className="vector" alt="" />
          ) : null}
        </div>

        {matData && matData.length > 0 && (
          <div className="mat-tratment">
            <div className="container small main-content">
              {matData.map((item, index) => (
                <div
                  key={index}
                  className={
                    innerWidth >= 2200 ? "header container px-0" : "header"
                  }
                >
                  <div className="img-inner-content">
                    <div className="row">
                      <div className="col-xxl-8 col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                        <h1 className="sec-heading text-left fw-900 mb-3">
                          {item.title}
                        </h1>
                        <p>{item.sub_title}</p>
                        <div
                          className="desc1 mb-2"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description && item.description
                          )}
                        ></div>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description2 && item.description2
                          )}
                        ></div>
                      </div>

                      <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12">
                        <div className="img-box">
                          <div className="featured-img">
                            <img
                              src={item.image}
                              className="img-fluid main-img"
                              alt="opioid"
                            />
                            <img
                              src={care}
                              className="img-fluid injection"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {worksData && worksData.length > 0 && (
          <div className="how-it-works opioid mat">
            <div className="container small main-content">
              {worksData.map((item, index) => (
                <>
                  <div className="row">
                    <div className="col">
                      <h1 className="sec-heading ">{item.title}</h1>
                    </div>
                  </div>
                  <hr />
                  <div className="row align-items-center text-wrap">
                    <div className="col-md-4 col-12 col-sm-12 ">
                      <div className="img-box">
                        <img
                          src={item.image}
                          className="img-fluid"
                          alt="mat-img"
                          style={{ minHeight: "auto" }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-8 col-12 col-sm-12 content"
                      key={index}
                    >
                      <div className="inner-content">
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
              ))}
            </div>
          </div>
        )}

        {tratmentData && tratmentData.length > 0 && (
          <div className="start-treatment mat">
            <div className="container small main-content">
              <div className="row">
                {tratmentData.map((item, index) => (
                  <>
                    {index % 2 === 0 ? (
                      <>
                        <div
                          className="col-md-4 col-12 col-sm-12 content"
                          key={index}
                        >
                          <div className="img-box">
                            <img
                              src={item.image}
                              className="img-fluid"
                              alt="mat3-img"
                            />
                          </div>
                        </div>
                        <div className="col-md-8 col-12 col-sm-12 content">
                          <div className="inner-content">
                            <h1 className="sec-heading1 mb-3">{item.title}</h1>
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                item?.description && item.description
                              )}
                            ></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-xl-7 col-lg-7 col-md-7 col-12 col-sm-12 content first">
                          <div className="inner-content">
                            <h1 className="sec-header">
                              When can I start treatment
                            </h1>
                            <h6
                              className="p-txt"
                              dangerouslySetInnerHTML={createMarkup(
                                item?.description && item.description
                              )}
                            ></h6>
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12 content second">
                          <div className="img-box">
                            <img
                              src={item?.image}
                              className="img-fluid"
                              alt="mat3-img"
                            />
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

        {appointmentData && appointmentData.length > 0 && (
          <section className="about-vision ptb-80 bg-sec how-appointment-work">
            <div className="container small">
              <div className="row">
                <div className="col">
                  <div className="header">
                    <h2 className="main-header sec-heading">
                      How does the appointment work
                    </h2>
                  </div>
                </div>
              </div>

              <div className="card-wrapper  overflow-hidden gradient-border-bottom">
                <div className="row">
                  {appointmentData.map((item, index) => (
                    <>
                      <div
                        className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12 col-hr"
                        key={index}
                      >
                        <div className="content">
                          <div className="number" id={`num${index + 1}`}>
                            {index + 1}
                            <svg
                              width="38"
                              height="36"
                              viewBox="0 0 38 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="20" cy="18" r="18" fill="#C18C2C" />
                              <circle cx="18" cy="18" r="18" fill="#F7EED9" />
                            </svg>
                          </div>
                          <div className="inner-content">
                            <h2 className="col-heading fw-900">
                              {item?.title}
                            </h2>
                            <p>{item.sub_title}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {sideEffects && sideEffects.length > 0 && (
          <div className="prevent-opioid mat">
            <div className="container small main-content">
              {sideEffects.map((item, index) => (
                <div className="header" key={index}>
                  <h1 className="sec-heading">{item.title}</h1>
                  <hr />
                  <div
                    className="p-txt"
                    dangerouslySetInnerHTML={createMarkup(
                      item?.description && item.description
                    )}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ sec */}
        <div className="container mat">{faqData && <CommonFaq faqData={faqData} />}</div>
      </div>
      <div className="bottom-vector blog-details"></div>

      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {loader && <Loader />}
    </>
  );
};

export default MAT;
