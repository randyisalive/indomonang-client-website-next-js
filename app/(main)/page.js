import HomeCard from "../components/home/HomeCard";
import HomeList from "../components/home/HomeList";
import ProfileCard from "../components/home/ProfileCard";
import DataTable from "../components/ui/DataTable";
import HeaderComponent from "../components/ui/HeaderComponent";

export default function Home() {
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
      <HeaderComponent
        title="My Dashboard"
        breadcrumbs="Portal Home / Client Area"
      />
      <div className="mt-6 block sm:flex  mx-5 sm:mx-0 gap-3">
        <div className="w-fit sm:w-1/4">
          <ProfileCard />
          <div className="flex flex-col  mb-5 gap-3 mt-5">
            <HomeList />
          </div>
        </div>
        <div className="w-3/4  flex flex-col gap-8 ">
          <div className="w-full  flex gap-3 flex-wrap sm:justify-evenly ">
            {card_data.map((item) => {
              return <HomeCard key={`${item.id}`} item={item} />;
            })}
          </div>
          <div className="w-full mb-10  p-2 overflow-x-auto">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
