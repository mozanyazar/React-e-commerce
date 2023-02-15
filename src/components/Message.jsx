import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthStore } from "../store/Auth";

const Message = () => {
  const { message, setMessage } = AuthStore();
  useEffect(() => {
    if (message.message != undefined) {
      if (!message.isSucces) {
        toast.error(message.message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          icon: true,
        });
      } else if (message.isSucces) {
        toast.success(message.message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          icon: true,
        });
      }
    } else return;
  }, [message]);
  return (
    <>
      <ToastContainer className="toastCont" icon={true} />
    </>
  );
};

export default Message;
