import React from "react";

const Message = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return null;
  }
  return (
    <div
      className={`${
        errorMessage ? "bg-red-600" : "bg-green-600"
      } py-2 px-5 text-lg transition-all ease-out text-white rounded-md duration-300 fixed top-7 left-1/2 -translate-x-1/2`}
    >
      {errorMessage ? errorMessage : successMessage}
    </div>
  );
};

export default Message;
