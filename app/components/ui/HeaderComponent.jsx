import Link from "next/link";
import React from "react";

const HeaderComponent = ({
  title = "",
  breadcrumbs = "Portal Home / Client Area",
  breadcrumbs_array = [],
}) => {
  return (
    <header className="text-5xl font-bold mx-5 sm:mx-0">
      {title}
      <div className="text-xs text-gray-600 mt-3">
        <ul className="flex gap-1">
          {breadcrumbs_array.map((item, index) => {
            if (item.nav) {
              return (
                <li key={item.nav}>
                  <Link href={item.nav}>{item.text}</Link>
                </li>
              );
            }
            return <li key={item.nav}>{item.text} </li>;
          })}
        </ul>
      </div>
    </header>
  );
};

export default HeaderComponent;
