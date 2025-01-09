import React from "react";
import VisaCard from "./DataCard/VisaCard";
import PassportCard from "./DataCard/PassportCard";
import KitasCard from "./DataCard/KitasCard";
import MerpCard from "./DataCard/MerpCard";

const DataCard = ({ icon = "", title = "", type = "", data = [] }) => {
  const visaData = data?.map((item) => {
    return {
      id: item.id,
      statusVisa: item[1479],
      visaType: item[1472],
      purpose: item[1473],
      visaNumber: item[1474],
      issuingData: item[1475],
      expiredDate: item[1476],
      remainingDays: item[1477],
      ymd: item[1498],
      attachment: item[2282],
    };
  });
  return (
    <div className="p-3 shadow-sm h-fit border w-full rounded-sm lg:w-5">
      <span className="flex gap-2 items-center">
        <i className={icon}></i>
        <h5 className=" text-lg font-bold">{title}</h5>
      </span>
      {type === "visa" && <VisaCard visaData={visaData[0]} />}
      {type === "passport" && <PassportCard passportData={data[0]} />}
      {type === "kitas" && <KitasCard kitasData={data[0]} />}
      {type === "merp" && <MerpCard merpData={data[0]} />}
    </div>
  );
};

export default DataCard;
