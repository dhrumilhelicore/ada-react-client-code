import React, { useEffect, useState } from "react";
import { createMarkup } from "../../utils/utils";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import Struggling from "../../components/struggling";
import RecentBlogs from "../../components/recentBlogs";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import vector from "../../assets/images/page-vector.svg";
import vectorXs from "../../assets/images/page-vector-mobile.svg";
import vectorFooter from "../../assets/images/faq-bottom-vector.svg";
import { Helmet } from "react-helmet";

const Faq = () => {
  const [faqData, setFaqData] = useState();
  const [struggling, setStruggling] = useState();
  const [recentBlog, setRecentBlog] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetaData] = useState();

  document.title = "FAQ | Ada";

  useEffect(() => {
    getFaqPageDetalis();
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

  const getFaqPageDetalis = () => {
    getPageDetails(GETALLDATA, "faq").then((response) => {
      const {
        common_faqs_block,
        common_ada_help_block,
        common_footer_block,
        recent_blog,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFaqData(common_faqs_block);
      setStruggling(common_ada_help_block);
      setRecentBlog(recent_blog);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "faq"));
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

      <div className="top-sec-gap"></div>
      <div className="top-vector blog-details"></div>
      {faqData && (
        <div className="faqs faq-page">
          <div className="container">
            <h2 className="sec-heading">
              Frequently asked <span>questions</span>{" "}
            </h2>
            <div className="accordion" id="accordionExample">
              {faqData.length > 0 &&
                faqData.map((item, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                        <button
                          className={
                            index === 1
                              ? "btn accordion-btn btn-link que btn-block text-left"
                              : "btn accordion-btn btn-link que btn-block text-left collapsed"
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
                      className={index === 1 ? "collapse show" : "collapse"}
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div
                        className="card-body para-txt"
                        dangerouslySetInnerHTML={createMarkup(
                          item?.description
                        )}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/*struggling sec */}
      <div className="bg-light">
        {struggling && <Struggling struggling={struggling} />}
      </div>

      {/*recentblog sec   */}
      <div className="recent-blogs faqs-w" id="blogPadingBottom">
        {recentBlog && <RecentBlogs recentBlogs={recentBlog} />}
      </div>

      {<div className="bottom-vector blog-details faqs" id="faqbottomImg"></div>}

      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default Faq;
