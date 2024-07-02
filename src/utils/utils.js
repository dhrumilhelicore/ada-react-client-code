import moment from "moment";

//html markup
export const createMarkup = (converdata) => {
  return { __html: converdata };
};

//dateFormatter
export const dateFormatTemplate = (rowData) => {
  let formatedDate;
  formatedDate = moment.utc(rowData).format("MMM DD, YYYY");
  return formatedDate;
};

//get button link
export const GETLINK = (pageTitle) => {
  if (pageTitle === "home") {
    return "/";
  } else if (pageTitle === "about") {
    return "/about";
  } else if (pageTitle === "blog") {
    return "/blogs";
  } else if (pageTitle === "contactus") {
    return "/contact-us";
  } else if (pageTitle === "faq") {
    return "/faq";
  } else if (pageTitle === "mental-health") {
    return "/mental-health";
  } else if (pageTitle === "meet-the-team") {
    return "/team";
  } else if (pageTitle === "services") {
    return "/services";
  } else if (pageTitle === "weight-loss-program") {
    return "/weight-loss-program";
  } else if (pageTitle === "fees-insurance") {
    return "/fees-insurance";
  } else if (pageTitle === "important-info") {
    return "/important-info";
  } else if (pageTitle === "medication-assistant-therapy") {
    return "/medication-assitant-therapy";
  } else if (pageTitle === "opioid-addication") {
    return "/opioid-addication";
  } else if (pageTitle === "adhd") {
    return "/adhd";
  } else if (pageTitle === "depression") {
    return "/depression";
  } else if (pageTitle === "generalized-anxity-disorder") {
    return "/generalized-anxity-disorder";
  } else if (pageTitle === "post-traumatic-stress-disorder") {
    return "/post-traumatic-stress-disorder";
  } else if (pageTitle === "panic-attacks") {
    return "/panic-attacks";
  } else if (pageTitle === "premenstrual-dysphoric-disorder") {
    return "/pmdd";
  } else if (pageTitle === "postpartum-depression") {
    return "/postpartum-depression";
  } else if (pageTitle === "LGNTQUIA-community") {
    return "/LGNTQUIA-community";
  } else if (pageTitle === "mood-disorder") {
    return "/mood-disorder";
  } else if (pageTitle === "personality-disorder") {
    return "/personality-disorder";
  } else if (pageTitle === "anger") {
    return "/anger";
  } else {
    return "/";
  }
};

//get Inner Static to dynamic page button link

export const GetInnerPageLink = (pageTitle) => {
  if (pageTitle === "ADHD") {
    return "/adhd";
  } else if (pageTitle === "Depression") {
    return "/depression";
  } else if (pageTitle === "Generalized anxity Disorder") {
    return "/generalized-anxity-disorder";
  } else if (pageTitle === "Post Traumatic Stress Disorder") {
    return "/post-traumatic-stress-disorder";
  } else if (pageTitle === "Panic Attacks") {
    return "/panic-attacks";
  } else if (pageTitle === "Premenstrual Dysphoric Disorder") {
    return "/pmdd";
  } else if (pageTitle === "Postpartum depression") {
    return "/postpartum-depression";
  } else if (pageTitle === "LGNTQUIA Community") {
    return "/LGNTQUIA-community";
  } else if (pageTitle === "Insomnia") {
    return "/insomnia";
  } else if (pageTitle === "Mood Disorder") {
    return "/mood-disorder";
  } else if (pageTitle === "Personality Disorder") {
    return "/personality-disorder";
  } else if (pageTitle === "Anger") {
    return "/anger";
  } else {
    return "/";
  }
};

// <div className='align-txt-center'><NavLink to={GETLINK(homeAbout?.button_link)}><button className="btn-main">{homeAbout?.button_title}</button></NavLink></div>

//Icons classname according to fontawesome iconlist
export const IconList = [
  { label: "youtube_link", iconImg: "fab fa-youtube" },
  { label: "linkedin_link", iconImg: "fab fa-linkedin" },
  { label: "whatsapp_link", iconImg: "fab fa-whatsapp" },
  { label: "instragram_link", iconImg: "fab fa-instagram" },
  { label: "pinterest_link", iconImg: "fab fa-pinterest" },
  { label: "facebook_link", iconImg: "fab fa-facebook" },
   { label: "twitter_link", iconImg: "fab fa-twitter" },
  { label: "googleplus_link", iconImg: "fab fa-google-plus-g" },
];

// Get Social Icon
export const getSocialIcon = (iconname) => {
  let icon;
  IconList.map((item) =>
    item.label === iconname ? (icon = item.iconImg) : ""
  );
  return icon;
};

// Get Book An Appointment Button Link
export const getHeaderLink = (globalSettingObject, buttonKey) => {
  return JSON.parse(globalSettingObject[0]?.global_setting_obj)
    ?.buttons_settings[buttonKey];
};

export const checkMenuDisplayStatus = (menuItems, pageName) => {
  // let flag = false;
  // menuItems.map((item) => {
  //   if (!flag) {
  //     if (item.value === pageName) {
  //       if (item.checked) {
  //         flag = true;
  //       }
  //     }
  //   }
  // })
  // return flag;

  return menuItems.some((item) => item.value === pageName && item.checked === true);
}
