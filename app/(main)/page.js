import Footer from "../components/Footer";
import NotificationBox from "../components/home/NotificationBox";
import ActiveProducts from "./components/ActiveProducts";
import HomeCardContainer from "./components/HomeCardContainer";

export default function Home() {
  const breadcrumbs_array = [
    { id: 0, text: "Portal Home /" },
    { id: 1, text: "Client Area ", nav: "/" },
  ];
  return (
    <div className="flex flex-col w-full mx-auto   sm:px-6 lg:px-0 ">
      <div
        className="w-full flex"
        style={{ padding: " 0px 64px", gap: "24px", marginTop: "30px" }}
      >
        <HomeCardContainer />
      </div>
      <div className=" block sm:block   mt-5 ">
        {/*  <div className="w-full lg:flex gap-3">
          <div className="lg:w-1/3 ">
            <ProfileCard />
          </div>
        </div> */}
        <div
          className="w-full lg:flex "
          style={{ padding: "0px 64px", gap: "24px" }}
        >
          <div className="overflow-y-auto w-1/3">
            <NotificationBox />
          </div>
          <div className="lg:w-2/3 flex flex-col gap-5  w-2/3">
            <ActiveProducts
              text="Recent Orders"
              type="order"
              icon="/duo-icons_box.png"
            />
            <ActiveProducts
              text="Recent News"
              type="news"
              icon="/ph_newspaper-duotone.png"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
