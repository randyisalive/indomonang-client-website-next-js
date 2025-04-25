"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WORowsDialog from "./WORows/WORowsDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Rating } from "primereact/rating";
import WORowsRatingDialog from "./WORows/WORowsRatingDialog/WORowsRatingDialog";
import Status from "@/app/redesign/components/Status";
import PriorityBadge from "@/app/redesign/components/PriorityBadge";

const WORows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
  handleRating = () => {},
}) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogStatusRating, setDialogStatusRating] = useState(
    item.dialog_status_rating
  );
  const [rating, setRating] = useState(item.rating);
  // params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      setDialogStatus(true);
    } else {
      setDialogStatus(false);
    }
  }, [id]);

  const handleWODialog = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    setDialogStatus((prev) => !prev);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleWODialogRating = () => {
    setDialogStatusRating(!dialogStatusRating);
  };

  const router = useRouter();

  const handleClick = (wo_id) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", wo_id);
    setDialogStatus(true);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <tr
        key={item.id}
        className="odd:bg-[#F5F5F5] pt-[12px] pb-[12px] even:bg-white"
      >
        <td className=" pr-[12px] pl-[12px] text-left w-[80px] h-[64px]">
          {num + 1 + (currentPage - 1) * rowsPerPage}
        </td>
        <td className=" pr-[12px] pl-[12px]  text-left">{item.date_added}</td>
        <td className="  text-center pr-[12px] pl-[12px] w-[100px]">
          <span
            onClick={() => handleClick(item.id)}
            className=" text-blue-500 hover:underline cursor-pointer"
          >
            {item.ref_num}
          </span>
        </td>

        <td className="  text-left  pr-[12px] pl-[12px] w-[300px] text-[14px]">
          {item.service}
        </td>
        <td className=" text-center pr-[12px] pl-[12px]">
          <PriorityBadge
            title={item.priority?.text}
            bg_color={item.priority?.bg_color}
            font_color={item.priority?.font_color}
          />
        </td>

        <td className="  text-left pr-[12px] pl-[12px]">{item.applicant}</td>
        <td className=" text-left pr-[12px] pl-[12px]">{item.city}</td>
        <td className="pr-[12px] pl-[12px] text-left">
          <Status
            title={item.status?.text}
            bg_color={item.status?.bg_color}
            font_color={item.status?.font_color}
          />
        </td>
        {/*  <td className="  text-center pr-[12px] pl-[12px]">
          {rating != 0 ? (
            <Rating
              className=" flex justify-center items-center"
              cancel={false}
              value={rating}
              readOnly
              pt={{
                onIcon: {
                  className: "",
                  style: { color: "#9A1C20" },
                },
              }}
            />
          ) : (
            <>
              {item.status?.name === "Finished" ? (
                <motion.p
                  onClick={() => handleWODialogRating()}
                  whileHover={{
                    color: "#912534",
                    textDecoration: "underline",
                  }}
                  className=" cursor-pointer"
                >
                  Rate Order
                </motion.p>
              ) : (
                <motion.p className=" text-red-500 cursor-not-allowed select-none">
                  Wait Until Finish
                </motion.p>
              )}
            </>
          )}
          <WORowsRatingDialog
            dialogStatusRating={dialogStatusRating}
            setDialogStatusRating={setDialogStatusRating}
            rating={item.rating}
            //id={item.id}
            id={searchParams.get("id")}
            handleRating={handleRating}
          />
        </td> */}
      </tr>
      {id === item.id && (
        <WORowsDialog
          key={`dialog-${item.id}`}
          visible={dialogStatus}
          onHide={handleWODialog}
        />
      )}
    </>
  );
};

export default WORows;
