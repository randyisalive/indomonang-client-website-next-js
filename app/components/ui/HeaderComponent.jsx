import Link from "next/link";
import React from "react";

const HeaderComponent = ({
  title = "",
  breadcrumbs = "Portal Home / Client Area",
  breadcrumbs_array = [],
}) => {
  return (
    <header className="text-5xl font-bold mx-5 sm:mx-0">
      <span className=" text-4xl lg:text-5xl"> {title}</span>

      <div className="text-xs text-gray-600 mt-3">
        <ul className="flex gap-1">
          {breadcrumbs_array.map((item, index) => {
            if (item.nav) {
              return (
                <li key={item.nav}>
                  <Link
                    href={item.nav}
                    className=" hover:text-blue-500 cursor-pointer"
                  >
                    {item.text}
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={item.nav}
                className=" hover:text-blue-500 cursor-pointer"
              >
                {item.text}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default HeaderComponent;
