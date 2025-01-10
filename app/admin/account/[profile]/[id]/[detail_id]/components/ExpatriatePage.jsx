import { useParams } from "next/navigation";
import React from "react";
import DataCard from "./ui/DataCard";

const ExpatriatePage = ({ expatriate = [], detail_id = 0 }) => {
  const selectedExpat = expatriate.filter((item) => item.id === detail_id);
  return (
    <div className="flex flex-col gap-3 md:flex md:flex-row flex-wrap">
      <DataCard
        icon="pi pi-send"
        title="PASSPORT"
        type="passport"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="VISA"
        type="visa"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="KITAS"
        type="kitas"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="MERP"
        type="merp"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="RPTKA"
        type="rptka"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="NOTIFICATION"
        type="notification"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="STM"
        type="stm"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="SKTT"
        type="sktt"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="LK"
        type="lk"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="SKJ"
        type="skj"
        data={selectedExpat}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="EPO/ERP"
        type="epo"
        data={selectedExpat}
      />
    </div>
  );
};

export default ExpatriatePage;
