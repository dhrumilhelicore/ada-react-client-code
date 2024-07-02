import { useEffect, useState } from "react";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import { getPageDetails } from "../../service/pageDetailsService";
import { GETALLDATA } from "../../config/apiConstant";
import Loader from "../../components/loader";
import { createMarkup } from "../../utils/utils";

const PrivayPolicy = () => {
  document.title = "Privay Policy | Ada";
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [pageLoader, setPageLoader] = useState(true);
  const [footerData, setFooterData] = useState();
  const [globalSetting, setGlobalSetting] = useState("");
  const [menuSettings, setMenuSettings] = useState();
  const [privacyPolicy, setPrivacyPolicy] = useState();
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

  //api call for get common details
  const getCommonPageDetails = () => {
    getPageDetails(GETALLDATA, "").then((response) => {

      const { common_footer_block, common_global_settings_block, common_menu_settings_block, common_privacy_policy_block
      } = response.data.data;
      setFooterData(common_footer_block);
      setPrivacyPolicy(common_privacy_policy_block);
      setGlobalSetting(
        !window.cn(common_global_settings_block) &&
          !window.cn(common_global_settings_block[0])
          ? common_global_settings_block
          : ""
      );
      setMenuSettings(!window.cn(common_menu_settings_block) &&
        !window.cn(common_menu_settings_block[0])
        ? common_menu_settings_block
        : "");
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
            : ""}
      />
      <div className="top-sec-gap">
        {!window.cn(privacyPolicy) && privacyPolicy &&
          <div className="terms-condition">
            <div className="header">
              <h1 className="main-header">Privacy Policies</h1>
            </div>
            <div
              className={
                innerWidth >= 2200 ? "terms-list container px-0" : "terms-list"
              }
            >
              <div className="content">
                {privacyPolicy.map((item, index) => (
                  <h6
                    key={index}
                    className="p-txt"
                    dangerouslySetInnerHTML={createMarkup(
                      item?.description && item.description
                    )}
                  ></h6>

                ))}
              </div>
            </div>
          </div>
        }
      </div>
      <Footer footerProps={!window.cn(footerData) && footerData} menuSettings={!window.cn(menuSettings) && menuSettings} />

      {/*loaddeerr*/}
      {pageLoader && <Loader />}
    </>
  );
};

export default PrivayPolicy;
