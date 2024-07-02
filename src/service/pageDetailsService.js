import axiosInstance from "../config/axiosInstance";

//get Main Page Details
export const getPageDetails = async (url, pageName) => {
  let response;
  try {
    response = await axiosInstance(url + "?type=front" + "&page=" + pageName);
  } catch (error) { }

  return response;
};

//get mental Health Inner Page Details
export const getInnerPageDetails = async (url, pageName, innerPageName) => {
  let response;
  try {
    response = await axiosInstance(
      url +
      "?type=front" +
      "&page_name=" +
      pageName +
      "&sub_page_name=" +
      innerPageName
    );
  } catch (error) { }

  return response;
};

//get mental Health Inner Page Details
export const getMentalHealthPageDetails = async (
  url,
  pageName,
  innerPageName,
  contentType
) => {
  let response;
  try {
    response = await axiosInstance(
      url +
      "?type=front" +
      "&page_name=" +
      pageName +
      "&sub_page_name=" +
      innerPageName +
      "&content_type=" +
      contentType
    );
  } catch (error) { }

  return response;
};
