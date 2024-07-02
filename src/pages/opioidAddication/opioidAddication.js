import { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import TreatmentWorks from "../../components/treatmentWorks";
import CommonFaq from "../../components/commonFaq";
import { getInnerPageDetails } from "../../service/pageDetailsService";
import { STATICTODYNAMIC } from "../../config/apiConstant";
import { createMarkup } from "../../utils/utils";
import Loader from "../../components/loader";
import injection from "../../assets/images/injection.svg";
import vector from "../../assets/images/vector9.svg";
import vectorTop from "../../assets/images/vector10.svg";
import vectorTopMobile from "../../assets/images/vector10-m.svg";
import { Helmet } from "react-helmet";

const OpioidAddication = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [faqData, setFaqData] = useState();
  const [opioidMainBlock, setOpioidMainBlock] = useState();
  const [preventOpioid, setPerventOpioid] = useState();
  const [disorderTeatment, setDisorderTratment] = useState();
  const [worksData, setWorksData] = useState();
  const [footerData, setFooterData] = useState();
  const [fingerTipsData, setFingerTipsData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [loader, setLoader] = useState(true);
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  useEffect(() => {
    getOpioidAddicationPageDetalis();
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

  document.title = "Opioid Addication | Ada";

  const getOpioidAddicationPageDetalis = () => {
    getInnerPageDetails(
      STATICTODYNAMIC,
      "substance_abuse",
      "Opioid Addication"
    ).then((response) => {
      const {
        substance_abuse_other_main_block,
        substance_abuse_other_how_it_work_block,
        substance_abuse_other_prevent_block,
        substance_abuse_other_treatment_block,
        substance_abuse_other_faqs_block,
        mental_health_other_treatment_fingertips_block,
        common_global_settings_block,
        common_footer_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setOpioidMainBlock(substance_abuse_other_main_block);
      setWorksData(substance_abuse_other_how_it_work_block);
      setPerventOpioid(substance_abuse_other_prevent_block);
      setDisorderTratment(substance_abuse_other_treatment_block);
      setFaqData(substance_abuse_other_faqs_block);
      setFingerTipsData(mental_health_other_treatment_fingertips_block);
      setFooterData(common_footer_block);
      setMetaData(
        meta_data.find((item) => item.page_name === "opioid-addication")
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
        <div className="vector opioid-addication right">
          {innerWidth > 768 ? (
            <img src={vector} className="vector" alt="" />
          ) : null}
        </div>

        {opioidMainBlock && opioidMainBlock.length > 0 && (
          <div className="mat-tratment opioid">
            <div className="container small main-content">
              {opioidMainBlock.map((item, index) => (
                <div
                  key={index}
                  className={
                    innerWidth >= 2200 ? "header container px-0" : "header"
                  }
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="an-overview">An Overview of</h5>
                      <h1 className="sec-heading text-left fw-900 mb-3">
                        {item.title}
                      </h1>
                      <p>{item.sub_title}</p>
                      <p
                        className="desc1"
                        dangerouslySetInnerHTML={createMarkup(
                          item?.description && item.description
                        )}
                      ></p>
                    </div>
                    <div className="col-md-6">
                      <div className="img-box">
                        <div className="featured-img">
                          <img
                            src={item.image}
                            className="img-fluid main-img"
                            alt="opioid"
                          />
                          <img
                            src={injection}
                            className="img-fluid injection"
                            alt=""
                          />
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
          <div className="how-it-works opioid">
            <div className="container small main-content">
              {worksData.map((item, index) => (
                <>
                  <div className="row text-center">
                    <div className="col">
                      <h1 className="sec-heading">{item.title}</h1>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-4 col-12 col-sm-12 content">
                      <div className="img-box">
                        <img src={item.image} className="img-fluid" alt="mat" />
                      </div>
                    </div>
                    <div
                      className="col-md-8 col-12 col-sm-12 content"
                      key={index}
                    >
                      <div className="inner-content">
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
        )}

        {preventOpioid && preventOpioid.length > 0 && (
          <div className="prevent-opioid">
            <div className="container small main-content">
              {preventOpioid.map((item, index) => (
                <div className="header" key={index}>
                  <h1 className="sec-heading">{item.title}</h1>
                  <hr />
                  <h6
                    className="p-txt"
                    dangerouslySetInnerHTML={createMarkup(
                      item?.description && item.description
                    )}
                  ></h6>
                </div>
              ))}
            </div>
          </div>
        )}

        {disorderTeatment && disorderTeatment.length > 0 && (
          <div className="start-treatment opioid">
            <div className="container small main-content">
              <div className="row text-center">
                <div className="col">
                  <h2 className="sec-heading1 mb-5">
                    {" "}
                    Opioid Use Disorder Treatment
                  </h2>
                </div>
              </div>
              <div className="row gx-4 mt-4">
                {disorderTeatment.map((item, index) => (
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
                              alt="mat2"
                            />
                          </div>
                        </div>
                        <div className="col-md-8 col-12 col-sm-12 content">
                          <div className="inner-content">
                            <h6
                              className="p-txt"
                              dangerouslySetInnerHTML={createMarkup(
                                item?.description && item.description
                              )}
                            ></h6>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-xl-7 col-lg-7 col-md-7 col-12 col-sm-12 content first">
                          <div className="inner-content">
                            <h1 className="sec-header">{item.title}</h1>
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
                              src={item.image}
                              className="img-fluid"
                              alt="mat2"
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

        {/* FAQ sec */}
        <div className="container small opioid">
          {faqData && <CommonFaq faqData={faqData} />}
        </div>

        {fingerTipsData && fingerTipsData.length > 0 && (
          <TreatmentWorks fingerTipsData={fingerTipsData} />
        )}

        <div className="bottom-vector blog-details opioid"></div>
      </div>
      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {loader && <Loader />}
    </>
  );
};

export default OpioidAddication;
