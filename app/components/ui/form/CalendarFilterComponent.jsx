import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "primereact/calendar";
import React, { useState } from "react";

const CalendarFilterComponent = ({
  settings = "month,year,all",
  filterForm = {},
  updateFilterForm = () => {},
}) => {
  // params
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // router
  const router = useRouter();
  const handleDateChange = (e, field, formatOptions) => {
    const date = e.value;
    const formattedDate = date.toLocaleString("default", formatOptions);
    updateFilterForm(field, formattedDate);

    // add filter
    const params = new URLSearchParams(searchParams);
    const month_params = params.get("m");
    const year_params = params.get("y");
    params.set("y", date);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center  relative gap-3">
      {settings.includes("month") && (
        <Calendar
          inputId="date"
          value={filterForm?.full_date}
          onChange={(e) => handleDateChange(e, "month", { month: "long" })}
          className="border border-[#FFFFFF] text-white  rounded-[1px] w-[200px]"
          view="month"
          name="month"
          placeholder="Month"
          dateFormat="MM"
          showIcon
        />
      )}
      {settings.includes("year") && (
        <Calendar
          inputId="date"
          value={filterForm?.full_date}
          onChange={(e) => handleDateChange(e, "year", { year: "numeric" })}
          className="border border-[#FFFFFF] text-white  rounded-[1px] w-[200px]"
          view="year"
          name="year"
          placeholder="Year"
          dateFormat="yy"
          showIcon
        />
      )}
      {settings.includes("all") && (
        <>
          <Calendar
            inputId="date"
            value={filterForm?.full_date}
            onChange={(e) => handleDateChange(e, "month", { month: "long" })}
            className="border text-gray-700 p-2 rounded-md w-full"
            view="month"
            name="month"
            placeholder="Month"
            dateFormat="MM"
            showIcon
          />
          <Calendar
            inputId="date"
            value={filterForm?.full_date}
            onChange={(e) => handleDateChange(e, "year", { year: "numeric" })}
            className="border text-gray-700 p-2 rounded-md w-full"
            view="year"
            name="year"
            placeholder="Year"
            dateFormat="yy"
            showIcon
          />
        </>
      )}

      {filterForm.date && (
        <i
          className="pi text-gray-500 cursor-pointer pi-times absolute right-0 flex h-full items-center pr-3"
          onClick={(e) => {
            e.stopPropagation();
            updateFilterForm("date", "");
          }}
        ></i>
      )}
    </div>
  );
};

export default CalendarFilterComponent;
