import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Struggling from "../../components/struggling";
import RecentBlogs from "../../components/recentBlogs";
import Loader from "../../components/loader";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import OwlCarousel from "react-owl-carousel";
import { MENTAL_HEALTH_CARO } from "../../config/setting";
import { GetInnerPageLink, createMarkup } from "../../utils/utils";
import quotes5 from "../../assets/images/mh-v1.png";
import quotes9 from "../../assets/images/mh-v5.png";
import quotes10 from "../../assets/images/mh-v6.png";
import { Helmet } from "react-helmet";

const MentalHealth = () => {
  const [struggling, setStruggling] = useState();
  const [recentBlogs, setRecentBlogs] = useState();
  const [mentalHealthMainBlock, setMentalHealthMainBlock] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [healthConditions, setHealthConditions] = useState();
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState();
  const [menuSettings, setMenuSettings] = useState();
  const [loader, setLoader] = useState(true);
  const [metaData, setMetaData] = useState();

  document.title = "Mental Health | Ada";

  useEffect(() => {
    getMentalHealthPageDetalis();
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
      document
        .querySelector('meta[name="keywords"]')
        .setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  const getMentalHealthPageDetalis = () => {
    getPageDetails(GETALLDATA, "mental_health").then((response) => {
      const {
        common_ada_help_block,
        recent_blogs,
        mental_health_main_block,
        static_to_dynamic_data,
        common_global_settings_block,
        common_menu_settings_block,
        common_footer_block,
        meta_data,
      } = response.data.data;
      setStruggling(common_ada_help_block);
      setRecentBlogs(recent_blogs);
      setMentalHealthMainBlock(mental_health_main_block);
      setHealthConditions(static_to_dynamic_data);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "mental-health"));
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

      {metaData && (
        <Helmet>{metaData.title && <title>{metaData?.title}</title>}</Helmet>
      )}

      {/* mental health sec start */}
      <div className="mental-health-sec top-sec-gap" id="mental_h">
        <img
          src={quotes5}
          className="founder-img img-fluid"
          id="mhImg3"
          alt="founder-img"
        />
        <div className="header">
          <div className="inner-content">
            <h2 className="main-header">Mental Health</h2>
            <h6 className="p-txt">
              Prioritizing Your Mental Health:
              <span className="inner-txt">
                Comprehensive Psychiatric Services and Support
              </span>
            </h6>
          </div>
        </div>

        {/* wellness sec start */}
        {mentalHealthMainBlock && mentalHealthMainBlock.length > 0 && (
          <div className="wellness container small" id="mental_Wellness">
            <div
              className={
                innerWidth >= 2200 ? "content container px-0" : "content"
              }
            >
              <div className={innerWidth >= 2200 ? "row" : "row mx-0"}>
                {mentalHealthMainBlock.map((item, index) => (
                  <>
                    <div
                      className="col-xl-8 col-lg-8 col-md-8  content-div"
                      key={index}
                    >
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
                    <div className="col-xl-4 col-lg-4 col-md-4 img-box-div">
                      <div className="img-box"> 
                        <img
                          src={item.image}
                          alt="wellness"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* wellness sec end */}
      </div>
      {/* mental health sec end */}

      {/*mental condition sec start */}

      {healthConditions && healthConditions.length > 0 && (
        <div
          className="mental-condition position-relative"
          id="health_conditions"
        >
          <img
            src={quotes9}
            className="founder-img img-fluid"
            id="mhImg4"
            alt="founder-img"
          />

          <div className="container small main-content">
            <div
              className={
                innerWidth >= 2200 ? "header container px-0" : "header"
              }
            >
              <h1 className="sec-header">
                We specialize in treating mental health conditions
              </h1>
            </div>

            <div
              className={
                innerWidth >= 2200 ? "content container px-0" : "content"
              }
            >
              <div className={innerWidth >= 2200 ? "row" : "row mx-0"}>
                {healthConditions.map((item, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-4  mentalhealth-div"
                    key={index}
                  >
                    <div className="main-box">
                      <div className="back-cover">
                        <span className="p-txt">{item.title}</span>
                        <h6
                          className="p-txt para"
                          dangerouslySetInnerHTML={createMarkup(
                            item?.description && item.description
                          )}
                        ></h6>
                        <NavLink
                          to={GetInnerPageLink(item?.sub_page_name)}
                          className="view-btn"
                        >
                          View Conditions
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
                        </NavLink>
                      </div>
                      <div className="img-box">
                        <div className="cover p-txt">{item.title}</div>

                        <img
                          src={item.image}
                          className="img-fluid"
                          alt="condition"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img
            src={quotes10}
            className="founder-img img-fluid"
            id="mhImg5"
            alt="founder-img"
          />
        </div>
      )}

      {/*mental condition sec end */}

      <div id="struggMenalhealth">
        {" "}
        {struggling && <Struggling struggling={struggling} />}
      </div>

      <div id="blogMenalhealth">
        {" "}
        {recentBlogs && <RecentBlogs recentBlogs={recentBlogs} />}{" "}
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

export default MentalHealth;
