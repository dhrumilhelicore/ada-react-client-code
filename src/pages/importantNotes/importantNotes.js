import React, { Fragment, useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import Loader from "../../components/loader";
import { GETALLDATA } from "../../config/apiConstant";
import { getPageDetails } from "../../service/pageDetailsService";
import { createMarkup } from "../../utils/utils";
import vector from "../../assets/images/page-vector.svg";
import callIcon from "../../assets/images/call.svg";
import bottomimg2 from '../../assets/images/important.png';
import callIcon2 from "../../assets/images/phone-m.png";
import { Helmet } from "react-helmet";



const ImportantNotes = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [importInfo, setImportantInfo] = useState();
  const [emergencyBlock, setEmergencyBlock] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  useEffect(() => {
    getCommonPageDetails();
    window.scroll(0, 0);
  }, []);
  document.title = "Important Info | Ada";

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
  useEffect(()=>{
    if(metaData){
      document.querySelector('meta[name="description"]').setAttribute("content", metaData.description);
      document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
      document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  },[metaData])

  //api call for get common details
  const getCommonPageDetails = () => {
    getPageDetails(GETALLDATA, "important_info").then((response) => {
      const {
        common_footer_block,
        feeinsurance_important_info_block,
        feeinsurance_emergency_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFooterData(common_footer_block);
      setImportantInfo(feeinsurance_important_info_block);
      setEmergencyBlock(feeinsurance_emergency_block);
      setMetaData(
        meta_data.find((item) => item.page_name === "important-info")
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

      <div className="important-info top-sec-gap" id="import-i">
        <div className="container">
          <div className="row page-top text-center pb-0">
          
            <img src={vector} className="page-vector" alt="vector" />
            <div className="col" id="import-i2">
              <h2 className="page-heading" id="i_info">Important information</h2>
            </div>
          </div>
        </div>
      </div>

      
        <section className="call-information" id="call_i"> 
          <div className="container">
            <div className="row">
              <div className="col">
                {!window.cn(importInfo) &&
                  importInfo &&
                  importInfo.length > 0 &&
                  importInfo.slice(0, 2).map((item, index) => (
                    <Fragment key={index}>
                      {item?.title && (
                        <h4 className="sec-heading1 text-center">
                          {item?.title}
                        </h4>
                      )}

                      <div className="box">
                        {item.extra_obj &&
                          JSON.parse(item.extra_obj).map(
                            (subItem, subIndex) => (
                              <div key={subIndex}>
                                <img src={callIcon} className="mobil-phoneIcon1" alt="phone" />
                                <img src={callIcon2} className="mobil-phoneIcon" alt="phone" />
                                <h3 className="title">
                                  {subItem?.title}
                                </h3>
                                <p>
                                    {subItem?.sub_title}
                                  </p>

                              </div>
                            )
                          )}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </section>


      <section className="urgent-care-facilities" id="uc-f">
        <div className="container">
          {!window.cn(importInfo) &&
            importInfo &&
            importInfo.length > 0 &&
            importInfo.map((item, index) => (
              <Fragment key={index}>
                {item?.title && index === 2 && (
                  <div className="row">
                    <div className="col">
                      <h4 className="sec-heading1 text-center mb-5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="row">
                    {item.extra_obj &&
                      JSON.parse(item.extra_obj).map((subItem, subIndex) => (
                        <div className="col-lg-4 col-md-6">
                          <div className="box" key={subIndex}>
                            <img src={callIcon} className="mobil-phoneIcon1" alt="phone" />
                            <img src={callIcon2} className="mobil-phoneIcon" alt="phone" />
                            <h3 className="title">{subItem?.title}</h3>
                            <p>{subItem?.sub_title}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      </section>

      {/* Medical Emergency block start */}
      {!window.cn(emergencyBlock) && emergencyBlock && (
        <div className="footer imp-info position-relative" id="medicalE">
          <div className="first-footer">
            <div className="container">
              <div className="emergency">
                <div className="main-content">
                  <div className="header">
                    <h1 className="sec-heading fw-700">
                      If you are having a psychiatric or medical emergency
                    </h1>
                  </div>
                  <div className="content">
                    <div className="row">
                      {emergencyBlock.length > 0 &&
                        emergencyBlock.map((item, index) => (
                          <div
                            className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-12 item"
                            key={index}
                          >
                            <div className="mobile-div">
                              <h4 className="p-header">{item?.title}</h4>
                              <h6 id="reach"
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item.description
                                )}
                              ></h6>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
          </div>
          <div id="imgvector">
<img src={bottomimg2} className=" img-fluid" alt="vector" />
</div>
        </div>
      )}
      {/* Medical Emergency block end */}
     
      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default ImportantNotes;
