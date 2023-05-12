import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as alertActions } from "redux/reducers/alert";
import { message } from "antd";

export default function CustomAlert() {
  const dispatch = useDispatch();
  const { message: cusMessage, level = "error", isOpen } = useSelector((state) => state.alert);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(alertActions.remove());
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
