import HomeList from "../components/home/HomeList";
import ProfileCard from "../components/home/ProfileCard";
import HeaderComponent from "../components/ui/HeaderComponent";
import { HomeCardContainerProvider } from "../Context/HomeCardContainerContext";
import ActiveProducts from "./components/ActiveProducts";
import HomeCardContainer from "./components/HomeCardContainer";

export default function Home() {
  const breadcrumbs_array = [
    { id: 0, text: "Portal Home /" },
    { id: 1, text: "Client Area ", nav: "/" },
  ];
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="My Dashboard"
        breadcrumbs="Portal Home / Client Area"
        breadcrumbs_array={breadcrumbs_array}
      />
      <div className="mt-6 block sm:flex  mx-5 sm:mx-0 gap-3">
        <div className=" lg:w-1/4 flex sm:block gap-3 lg:gap-0 mb-5 lg:mb-0">
          <ProfileCard />
          <div className="flex flex-col  mb-5 gap-3 mt-5">
            <HomeList />
          </div>
        </div>
        <div className="lg:w-3/4  flex flex-col gap-8 ">
          <HomeCardContainer />
          <div className="w-full mb-10  p-2 overflow-x-auto">
            <ActiveProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
