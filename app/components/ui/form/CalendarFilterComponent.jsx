import { Calendar } from "primereact/calendar";
import React, { useState } from "react";

const CalendarFilterComponent = ({
  settings = "month,year,all",
  filterForm = {},
  updateFilterForm = () => {},
}) => {
  const handleDateChange = (e, field, formatOptions) => {
    const date = e.value;
    const formattedDate = date.toLocaleString("default", formatOptions);
    updateFilterForm(field, formattedDate);
  };

  return (
    <div className="flex justify-center w-full relative gap-3">
      {settings.includes("month") && (
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
      )}
      {settings.includes("year") && (
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
