import { useEffect } from "react";
import { message } from "antd";

export default function CustomAlert(props) {
  const { message: cusMessage, level = "error", isOpen, onClear } = props
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        onClear()
    }, process.env.REACT_APP_ALERT_TIME_SEC * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const messageAlert = () => {
    messageApi.open({
      type: level,
      content: cusMessage,
    });
  };

  return (
    <>
      {contextHolder}
      {isOpen && messageAlert()}
    </>
  );
}
