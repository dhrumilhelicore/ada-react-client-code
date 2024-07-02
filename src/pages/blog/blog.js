import React, { useEffect, useState } from "react";
import { GETALLDATA } from "../../config/apiConstant";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { getPageDetails } from "../../service/pageDetailsService";
import Struggling from "../../components/struggling";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import OwlCarousel from "react-owl-carousel";
import { BLOG_CARO } from "../../config/setting";
import vector from '../../assets/images/page-vector.svg';
import footerWave from '../../assets/images/footer-wave.svg';
import bottomimg from '../../assets/images/botomimg.svg';
import { Helmet } from "react-helmet";


const Blog = () => {
  const [blogData, setBlogData] = useState();
  const [struggling, setStruggling] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [footerData, setFooterData] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  const [menuSettings, setMenuSettings] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [metaData, setMetaData] = useState();

  document.title = "Blogs | Ada";

  const navigate = useNavigate();
  useEffect(() => {
    getBlogPageDetails();
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
        document.querySelector('meta[name="description"]').setAttribute("content", metaData.description);
        document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
        document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
    }
  }, [metaData]);

  //api call for blog page details
  const getBlogPageDetails = async () => {
    getPageDetails(GETALLDATA, "blog").then((response) => {
      const {
        blog,
        common_ada_help_block,
        common_footer_block,
        common_menu_settings_block,
        common_global_settings_block,
        meta_data,
      } = response.data.data;
      setBlogData(blog);
      setStruggling(common_ada_help_block);
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "blog"));
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
      {/* blog sec start */}
      <Header
        headerData={
          !window.cn(globalSetting) &&
          globalSetting !== "" &&
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

      {metaData && 
        <Helmet>
          {metaData.title && <title>{metaData?.title}</title>}
        </Helmet>
      }
        <div className="top-sec-gap"></div>
        <div className="top-vector blog-details"></div>
          <div className="page-bg page-top pb-0 blog-archive"></div>
      
          {blogData && (
            <div className="blog-sec">
              <div>
                <div className="main-blogs">
                  <div>
                    <div className="container">
                      <div className="row text-center mb-5" id="removePb">
                        <div className="col">
                          <h2 className="sec-heading">Blogs & Articles</h2>
                          <h6 className="sub-heading ">
                          ADA digital magazine devoted to Mental health and wellness
                          </h6>
                        </div>
                      </div>

                      <div className="row featured-post">
                        {blogData.length > 0 &&
                          blogData.slice(0, 1).map((item, index) => (
                            <>
                              <div
                                className={
                                  index === 1
                                    ? "col-xl-8 col-lg-8 col-md-6 col-12 col-sm-12 mobile-sec-div box-div"
                                    : "col-xl-8 col-lg-8 col-md-6 col-12 col-sm-12 box-div"
                                }
                                key={index}
                              >
                                <img
                                  src={item?.image}
                                  className="img-fluid"
                                  alt="blog-img"
                                />
                              </div>

                              <div className="col-xl-4 col-lg-4 col-md-6 col-12 col-sm-12 box-div">
                                <div className="info">
                                <h2 className="title">{item?.title}</h2>
                                <p className="excerpt">
                                  With our recent release of Warehouse
                                  Connectors, we've made it easier than ever to
                                  automatically pull data from your
                                  source-of-truth warehouse into Mixpanel to
                                  analyze and glean insights from. This allows
                                  teams like product, marketing, engineering,
                                  design, and others to …
                                </p>
                                <div
                                  className="read-more-btn"
                                  role="button"
                                  onClick={() => navigate(`/blog/${item?.id}`)}
                                >
                                  Read More
                                  <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2"
                                  >
                                    <path
                                      d="M3.09473 12L19.1602 12"
                                      stroke="#C18C2C"
                                    />
                                    <path
                                      d="M10.959 5C10.959 5 11.9434 11.9871 19.7156 11.9871"
                                      stroke="#C18C2C"
                                    />
                                    <path
                                      d="M10.959 19C10.959 19 11.9434 12.0129 19.7156 12.0129"
                                      stroke="#C18C2C"
                                    />
                                  </svg>
                                </div>
                              </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="inner-blog-content">
                    <div className="container">

                    <div className="row">
                            {blogData.length > 0 &&
                              blogData.slice(1).map((item, index) => (
                                <div
                                  className="col-xl-4 col-lg-4 col-md-6 col-12 col-sm-12"
                                  key={index}
                                >
                                  <div className="blog-card">
                                    <div className="img-box1">
                                      <img
                                        src={item?.image}
                                        className="img-fluid"
                                        alt="blog-img"
                                      />
                                    </div>
                                    <div className="info">
                                      <h2 className="title">{item?.title}</h2>
                                      <p className="excerpt">
                                        Life can seem challenging at times for
                                        everyone. Those with ADHD may experience
                                        symptoms that make them even more
                                        complex than the average person. ADHD
                                        can impact your home, work, and personal
                                        environment.
                                      </p>
                                      <div
                                        className="read-more-btn"
                                        role="button"
                                        onClick={() =>
                                          navigate(`/blog/${item?.id}`)
                                        }
                                      >
                                        Read More
                                        <svg
                                          width="25"
                                          height="25"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="ml-2"
                                        >
                                          <path
                                            d="M3.09473 12L19.1602 12"
                                            stroke="#C18C2C"
                                          />
                                          <path
                                            d="M10.959 5C10.959 5 11.9434 11.9871 19.7156 11.9871"
                                            stroke="#C18C2C"
                                          />
                                          <path
                                            d="M10.959 19C10.959 19 11.9434 12.0129 19.7156 12.0129"
                                            stroke="#C18C2C"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* blog sec end */}

          {/*struggling sec */}
          <div class="bg-light">
            {struggling && <Struggling struggling={struggling} />}       
          </div>


        <div className="bottom-vector blog-details " id="v-bottomborder"></div>
     

      <section>
        {/* <img src={footerWave} alt="wave" /> */}
        <Footer
          footerProps={!window.cn(footerData) && footerData}
          menuSettings={!window.cn(menuSettings) && menuSettings}
        />                            
      </section>                                    
    

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default Blog;
