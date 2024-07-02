import ArrowSvg from "../../components/arrowSvg";
import { Fragment, useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import { createMarkup, getHeaderLink, getSocialIcon } from "../../utils/utils";
import { Helmet } from "react-helmet";

const Team = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [pageLoader, setPageLoader] = useState(true);
  const [footerData, setFooterData] = useState(); 
  const [globalSetting, setGlobalSetting] = useState();
  const [teamData, setTeamData] = useState();
  const [teamAboutData, setTeamAboutData] = useState();
  const [teamEducationData, setTeamEducationData] = useState();
  const [teamCertificationData, setTeamCertificationData] = useState();
  const [teamSpecialtiesData, setTeamSpecialtiesData] = useState();
  const [teamModalitiesData, setTeamModalitiesData] = useState();
  const [menuSettings, setMenuSettings] = useState();
  const [metaData, setMetadata] = useState();

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

  //For MetaData & Description & Keywords
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

  //api call for get common details
  const getCommonPageDetails = () => {
    getPageDetails(GETALLDATA, "meet_our_team").then((response) => {
      const {
        common_footer_block,
        meet_team_about_block,
        meet_team_personal_info_block,
        meet_team_education_block,
        meet_team_certification_block,
        meet_team_specialties_block,
        common_global_settings_block,
        meet_team_modalities_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFooterData(common_footer_block);
      setTeamAboutData(meet_team_about_block);
      setTeamData(meet_team_personal_info_block);
      setTeamEducationData(meet_team_education_block);
      setTeamCertificationData(meet_team_certification_block);
      setTeamSpecialtiesData(meet_team_specialties_block);
      setTeamModalitiesData(meet_team_modalities_block);
      setMetadata(meta_data.find((item) => item.page_name === "meet-the-team"));
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
  document.title = "Meet The Team | Ada";

  return (
    <>
    <div className="team-page">
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

      <div className="top-sec-gap"> </div>

      {teamData && (
        <>
          <section className="team page-header">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h1 className="sec-heading fw-900">Meet Our Team</h1>
                </div>
              </div>
            </div>
          </section>

          <section className="team-intro v2">
            <div className="container">
              <div className="row inner-wrap">
                {teamData.length > 0 &&
                  teamData.map((item, index) => {
                    const { social_links } = JSON.parse(item?.extra_obj);
                    return (
                      <>
                        <div className="profile-img col-md-5">
                          <img
                            src={item?.image}
                            className="img-fluid"
                            alt="founder"
                          />
                        </div>
                        <div className="col-md-7 right">
                          <div className="details">
                            <h4 className="name">{item?.title}</h4>
                            <h6 className="designation">{item?.sub_title}</h6>
                            {social_links && (
                              <div className="social-icon">
                                {Object.entries(social_links).map(
                                  (item, index) => (
                                    <Fragment>
                                      <div className="icon-box gradient-icon">
                                        <a
                                          key={index} 
                                          className="f-link"
                                          target="_blank"
                                          href={item[1]}
                                          rel="noreferrer"
                                        >
                                          <i
                                            className={getSocialIcon(item[0])}
                                          ></i>
                                        </a>
                                      </div>
                                    </Fragment>
                                  )
                                )}
                              </div>
                            )}

                            {teamAboutData.length > 0 &&
                              teamAboutData.map((item, index) => (
                                <div className="content" key={index}>
                                  <h1 className="p-header">About</h1>

                                  <div
                                    dangerouslySetInnerHTML={createMarkup(
                                      item?.description && item.description
                                    )}
                                  ></div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* education content start */}
          <section className="team-edu" id="eductionHd">
            <div className="container">
              {teamEducationData.length > 0 && (
                <>
                  <div className="row">
                    <div className="col">
                      <h1 className="p-header">Education</h1>
                    </div>
                  </div>
                  <div className="row mt-3" id="mt-ed">
                    {teamEducationData.map((item, index) => (
                      <div className="col-md-6 col-lg-4" key={index}>
                        <div className="box">
                          <div className="left">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="48"
                                height="48"
                                rx="12"
                                fill="#F7EED9"
                              />
                              <g clipPath="url(#clip0_113_168)">
                                <path
                                  d="M24 29.7425C28.3748 29.7425 33.0234 28.3054 33.0234 25.6409V21.6047L24.8643 24.6644C24.5823 24.7685 24.2931 24.8206 24 24.8206C23.7069 24.8206 23.4177 24.7685 23.1412 24.6659L14.9219 21.6045V25.6409C14.9219 28.3054 19.6252 29.7425 24 29.7425Z"
                                  fill="black"
                                />
                                <path
                                  d="M37.4749 16.6664L24.2952 11.7445C24.0985 11.6789 23.9015 11.6789 23.7048 11.7445L10.656 16.6172H24C24.4531 16.6172 24.8203 16.9845 24.8203 17.4376C24.8203 17.8906 24.4531 18.2579 24 18.2579H10V35.4844C10 35.9379 10.367 36.3047 10.8203 36.3047C11.236 36.3047 11.5789 35.9956 11.6334 35.5949L11.6831 35.744C11.8256 36.1714 12.2881 36.4064 12.7205 36.2622C13.1499 36.1197 13.3823 35.6551 13.2387 35.2249L11.6406 30.4303V18.6351L23.7048 23.1306C23.803 23.1635 23.9015 23.1797 24 23.1797C24.0985 23.1797 24.197 23.1635 24.2952 23.1306L37.4749 18.2087C37.7868 18.0938 38 17.7821 38 17.4376C38 17.093 37.7868 16.7813 37.4749 16.6664Z"
                                  fill="#C18C2C"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_113_168">
                                  <rect
                                    width="28"
                                    height="28"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="info">
                            <h6 className="p-title">{item?.title}</h6>
                            <p className="profile">{item?.sub_title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Certification content start */}
            <div className="container certification">
              {teamCertificationData.length > 0 && (
                <>
                  <div className="row">
                    <div className="col">
                      <h1 className="p-header">Certification</h1>
                    </div>
                  </div>
                  <div className="row mt-3" id="mt-ed2">
                    {teamCertificationData.map((item, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="box">
                          <div className="left">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="48"
                                height="48"
                                rx="12"
                                fill="#F7EED9"
                              />
                              <g clip-path="url(#clip0_126_181)">
                                <path
                                  d="M22.4099 31.8723C21.3183 32.881 19.8086 33.1069 18.4695 32.4622C17.9854 32.229 17.5769 31.9071 17.2571 31.5216L15.4337 35.5545C15.3508 35.7379 15.4434 35.8762 15.4871 35.9272C15.5307 35.978 15.6533 36.0906 15.8472 36.0367L17.1746 35.6672C17.3258 35.6252 17.4787 35.6049 17.6295 35.6049C18.2656 35.6049 18.8642 35.9649 19.1525 36.5615L19.752 37.8021C19.8395 37.9834 20.0038 38.0015 20.0721 38.0001C20.1392 37.9992 20.3041 37.9774 20.387 37.794L23.2872 31.3789C22.9686 31.4706 22.6668 31.6348 22.4099 31.8723Z"
                                  fill="black"
                                />
                                <path
                                  d="M32.5646 35.5545L30.7412 31.5216C30.4214 31.9072 30.0129 32.2291 29.5288 32.4622C28.1897 33.1069 26.68 32.881 25.5884 31.8723C25.3315 31.6348 25.0297 31.4706 24.7109 31.3789L27.6112 37.794C27.6941 37.9775 27.8591 37.9992 27.9261 38.0001C27.9944 38.0015 28.1587 37.9834 28.2462 37.8021L28.8457 36.5615C29.1339 35.9649 29.7326 35.6049 30.3687 35.6049C30.5195 35.6049 30.6724 35.6252 30.8236 35.6672L32.151 36.0367C32.3449 36.0907 32.4675 35.9781 32.5111 35.9272C32.5549 35.8762 32.6475 35.7379 32.5646 35.5545Z"
                                  fill="black"
                                />
                                <path
                                  d="M33.9967 21.3636C32.4824 20.3267 32.0126 18.268 32.927 16.6767C33.4767 15.7202 33.1906 14.775 32.7396 14.2094C32.2886 13.6439 31.4306 13.1547 30.3759 13.4776C28.6213 14.015 26.7185 13.0989 26.0446 11.3918C25.6394 10.3656 24.7221 10 23.9987 10C23.2754 10 22.358 10.3656 21.9529 11.3919C21.2789 13.099 19.3763 14.015 17.6216 13.4777C16.5667 13.1548 15.7089 13.6439 15.2578 14.2094C14.8068 14.775 14.5207 15.7201 15.0704 16.6768C15.9849 18.268 15.515 20.3268 14.0007 21.3636C13.0904 21.987 12.9381 22.9627 13.0989 23.6679C13.2598 24.3732 13.8205 25.1861 14.9111 25.3527C16.7253 25.6299 18.0419 27.2808 17.9085 29.1113C17.8282 30.2116 18.4961 30.9391 19.1478 31.253C19.7996 31.5668 20.7847 31.6355 21.595 30.8867C22.2688 30.264 23.1339 29.9525 23.9987 29.9525C24.8637 29.9525 25.7283 30.2638 26.4023 30.8867C27.2126 31.6356 28.1978 31.5669 28.8495 31.253C29.5013 30.9391 30.1691 30.2117 30.0889 29.1113C29.9555 27.2809 31.272 25.63 33.0862 25.3527C34.1769 25.1861 34.7374 24.3731 34.8984 23.6679C35.0594 22.9626 34.907 21.9869 33.9967 21.3636ZM23.9987 28.3708C20.0298 28.3708 16.8008 25.1418 16.8008 21.1729C16.8008 17.2039 20.0297 13.9749 23.9987 13.9749C27.9677 13.9749 31.1966 17.2039 31.1966 21.1728C31.1966 25.1418 27.9677 28.3708 23.9987 28.3708Z"
                                  fill="black"
                                />
                                <path
                                  d="M24.0004 15.3174C20.7714 15.3174 18.1445 17.9444 18.1445 21.1733C18.1445 24.4022 20.7714 27.0291 24.0004 27.0291C27.2294 27.0291 29.8563 24.4022 29.8563 21.1733C29.8563 17.9444 27.2294 15.3174 24.0004 15.3174ZM27.0014 20.6055L23.3569 23.2674C23.2412 23.3519 23.1024 23.3966 22.9611 23.3966C22.9247 23.3966 22.8881 23.3936 22.8517 23.3876C22.674 23.3583 22.5155 23.2587 22.412 23.1112L21.3218 21.5591C21.1088 21.2557 21.182 20.8372 21.4853 20.6242C21.7886 20.4112 22.207 20.4844 22.4201 20.7877L23.1174 21.7805L26.2098 19.5218C26.5091 19.3033 26.929 19.3685 27.1475 19.6678C27.3661 19.9671 27.3006 20.3869 27.0014 20.6055Z"
                                  fill="#C18C2C"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_126_181">
                                  <rect
                                    width="28"
                                    height="28"
                                    fill="white"
                                    transform="translate(10 10)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div className="info">
                            <h6 className="p-title">{item?.title}</h6>
                            <p className="profile">{item?.sub_title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Certification content end */}

            {/* Specialties */}
            <div className="container">
              {teamSpecialtiesData.length > 0 && (
                <>
                  <div className="row">
                    <div className="col">
                      <h1 className="p-header" id="spe">Specialties</h1>
                    </div>
                  </div>
                  <hr class="line"></hr>
                  <div className="row mt-3">
                    <div className="col">
                      <div className="specialties">
                        {teamSpecialtiesData.map((item, index) => (
                          <div className="item" key={index}>
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_113_215)">
                                <path
                                  d="M16.61 1.61714C17.899 3.56948 19.2385 5.53296 20.5944 7.48472C20.8644 7.87483 21.2558 8.16485 21.7076 8.30972C23.95 9.02105 26.207 9.74351 28.4711 10.4542C29.8615 10.8966 30.4633 12.4722 29.5949 13.5404C28.1887 15.2876 26.7332 17.0958 25.266 18.9398C24.9738 19.3039 24.8134 19.7562 24.8108 20.223C24.8069 22.514 24.7561 24.8027 24.6584 27.089C24.5904 28.4876 23.1725 29.6033 21.9244 29.1984C19.8772 28.5392 17.7854 27.808 15.659 27.0304C15.2326 26.8746 14.7647 26.8746 14.3383 27.0304C12.2119 27.8074 10.1195 28.5386 8.07287 29.1984C6.82482 29.6009 5.40685 28.4853 5.33888 27.089C5.24044 24.8027 5.18966 22.514 5.18654 20.223C5.18384 19.7563 5.02362 19.3041 4.73185 18.9398C3.26408 17.0958 1.80861 15.2876 0.402357 13.5404C-0.462487 12.4722 0.137513 10.8984 1.52794 10.4542C3.79201 9.74351 6.04904 9.02105 8.29142 8.30972C8.74325 8.16485 9.13461 7.87483 9.4047 7.48472C10.76 5.53296 12.1 3.56948 13.3891 1.61714C14.183 0.415381 15.8207 0.415381 16.61 1.61714Z"
                                  fill="#C18C2C"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_113_215">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                            <h6 className="title">{item?.title}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Specialties end */}
          </section>

          {/* education content end */}

          {/* Modalities content start */}
          {teamModalitiesData.length > 0 && (
            <section className="modalities-sec">
              <div className="container">
              <div className="row">
                <div className="col">
                  <div className="box">
                    <h1 className="sec-heading">Modalities</h1>
                    <div className="modalities">
                      {teamModalitiesData.map((item, index) => (
                        <div className="item" key={index}>
                           <svg
                              width="42"
                              height="42"
                              viewBox="0 0 42 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.40298 9.66409C7.97371 9.64415 7.60965 9.97597 7.58972 10.4052C7.56979 10.8345 7.9016 11.1986 8.33087 11.2185C8.76014 11.2383 9.1242 10.9065 9.14413 10.4773C9.16407 10.0482 8.83225 9.68394 8.40298 9.66409ZM41.1901 22.4705C40.9956 22.9111 40.6423 23.2492 40.1953 23.4225L37.8606 24.3276C37.6505 24.409 37.4312 24.4496 37.212 24.4496C36.9647 24.4496 36.7175 24.3979 36.484 24.2948C36.0433 24.1004 35.7052 23.747 35.5319 23.3L35.3283 22.7746L33.428 23.5676C33.5196 24.1059 33.4315 24.6656 33.1642 25.1515C32.8471 25.7279 32.3221 26.1457 31.6857 26.3279C31.6594 26.3355 31.6331 26.3425 31.6068 26.3492C31.8146 26.9754 31.773 27.6808 31.4337 28.2977C30.9328 29.2085 29.9336 29.6752 28.9604 29.5462C28.9895 29.9945 28.8965 30.4544 28.6659 30.8736C28.3498 31.4484 27.8267 31.8654 27.193 32.0478C26.797 32.1619 26.3889 32.1749 25.9992 32.0904C26.0119 32.5127 25.9159 32.9429 25.6989 33.3374C25.3827 33.9124 24.8372 34.3442 24.2024 34.5221C23.9831 34.5835 23.7608 34.614 23.5406 34.614C23.1282 34.614 22.7232 34.5073 22.3587 34.298L21.715 33.9283C21.3958 34.3776 20.939 34.7077 20.4005 34.8709C20.159 34.9442 19.9122 34.9804 19.6673 34.9804C19.2614 34.9804 18.86 34.8809 18.4932 34.6848C17.9488 34.3935 17.547 33.9237 17.3365 33.3754C16.6568 33.6645 15.8595 33.6513 15.1707 33.2829C14.683 33.0221 14.3079 32.6129 14.0839 32.1317C13.3673 32.5196 12.4772 32.5529 11.7087 32.142C11.1204 31.8273 10.6894 31.3006 10.4949 30.6588C10.3842 30.2936 10.3579 29.9169 10.4137 29.5517C9.99151 29.5627 9.56643 29.4652 9.17924 29.2582C8.59099 28.9436 8.15992 28.4168 7.96534 27.775C7.77085 27.1333 7.83704 26.4559 8.15163 25.8676L8.78008 24.6925C8.63964 24.3587 8.5704 23.9937 8.50404 23.637C8.38362 22.9899 8.28994 22.589 8.00381 22.4779C7.8354 22.4126 7.39801 22.2223 6.6448 21.8866L6.39231 22.4578C6.19855 22.8963 5.84442 23.2335 5.39522 23.4074C5.1835 23.4893 4.96292 23.5302 4.74299 23.5302C4.49632 23.5302 4.25047 23.4788 4.01857 23.3763L1.72834 22.3641C0.820748 21.9629 0.408705 20.898 0.809755 19.9904L6.06829 8.09286C6.26213 7.65432 6.61617 7.31709 7.06538 7.14327C7.51458 6.96952 8.00357 6.98052 8.44203 7.17427L10.7323 8.18654C11.6399 8.58775 12.0521 9.6526 11.6509 10.5604L11.2565 11.4527L12.7472 12.1404C12.7632 12.1478 12.7789 12.1559 12.7941 12.1645C13.6134 12.6257 14.4689 12.4251 15.552 12.1711C16.9657 11.8398 18.7056 11.4329 20.7353 12.6257C23.5396 10.8922 25.694 11.7709 27.2844 12.4209C28.4697 12.9054 29.1752 13.1616 29.8879 12.7906L31.1879 12.0948L30.8301 11.1718C30.4714 10.2466 30.9323 9.20192 31.8576 8.8432L34.1924 7.93807C35.1178 7.57943 36.1624 8.04044 36.521 8.96559L41.2228 21.0938C41.3962 21.5409 41.3845 22.0298 41.1901 22.4705ZM10.4505 10.0298C10.5591 9.78402 10.4475 9.49568 10.2017 9.38707L7.91145 8.3748C7.84951 8.3474 7.78356 8.3337 7.71728 8.3337C7.6574 8.3337 7.5971 8.34486 7.53911 8.36734C7.41688 8.41459 7.32082 8.50564 7.26881 8.62344L2.0102 20.5209C1.90159 20.7666 2.01324 21.0549 2.259 21.1636L4.54923 22.1758C4.66719 22.228 4.79943 22.2306 4.92165 22.1834C5.04388 22.136 5.13986 22.0451 5.19195 21.9272L10.4505 10.0298ZM11.0937 27.9889L12.5935 25.3933C12.8406 24.8255 12.6112 24.1582 12.0638 23.8661C11.4834 23.5563 10.759 23.7755 10.4491 24.355L9.30901 26.4865C9.1598 26.7656 9.12863 27.088 9.22149 27.3942C9.31426 27.7005 9.5191 27.9514 9.79825 28.1006C10.2139 28.323 10.7232 28.2761 11.0937 27.9889ZM13.9456 30.4886L15.6028 27.2794C15.7028 26.7707 15.456 26.2377 14.998 25.9932C14.5785 25.7692 14.0658 25.8186 13.6948 26.1107L11.8385 29.3705C11.6893 29.6495 11.6582 29.9719 11.7511 30.2781C11.8439 30.5844 12.0488 30.8354 12.3278 30.9846C12.9069 31.2944 13.6326 31.0719 13.9456 30.4886ZM17.2999 31.7961L18.7694 28.972C18.8689 28.4635 18.6223 27.9309 18.1645 27.6866C17.708 27.4431 17.1316 27.5307 16.7646 27.8902L15.1637 30.9905C15.1325 31.4566 15.3756 31.904 15.7898 32.1255C16.305 32.4011 16.9473 32.2584 17.2999 31.7961ZM20.7265 33.0382L21.8196 30.9942C22.0349 30.5918 21.9974 30.0918 21.7244 29.7205C21.6201 29.5786 21.4875 29.464 21.3305 29.38C20.8742 29.1363 20.2973 29.2244 19.9301 29.5846L18.4893 32.3538C18.4407 32.8345 18.6832 33.2979 19.1122 33.5276C19.3913 33.6767 19.7137 33.7079 20.02 33.615C20.3263 33.5221 20.5772 33.3172 20.7265 33.0382ZM24.0978 31.1515C24.0623 31.1317 23.2582 30.6639 23.2582 30.6639C23.2287 30.9916 23.1364 31.315 22.977 31.6131L22.3525 32.7807L23.0125 33.1598C23.2636 33.304 23.5604 33.339 23.8482 33.2582C24.146 33.1747 24.4015 32.973 24.5489 32.7048C24.8505 32.1568 24.648 31.46 24.0978 31.1515ZM32.0355 23.4777C31.9312 23.2627 31.7655 23.086 31.5565 22.9668L25.3469 19.4275C24.2924 18.8265 22.9752 19.3598 21.45 19.9772C20.3097 20.4388 19.028 20.9575 17.7294 20.9577C16.4604 20.9577 15.1754 20.4628 13.9886 18.9358C13.8327 18.7358 13.773 18.4874 13.821 18.2372C13.8692 17.9862 14.0171 17.7776 14.2374 17.6492C15.9883 16.6272 17.4674 15.5116 18.6331 14.3336C18.9364 14.027 19.2423 13.7452 19.5486 13.4885C18.2052 12.898 17.0563 13.1664 15.8517 13.4488C14.6616 13.7277 13.4312 14.0162 12.1749 13.3215L10.7261 12.6531L7.17571 20.6859C7.89504 21.0065 8.33309 21.1975 8.47902 21.2542C9.35405 21.5939 9.6026 22.4294 9.74386 23.1316C10.5044 22.3848 11.6929 22.1802 12.682 22.708C13.4147 23.0991 13.8773 23.8099 13.9826 24.5825C14.5283 24.4821 15.105 24.5622 15.6162 24.8351C16.2305 25.163 16.6607 25.7164 16.8428 26.3501C17.4701 26.1506 18.1686 26.201 18.7826 26.5286C19.3968 26.8564 19.827 27.4097 20.0092 28.0435C20.6369 27.8439 21.3354 27.8943 21.9492 28.2223C22.2422 28.3789 22.495 28.5869 22.7028 28.8411L25.9704 30.6909L25.9715 30.6916C26.233 30.8368 26.5377 30.8706 26.8301 30.7865C27.1257 30.7013 27.3694 30.5077 27.516 30.241C27.8158 29.696 27.6118 29.0006 27.0614 28.6907C27.0256 28.6706 22.4741 26.0963 22.4741 26.0963C22.1582 25.9187 22.0463 25.5185 22.224 25.2026C22.4018 24.8867 22.8019 24.7747 23.1177 24.9525L28.7357 28.1137L28.7367 28.1142C29.287 28.4168 29.9811 28.2155 30.2838 27.6651C30.5836 27.1201 30.3796 26.4247 29.8292 26.1149C29.8291 26.1148 29.8289 26.1147 29.8288 26.1146C28.2408 25.2252 26.9173 24.4825 25.5513 23.7006C25.2368 23.5206 25.1278 23.1197 25.3078 22.8051C25.4879 22.4905 25.8888 22.3815 26.2034 22.5616C27.5648 23.341 28.886 24.0823 30.4718 24.9705C30.7307 25.1154 31.0337 25.1494 31.3247 25.066C31.6223 24.9809 31.8672 24.7866 32.0144 24.5189C32.192 24.1957 32.1998 23.8162 32.0355 23.4777ZM34.8537 21.5506L31.6659 13.3277L30.5006 13.9515C29.2067 14.6248 27.9769 14.122 26.7878 13.6359C25.1783 12.9779 23.514 12.2975 21.1149 13.9433C20.604 14.2925 20.0832 14.7342 19.566 15.2569C18.422 16.413 17.0054 17.5072 15.35 18.514C17.0497 20.3428 18.8698 19.6059 20.9574 18.7608C22.6448 18.0777 24.3895 17.3713 25.9968 18.2874L32.2063 21.8267C32.4612 21.972 32.6856 22.1582 32.8722 22.3774L34.8537 21.5506ZM39.9991 21.5683L35.2973 9.44006C35.2226 9.2472 35.0378 9.12891 34.8424 9.12891C34.7839 9.12891 34.7244 9.1395 34.6668 9.16181L32.3322 10.0669C32.0816 10.1641 31.9568 10.4469 32.0539 10.6974L36.7557 22.8257C36.8023 22.9458 36.894 23.0412 37.0138 23.0941C37.1337 23.147 37.2659 23.1504 37.3862 23.1038L39.7209 22.1987C39.841 22.1521 39.9364 22.0604 39.9893 21.9406C40.0422 21.8207 40.0457 21.6885 39.9991 21.5683ZM34.1161 10.4271C33.6876 10.4271 33.338 10.7765 33.338 11.2051C33.338 11.6337 33.6875 11.9832 34.1161 11.9832C34.5446 11.9832 34.8942 11.6337 34.8942 11.2051C34.8942 10.7766 34.5446 10.4271 34.1161 10.4271Z"
                                fill="#C18C2C"
                              />
                            </svg>

                            <h6 className="title">
                              {item?.title}
                            </h6>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-center">
                      <a
                        href={
                          !window.cn(globalSetting) &&
                          globalSetting &&
                          getHeaderLink(globalSetting, "book_appointment")
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="primary-btn" id="modalities-btn">
                          Book An Appointment
                          <ArrowSvg />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </section>
          )}

          {/* Modalities content end */}
        </>
      )}
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

export default Team;
