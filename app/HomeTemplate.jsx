import React from "react";
import HomeCard from "./components/home/HomeCard";
import WebButton from "./components/ui/WebButton";
import DataTable from "./components/ui/DataTable";
import ProfileCard from "./components/home/ProfileCard";
import HomeList from "./components/home/HomeList";

const HomeTemplate = () => {
  const card_data = [
    { id: 0, icon: "pi pi-times", count: "2", sub: "Layanan", link: "" },
    { id: 1, icon: "pi pi-times", count: "1", sub: "Domain", link: "" },
    {
      id: 2,
      icon: "pi pi-times",
      count: "0",
      sub: "Unpaid Invoices",
      link: "",
    },
    { id: 3, icon: "pi pi-times", count: "0", sub: "", link: "" },
  ];
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <header className="text-5xl font-bold">My Dashboard</header>
      <div className="mt-6 flex gap-3">
        <div className="w-1/4">
          <ProfileCard />
          <div className="flex flex-col gap-3 mt-5"></div>
          <HomeList />
        </div>
        <div className="w-3/4 flex flex-col gap-8 min-h-96">
          <div className="w-full  flex gap-3 flex-wrap justify-evenly ">
            {card_data.map((item) => {
              return <HomeCard key={`${item.id}`} item={item} />;
            })}
          </div>
          <div className="w-full  p-2 overflow-x-auto">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
