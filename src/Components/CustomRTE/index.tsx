import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomRTE: React.FC<any> = ({ contentCallback, value, disabled }) => {
  return <ReactQuill theme="snow" value={value} onChange={contentCallback} readOnly={disabled} />;
};

export default CustomRTE;
