import React, { useEffect, useState } from "react";
import { ADDINQUIRY, GETALLDATA } from "../../config/apiConstant";
import axiosInstance from "../../config/axiosInstance";
import { ContactFormValidation } from "../../config/validate";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getPageDetails } from "../../service/pageDetailsService";
import Loader from "../../components/loader";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const [formData, setFormData] = useState({});
  const [btnLoader, setBtnLoader] = useState(false);
  const [alertData, setAlertData] = useState(false);
  const [error, setError] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [pageLoader, setPageLoader] = useState(true);
  const [footerData, setFooterData] = useState();
  const [menuSettings, setMenuSettings] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [metaData, setMetaData] = useState();

  document.title = "Contact Us | Ada";

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

  //api call for get common details
  const getCommonPageDetails = () => {
    getPageDetails(GETALLDATA, "").then((response) => {
      const {
        common_footer_block,
        common_global_settings_block,
        common_menu_settings_block,
        meta_data,
      } = response.data.data;
      setFooterData(common_footer_block);
      setMetaData(meta_data.find((item) => item.page_name === "contactus"));
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

  //handle change event
  const onHandleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    setFormData({ ...formData, [name]: val });
  };

  //submitForm Data
  const onSubmit = async () => {
    const { errors, isError } = ContactFormValidation(formData);
    setError(errors);

    if (!isError) {
      try {
        setBtnLoader(true);

        const { first_name, last_name, email, phone_number, message, treatment } = formData;

        const requestData = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number : phone_number,
          message: message,
          treatment: treatment,
        };

        const response = await axiosInstance.post(ADDINQUIRY, requestData);
        if (response) {
          setBtnLoader(false);
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            treatment: "",
            message: "",
          });
          setAlertData(true);
        }
      } catch (error) {
        setBtnLoader(false);
        setAlertData(false);
      }
    }
  };

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

      {metaData && 
        <Helmet>
          {metaData.title && <title>{metaData?.title}</title>}
        </Helmet>
      }
      
      <div className="top-vector blog-details "></div>
      <div className="contact-us top-sec-gap">
        <div className="main-content">
          <div className={innerWidth >= 2200 ? "container px-0" : ""}>
            <div className="content">
              <h1 className="sec-heading fw-900 text-center">Get in Touch</h1>
             <div className="box-wrap">
             <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-7 col-12 col-sm-12 px-0 mobile-sec-div">
                  <div className="contact-form">
                    <div className="main-form">
                      <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control input-grp"
                            name="first_name"
                            value={formData.first_name}
                            onChange={(e) => onHandleChange(e)}
                            autoComplete="off"
                          />
                          <p className="red-color">{error?.first_name}</p>
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control input-grp"
                            name="last_name"
                            value={formData.last_name}
                            onChange={(e) => onHandleChange(e)}
                            autoComplete="off"
                          />
                          <p className="red-color">{error?.last_name}</p>
                        </div>

                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          className="form-control input-grp"
                          name="email"
                          value={formData.email}
                          placeholder=""
                          onChange={(e) => onHandleChange(e)}
                          autoComplete="off"
                        />
                        <p className="red-color">{error?.email}</p>
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="number"
                          className="form-control input-grp"
                          name="phone_number"
                          value={formData.phone}
                          placeholder=""
                          onChange={(e) => onHandleChange(e)}
                          autoComplete="off"
                          max="10"
                        />
                        <p className="red-color">{error?.phone}</p>
                      </div>
                     
                      <div className="form-group">
                        <label>Select Services</label>
                        <select
                          id="inputState"
                          className="form-control input-grp"
                          value={formData.treatment}
                          name="treatment"
                          onChange={(e) => onHandleChange(e)}
                        >
                          <option value="" selected disabled>
                            
                          </option>
                          <option value="Mental Health">Mental Health</option>
                          <option value="Substance Abuse">
                            Substance Abuse
                          </option>
                          <option value="Weight Loss Program">
                            Weight Loss Program
                          </option>
                        </select>
                        <p className="red-color">{error?.treatment}</p>
                      </div>
                      <div className="form-group">
                        <label>Message</label>
                        <textarea
                          className="form-control input-grp textarea"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder=""
                          name="message"
                          value={formData.message}
                          onChange={(e) => onHandleChange(e)}
                          autoComplete="off"
                        ></textarea>
                        <p className="red-color">{error?.message}</p>
                      </div>

                      {alertData ? (
                        <>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            Message Sent Successfully
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      {btnLoader ? (
                        <div className="submit-btn">
                          <button className="primary-btn">
                            <div className="sm-txt d-flex align-items-center">
                              <div
                                className="spinner-border text-dark"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="submit-btn">
                          <button
                            type="button"
                            className="primary-btn w-100"
                            onClick={() => onSubmit()}
                          >
                            Submit
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
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-12 col-sm-12 first-col">
                  <div className="info-wrap">
                  <div className="locate">
                    <h4 className="main-header">Location</h4>
                    <h6 className="p-txt">
                      1820 E Ray Road, STE A107, <br /> 
                      Chandler, Arizona 85225
                    </h6>
                    <a
                      href="https://goo.gl/maps/PQVQdfrdt1A4WF7x7"
                      target="_blank"
                      rel="noreferrer"
                      className="p-txt map"
                    >
                      View On Map
                    </a>
                    <h6 className="p-txt tele">
                      Call Us:
                      <a className="tel-no" href="tel:4805269292">
                        4805269292
                      </a>
                    </h6>
                  </div>

                  <div className="locate support">
                    <h4 className="main-header">For Support</h4>
                    <h6 className="p-txt">
                      For Technical Support, Reach Out To
                    </h6>
                    <a className="mail p-txt" href="mailto:support@adapsychiatry.com">
                      Support@adapsychiatry.com
                    </a>
                  </div>

                  <div className="locate support careers">
                    <h4 className="main-header">For Careers</h4>
                    <h6 className="p-txt">
                      Interested in joining the ADA Team?
                    </h6>
                    <a className="mail p-txt" href="mailto:career@adapsychiatry.com">
                      Career@adapsychiatry.com
                    </a>
                  </div>
                  </div>
                  
                </div>
              
              </div>
             </div>
            
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-vector blog-details faqs contact-us"></div>
      <Footer
        footerProps={!window.cn(footerData) && footerData}
        menuSettings={!window.cn(menuSettings) && menuSettings}
      />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default ContactUs;
