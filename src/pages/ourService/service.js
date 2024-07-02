import React, { useEffect, useState, useRef } from "react";
import { createMarkup } from "../../utils/utils";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import RecentBlogs from "../../components/recentBlogs";
import Struggling from "../../components/struggling";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import pageTitleBg from "../../assets/images/service-bg.png";
import { Helmet } from "react-helmet";

const Service = () => {
  const [serviceDetails, setServiceDetails] = useState();
  const [innerServiceDetails, setInnerServiceDetails] = useState();
  const [recentBlogs, setRecentBlogs] = useState();
  const [struggling, setStruggling] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  const ref = useRef(null);
  document.title = "Our Services | Ada";

    useEffect(() => {
      getServicePageDetails();
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

    // Function to calculate the maximum height of .panel elements
    const MaxHeight = () => {
      setWindowWidth(window.innerWidth);
  
      if (!window.cn(serviceDetails)) {
        const contentElements = document.querySelectorAll(".inner-services-sec .box .text-box");
        let maxHeight = 0;
      
        contentElements.forEach((content) => {
          const height = content.getBoundingClientRect().height;
          maxHeight = Math.max(maxHeight, height);
        });
      
        const imgElements = document.querySelectorAll(".inner-services-sec .box .img-box img");
        imgElements.forEach((img) => {
          img.style.minHeight = `${maxHeight}px`;
        });
      }
   };


   useEffect(() => {
    // Add event listener for resizing the window (in case the content changes dynamically)
    function handleResize() {
      MaxHeight();
    }
  
    window.addEventListener("resize", handleResize);
  
    // Call the function once the component has loaded
    MaxHeight();
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array because this effect only runs once on component mount
  
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
  

  const getServicePageDetails = () => {
    getPageDetails(GETALLDATA, "our_services").then((response) => {
      const {
        service_service_main_block,
        service_services_block,
        recent_blog,
        common_ada_help_block,
        common_global_settings_block,
        common_footer_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setServiceDetails(service_service_main_block);
      setInnerServiceDetails(service_services_block);
      setStruggling(common_ada_help_block);
      setRecentBlogs(recent_blog);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "services"));
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

      <section
        className="page-title service"
        style={{ backgroundImage: `url(${pageTitleBg})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="text-wrap">
                <h1>Our Services</h1>
                <p id="providesHd">
                  Ada psychiatry provides exceptional care. Our experts will
                  customize your treatment plan to fit your specific needs.
                  Through shared decision-making, you will be one step closer to
                  a better you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* service sec start */}
      <div id="medication-management">
        {innerServiceDetails && (
          <div className="inner-services-sec">
            <div className="container">
            {
                    innerServiceDetails.map((item, index) => (
                      <div className="box">
                      <div className="row align-items-center" key={index}>
                        {index % 2 === 0 ? (
                          <>
                            <div className="col-lg-6 col-xl-6 col-md-6 col-12 col-sm-12 content">
                              <div className="img-box">
                                <img
                                  src={item?.image}
                                  className="img-fluid"
                                  alt="service-img"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-xl-6 col-md-6 col-12 col-sm-12 content">
                              <div className="text-box left">
                              <h4 className="service-heading">{item?.title}</h4>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item?.description
                                )}
                              ></h6>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-6 col-xl-6 col-md-6 col-12 col-sm-12 content" style={{ order: window.innerWidth < 767 ? 1 : 'unset' }}>
                              <div className="text-box right">
                              <h4 className="service-heading">{item?.title}</h4>
                              <h6
                                className="p-txt"
                                dangerouslySetInnerHTML={createMarkup(
                                  item?.description && item?.description
                                )}
                              ></h6>
                              </div>
                            </div>
                            <div className="col-lg-6 col-xl-6 col-md-6 col-12 col-sm-12 content">
                              <div className="img-box">
                                <img
                                  src={item?.image}
                                  className="img-fluid"
                                  alt="service-img"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      </div>
                    ))
                  }
            </div>
          </div>
        )}

        {/* service sec end */}

        {/*struggling sec */}

        <div className="bg-light">
          {struggling && <Struggling struggling={struggling} />}
        </div>

        {/* recent blog sec start */}
        <div className="service-recent-blogs" id="srb">
          {recentBlogs && <RecentBlogs recentBlogs={recentBlogs} />}
        </div>
      </div>
      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default Service;
