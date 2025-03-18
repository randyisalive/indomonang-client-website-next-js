import React, { Suspense } from "react";
import WOTable from "./components/WOTable";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import { WoDetailProvider } from "./context/WoDetailContext";

const WOList = () => {
  const wo_card_datas = [
    { id: 0, title: "AVG Ratings", num: 4.9, img: "" },
    { id: 1, title: "Drafting", num: 3, img: "" },
    { id: 2, title: "Open", num: 24, img: "" },
    { id: 3, title: "Checking", num: 16, img: "" },
    { id: 4, title: "Processing", num: 16, img: "" },
    { id: 5, title: "Finished", num: 16, img: "" },
    { id: 6, title: "Cancelled", num: 16, img: "" },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className="flex flex-col w-full mx-auto    "
        style={{ padding: "20px 64px", gap: "24px" }}
      >
        <HeaderComponent title="Orders" />
        <div className="flex flex-wrap  " style={{ gap: "24px!important" }}>
          {wo_card_datas.map((i) => {
            return (
              <div
                className="flex bg-white z-10 shadow overflow-clip justify-center items-center"
                style={{
                  padding: "32px 24px",
                  gap: "24px",
                  borderRadius: "12px",
                  border: "1px solid #EAEAEA",
                }}
              >
                <div
                  className="flex bg-white z-10 flex-col relative "
                  style={{ gap: "12px", width: "166.86px" }}
                >
                  <div
                    className=" absolute   left-1/3 flex justify-center items-center rounded-full"
                    style={{
                      width: "128px",
                      height: "128px",
                      backgroundColor: "#FFF8F8",
                    }}
                  >
                    <i
                      className="pi pi-star-fill"
                      style={{ fontSize: "128px", color: "#FFDCDE" }}
                    ></i>
                  </div>
                  <span
                    className=" font-bold z-20"
                    style={{ color: "#919CA7" }}
                  >
                    {i.title}
                  </span>
                  <span className=" font-bold" style={{ fontSize: "28px" }}>
                    {i.num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="w-full bg-white border"
          style={{ padding: "24px 64px" }}
        >
          asd
        </div>
        <div className="my-3">
          <WoDetailProvider>
            <WOTable />
          </WoDetailProvider>
        </div>
      </div>
    </Suspense>
  );
};

export default WOList;
