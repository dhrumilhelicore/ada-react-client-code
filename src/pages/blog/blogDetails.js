import React, { useEffect, useState } from "react";
import { GETSINGLEDATA } from "../../config/apiConstant";
import axiosInstance from "../../config/axiosInstance";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import { createMarkup } from "../../utils/utils";
import RecentBlogs from "../../components/recentBlogs";
import Struggling from "../../components/struggling";
import { dateFormatTemplate } from "../../utils/utils";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import vector from "../../assets/images/page-vector.svg";
import bottomimg1 from "../../assets/images/botomimg.svg";

const BlogDetails = () => {
  const [blogData, setBlogData] = useState();
  const [recentBlogs, setRecentBlogs] = useState();
  const [struggling, setStruggling] = useState();
  const { id } = useParams();
  const [globalSetting, setGlobalSetting] = useState("");
  const [footerData, setFooterData] = useState();
  const [menuSettings, setMenuSettings] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const [pageLoader, setPageLoader] = useState(true);
  document.title = "Blogs | Ada";

  useEffect(() => {
    setPageLoader(true);
    getInnerBlogPageDetails();
    window.scrollTo(0, 0);
  }, [id]);

  //api call for blog page details
  const getInnerBlogPageDetails = async () => {
    try {
      const response = await axiosInstance(
        GETSINGLEDATA + "?type=front" + "&page=blog" + "&id=" + id
      );

      const { recent_blogs, data } = response.data;
      const {
        common_ada_help_block,
        common_global_settings_block,
        common_footer_block,
        common_menu_settings_block,
      } = response.data.common;

      setBlogData(data);
      setRecentBlogs(recent_blogs);
      setFooterData(common_footer_block);
      setStruggling(common_ada_help_block);
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
    } catch (error) {}
  };

  const getLimitedWords = (html, limit) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Exclude specific tags like h1 and h2
    const excludedTags = ['h1', 'h2'];
    excludedTags.forEach(tag => {
      const elements = doc.getElementsByTagName(tag);
      for (let i = elements.length - 1; i >= 0; i--) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    });

    const textContent = doc.body.textContent || '';

    const words = textContent.split(' ');

    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }

    return textContent;
  };

  const limitedText = getLimitedWords(blogData?.description, 70);


  return (
    <>
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
      <div className="top-sec-gap"></div>
      <div className="top-vector blog-details"></div>
      {blogData && (
        <>
          <section className="page-top text-center pb-0">
            <>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="col">
                      <p className="reading-time">4 Min Read</p>
                      <h2 className="sec-heading fw-900 blog-heading">
                        {blogData?.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </section>

          <section>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="inner-blog-content">
                    {innerWidth <= 576 ? (
                      <>
                        <div className="text-center">
                          <div className="author-info">
                            <div className="profile">
                              <img
                                src={blogData?.author_image}
                                className="img-fluid"
                                alt="author-img"
                              />
                            </div>
                            <p className="name">{blogData.author_name}</p>
                            <p className="created-at">
                              Written on{" "}
                              {dateFormatTemplate(blogData?.created_at)}
                            </p>
                          </div>
                          <div className="social-share">
                            <a className="f-link">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="f-link">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="f-link">
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a className="f-link">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <img
                    src={blogData?.image}
                    className="img-fluid featured-img-post"
                    alt="blog-img"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="blog-content position-relative">
                    {innerWidth >= 576 ? (
                      <>
                        <h2 className="blog-title">Introduction</h2>
                        <p dangerouslySetInnerHTML={{ __html: limitedText }}></p>

                        <div className="author-info">
                          <div className="profile">
                            <img
                              src={blogData?.author_image}
                              className="img-fluid"
                              alt="author-img"
                            />
                          </div>
                          <div>
                            <p className="name">{blogData.author_name}</p>
                            <p className="created-at">
                              Written on{" "}
                              {dateFormatTemplate(blogData?.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="share">
                          <a className="f-link">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a className="f-link">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                          <a className="f-link">
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a className="f-link">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </div>
                        <hr className="blog-sep" />
                      </>
                    ) : null}

                    <div className="raw-content">
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          blogData?.description
                        )}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      <div id="paddingBlog" >  {recentBlogs && <RecentBlogs recentBlogs={recentBlogs} />}</div> 

          {/*struggling sec */}
          <div className="bg-light">
            {struggling && <Struggling struggling={struggling} />}
          </div>
        </>
      )}

      <div className="bottom-vector blog-details"></div>

      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default BlogDetails;
