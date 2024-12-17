import React from "react";

const HeaderComponent = ({
  title = "",
  breadcrumbs = "Portal Home / Client Area",
}) => {
  return (
    <header className="text-5xl font-bold mx-5 sm:mx-0">
      {title}
      <div className="text-xs text-gray-600 mt-3">{breadcrumbs}</div>
    </header>
  );
};

export default HeaderComponent;
