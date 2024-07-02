import { useEffect, useState } from "react";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import CommonFaq from "../../components/commonFaq";
import TreatmentWorks from "../../components/treatmentWorks";
import { createMarkup } from "../../utils/utils";
import Loader from "../../components/loader";
import vector from "../../assets/images/pattern3.svg";
import vectorTop from "../../assets/images/vector10.svg";
import vectorTopMobile from "../../assets/images/vector10-m.svg";
import { Helmet } from "react-helmet";

const WeightLoss = () => {
  const [faqData, setFaqData] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [aboutWeightLoss, setAboutWeightLoss] = useState();
  const [medicalWeightLoss, setMedicalWeightLoss] = useState();
  const [dietBlock, setDietBlock] = useState();
  const [moreDetails, setMoreDetails] = useState();
  const [fingerTipsData, setFingerTipsData] = useState();
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [loader, setLoader] = useState(true);
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  useEffect(() => {
    getWeightLossPageDetalis();
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

  const getWeightLossPageDetalis = () => {
    getPageDetails(GETALLDATA, "weight_loss").then((response) => {
      const {
        faqs_weight_loss_block,
        about_weight_loss_block,
        medical_supervised_weight_loss_block,
        diet_benefits_weight_loss_block,
        more_details_benefits_weight_loss_block,
        mental_health_other_treatment_fingertips_block,
        common_global_settings_block,
        common_footer_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFaqData(faqs_weight_loss_block);
      setAboutWeightLoss(about_weight_loss_block);
      setMedicalWeightLoss(medical_supervised_weight_loss_block);
      setDietBlock(diet_benefits_weight_loss_block);
      setMoreDetails(more_details_benefits_weight_loss_block);
      setFingerTipsData(mental_health_other_treatment_fingertips_block);
      setFooterData(common_footer_block);
      setMetaData(
        meta_data.find((item) => item.page_name === "weight-loss-program")
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

      <div className="page-width-full">
        <div className="top-sec-gap"></div>
        <div className="vector opioid-addication top">
          {innerWidth > 912 ? (
            <img src={vectorTop} className="vector" alt="" />
          ) : (
            <img src={vectorTopMobile} className="vector" alt="" />
          )}
        </div>

        <div className="vector weight-loss right">
          {innerWidth > 768 ? (
            <img src={vector} className="vector" alt="" />
          ) : null}
        </div>

        {aboutWeightLoss && aboutWeightLoss.length > 0 && (
          <div className="mat-tratment weight-loss">
            <div className="container small main-content">
              {aboutWeightLoss.map((item, index) => (
                <>
                  <div className="row align-items-center">
                    <div className="col-xxl-8 col-md-6">
                      <h1 className="sec-heading text-left fw-900">
                        {item.title}
                      </h1>
                      <p
                        dangerouslySetInnerHTML={createMarkup(
                          item?.sub_title && item.sub_title
                        )}
                      ></p>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                      <div className="img-box">
                        <img
                          src={item.image}
                          className="img-fluid"
                          alt="weight-loss"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}

        {medicalWeightLoss && medicalWeightLoss.length > 0 && (
          <div className="medical">
            <div className="container small main-content">
              <div className="row">
                <div className="col">
                  {medicalWeightLoss.map((item, index) => (
                    <>
                      <div className="header" key={index}>
                        <h1 className="sec-heading1">{item.title}</h1>
                        <hr />
                        <p>{item.sub_title}</p>

                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description && item.description
                          )}
                        ></div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {dietBlock && dietBlock.length > 0 && (
          <div className="how-it-works weight-loss">
            {dietBlock.map((item, index) => (
              <div className="wrapper" key={index} id={`box${index + 1}`}>
                <div className="container small">
                  <div className="main-content">
                    <div className="row text-center mb-5">
                      <div className="col">
                        <h1 className="sec-heading1">{item.title}</h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-lg-4 col-12 col-sm-12 content first-div">
                        <div className="img-box2">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="weight"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-8 col-12 col-sm-12 content sec-div">
                        <div className="inner-content">
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              item?.description && item.description
                            )}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {moreDetails && moreDetails.length > 0 && (
          <div className="side-effects weight-loss">
            <div className="main-content">
              <div className="container small">
                <div className="header">
                  {moreDetails.map((item, index) => (
                    <h6
                      className="p-txt"
                      key={index}
                      dangerouslySetInnerHTML={createMarkup(
                        item?.description && item.description
                      )}
                    ></h6>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ sec */}
        <div className="container weight-loss">
          {faqData && <CommonFaq faqData={faqData} />}
        </div>

        {fingerTipsData && fingerTipsData.length > 0 && (
          <TreatmentWorks fingerTipsData={fingerTipsData} />
        )}

        <div className="bottom-vector weight-loss"></div>
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

export default WeightLoss;
