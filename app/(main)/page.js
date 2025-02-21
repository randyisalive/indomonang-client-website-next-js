import Footer from "../components/Footer";
import NotificationBox from "../components/home/NotificationBox";
import ProfileCard from "../components/home/ProfileCard";
import HeaderComponent from "../components/ui/HeaderComponent";
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
      <div className="mt-6 block sm:block  mx-5 sm:mx-0 gap-3 ">
        <div className="w-full lg:flex gap-3">
          <div className="lg:w-1/3 ">
            <ProfileCard />
          </div>
          <div className="lg:w-2/3 mt-3 lg:mt-0">
            <HomeCardContainer />
          </div>
        </div>
        <div className="w-full lg:flex mt-5 gap-3">
          <div className="lg:w-1/3">
            <NotificationBox />
          </div>
          <div className="lg:w-2/3 flex flex-col gap-5 mt-5 lg:mt-0">
            <ActiveProducts text="Recent Orders" type="order" />
            <ActiveProducts text="Recent News" type="news" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
