import React from "react";

interface IProps {
  children: React.ReactNode;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  margin?: string | number;
  shadow?: boolean;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  borderRadius?: string;
  overflow?: string;
}

const ContentContainer: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflow: props.overflow || "auto",
        boxShadow: props.shadow ? "var(--dark-shadow)" : "none",
        width: props.width || "100%",
        flexDirection: props?.flexDirection || "row",
        height: props.height || "100%",
        padding: props.padding || "0px",
        margin: props.margin || "0px",
        alignItems: props.alignItems || "center",
        alignContent: props.alignContent || "space-between",
        justifyContent: props.justifyContent || "space-between",
        borderRadius: props.borderRadius || "10px",
      }}
    >
      {children}
    </div>
  );
};
export default ContentContainer;
