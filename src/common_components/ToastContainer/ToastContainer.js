import { toast } from "react-toastify";

const options = {
  autoClose: 1500,
  className: "",
  position: toast.POSITION.TOP_RIGHT
};

export const toastSuccess = message => {
  console.log("toast", message);
  toast.success(message, options);
};

export const toastError = message => {
  toast.error(message, options);
};

export const toastDefault = message => {
  toast(message, options);
};
