import { notification } from "antd";

export const notifySuccess = (message) => {
  notification.success({
    message: "Success",
    description: message,
  });
};

export const notifyError = (message) => {
  notification.error({
    message: "Error",
    description: message,
  });
};
