"use client";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";
import WORowsDialog from "./WORows/WORowsDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Rating } from "primereact/rating";
import WORowsRatingDialog from "./WORows/WORowsRatingDialog/WORowsRatingDialog";

const WORows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
  handleRating = () => {},
}) => {
  const [dialogStatus, setDialogStatus] = useState(item.dialog_status);
  const [dialogStatusRating, setDialogStatusRating] = useState(
    item.dialog_status_rating
  );
  const [rating, setRating] = useState(item.rating);

  const handleWODialog = () => {
    setDialogStatus(!dialogStatus);
  };

  const handleWODialogRating = () => {
    setDialogStatusRating(!dialogStatusRating);
  };

  const router = useRouter();

  const handleClick = (wo_id) => {
    handleWODialog();
    router.push(`?id=${wo_id}`);
  };

  return (
    <>
      <tr key={item.id}>
        <td className="border px-4 py-2 text-center">
          {num + 1 + (currentPage - 1) * rowsPerPage}
        </td>
        {role === "Admin" ? (
          <td className="border px-4 py-2">{item.company}</td>
        ) : null}
        <td className="border px-4 py-2 text-center">
          <span
            onClick={() => handleClick(item.id)}
            className=" text-blue-500 hover:underline cursor-pointer"
          >
            {item.ref_num}
          </span>
        </td>
        <td className="border px-4 py-2 text-center">
          <StatusBadge
            title={item.status?.name}
            bg_color={item.status?.bg_color}
            font_color="white"
          />
        </td>
        <td className="border px-4 py-2 text-start">{item.service}</td>
        <td className="border px-4 py-2 text-center">{item.estimated_done}</td>
        <td className="border px-4 py-2 text-center">
          {rating != 0 ? (
            <Rating
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
            id={item.id}
            handleRating={handleRating}
          />
        </td>
      </tr>
      {dialogStatus && (
        <WORowsDialog
          visible={dialogStatus}
          onHide={handleWODialog}
          id={item.id}
        />
      )}
    </>
  );
};

export default WORows;
