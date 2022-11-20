import React from "react";

interface Props {
  children?: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "calc(100% - 1rem)",
        padding: "0 1rem",
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
