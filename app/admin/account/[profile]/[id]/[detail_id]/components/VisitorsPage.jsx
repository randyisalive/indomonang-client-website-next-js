import React from "react";
import DataCard from "./ui/DataCard";

const VisitorsPage = ({ visitors = [], detail_id = 0 }) => {
  const visitor_data = visitors.filter((item) => item.id === detail_id);
  console.log(visitor_data);
  return (
    <div className="flex flex-col gap-3 md:flex md:flex-row flex-wrap">
      <DataCard
        icon="pi pi-send"
        title="PASSPORT"
        type="passport"
        data={visitor_data}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="VISA"
        type="visa"
        data={visitor_data}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="ITK"
        type="itk"
        data={visitor_data}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="SKJ"
        type="skj"
        data={visitor_data}
      />
    </div>
  );
};

export default VisitorsPage;
