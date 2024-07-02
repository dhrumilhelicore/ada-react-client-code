import { NavLink, useLocation } from "react-router-dom";
import ArrowSvg from "./arrowSvg";
import { createMarkup } from "../utils/utils";
import { useEffect, useState } from "react";

const CommonFaq = ({ faqData }) => {
  const location = useLocation();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {faqData && faqData.length > 0 && (
        <div className="faqs">
          <h2 className="sec-heading">
            Frequently asked <span>questions</span>{" "}
          </h2>
          <div className="accordion" id="accordionExampleFaq">
            {location.pathname === "/" ? (
              <>
                {faqData.slice(0, 5).map((item, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button
                          className="btn accordion-btn btn-link  btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#collapse${index}Faq`}
                          aria-expanded="false"
                          aria-controls={`#collapse${index}Faq`}
                        >
                          {item?.title}
                        </button>
                      </h2>
                    </div>
                    <div
                      id={`collapse${index}Faq`}
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExampleFaq"
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
              </>
            ) : (
              <>
                {faqData.map((item, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button
                          className="btn accordion-btn btn-link que btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#collapse${index}Faq`}
                          aria-expanded="false"
                          aria-controls={`#collapse${index}Faq`}
                        >
                          {item?.sub_title}
                        </button>
                      </h2>
                    </div>
                    <div
                      id={`collapse${index}Faq`}
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExampleFaq"
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
              </>
            )}
          </div>

          <div className="btn-faq">
            <NavLink to="/faq">
              <button className="primary-btn mx-auto mt-5" id="bok-btn-width2">
                See All FAQs
                <ArrowSvg />
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
export default CommonFaq;
