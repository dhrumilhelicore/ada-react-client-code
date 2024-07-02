import { emailPattern } from "./setting";

// Contact Form Validation
export const ContactFormValidation = (inputDetail) => {
  let isError = false;
  let errorObj = {};
  let errors = {};

  if (window.cn(inputDetail.first_name) && !window.cb(inputDetail.first_name)) {
    errors = { ...errors, first_name: "Enter First Name *" };
    isError = true;
  } else {
    errors = { ...errors, name: "" };
  }

  if (window.cn(inputDetail.last_name) && !window.cb(inputDetail.last_name)) {
    errors = { ...errors, last_name: "Enter Last Name *" };
    isError = true;
  } else {
    errors = { ...errors, name: "" };
  }

  if (window.cn(inputDetail.email) && !window.cb(inputDetail.email)) {
    errors = { ...errors, email: "Enter Email *" };
    isError = true;
  } else if (!emailPattern.test(inputDetail.email)) {
    errors = { ...errors, email: "Enter Valid Email*" };
    isError = true;
  } else {
    errors = { ...errors, email: "" };
  }

  if (window.cn(inputDetail.message) && !window.cb(inputDetail.message)) {
    errors = { ...errors, message: "Enter Email *" };
    isError = true;
  } else {
    errors = { ...errors, message: "" };
  }

  if (window.cn(inputDetail.treatment) && !window.cb(inputDetail.treatment)) {
    errors = { ...errors, treatment: "Select Service *" };
    isError = true;
  } else {
    errors = { ...errors, treatment: "" };
  }

  errorObj = { errors, isError };

  return errorObj;
};
