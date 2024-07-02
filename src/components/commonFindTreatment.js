import { createMarkup } from "../utils/utils";
import { useEffect, useState } from "react";

const CommonFindTreatment = ({ tratmentData }) => {
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
      {tratmentData && tratmentData.length > 0 && (
        <div className="adhd-tratment">
          {tratmentData.map((item, index) => (
            <>
              <div className="logo-strip">
                <div className="wrap">
                  <img
                    src={item.image}
                    className="img-fluid logo"
                    alt="sec-logo"
                  />
                  <span>Ada Psychiatry</span>
                </div>
              </div>
              <div className="container">
                <div className="col">
                  <div className="text-block">
                    <div className="text-center">
                      <h1 className="service-heading no-border">{item.title}</h1>
                    </div>
                    <h6
                      className="p-txt"
                      dangerouslySetInnerHTML={createMarkup(
                        item?.description && item.description
                      )}
                    ></h6>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};
export default CommonFindTreatment;
