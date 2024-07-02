import arrowLeft from "../assets/images/arrow-left.svg";
import arrowRight from "../assets/images/Arrow.svg";

export const APP_BASE_URL =
  "https://www.api.adapsychiatry.com";

//http://54.187.127.113:3000
//https://www.api.adapsychiatry.com

//email Pattern
export const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

// OWLCAROUSAL HOME BANNER
export const HOME_CARO = {
  loop: true,
  responsiveClass: true,
  items: 1,
  autoplay: true,
  autoplayHoverPause: true,
  slidetransition: "linear",
  autoplaySpeed: 4000,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

//CAROUSAL PATIENT SEC
export const PATIENT_CARO = {
  center: true,
  loop: true,
  responsiveClass: true,
  dots: true,
  nav: false,
  margin: 44,
  autoplay: true,
  autoplayTimeout: 20000, 
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
      margin: 30
    },
    580: {
      items: 1.5,
    },
    768: {
      items: 2.1,
      margin:10
    },
    991: {
      items: 1.8,
    },
    1024: {
      items: 1.8,
    },
    1366: {
      items: 1.9,
    },
    1440: {
      items: 2.3,
      margin: 20
    },
    1920: {
      items: 3.2,
    }
  },
};

//BLOG CARO
export const BLOG_CARO = {
  loop: true,
  responsiveClass: true,
  dots: false,
  nav: false,
  center: true,
  margin: 10,
  navText: [
    `<img src=${arrowLeft} class="patient-caro-arrow" />`,
    `<img src=${arrowRight} class="patient-caro-arrow"  />`,
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

//recent BLOG CARO
export const RECENT_BLOG_CARO = {
  loop: true,
  responsiveClass: true,
  dots: false,
  nav: false,
  center: true,
  margin: 10,
  navText: [
    `<img src=${arrowLeft} class="patient-caro-arrow" />`,
    `<img src=${arrowRight} class="patient-caro-arrow"  />`,
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

//MENTAL HEALTH  CARO
export const MENTAL_HEALTH_CARO = {
  loop: true,
  responsiveClass: true,
  dots: false,
  nav: false,
  center: true,
  margin: 20,
  navText: [
    `<img src=${arrowLeft} class="patient-caro-arrow" />`,
    `<img src=${arrowRight} class="patient-caro-arrow"  />`,
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

//ADHD CARO
export const ADHD_CARO = {
  loop: true,
  responsiveClass: true,
  dots: false,
  nav: false,
  center: true,
  margin: 10,
  navText: [
    `<img src=${arrowLeft} class="patient-caro-arrow" />`,
    `<img src=${arrowRight} class="patient-caro-arrow"  />`,
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};
