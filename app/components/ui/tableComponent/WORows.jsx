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
    if (dialogStatus === true) {
      router.push("/your-orders");
    }
  };

  const handleWODialogRating = () => {
    setDialogStatusRating(!dialogStatusRating);
  };

  const router = useRouter();

  const handleClick = () => {
    handleWODialog();
  };
  const statuses = ["Processing", "Finished"];

  return (
    <>
      <tr key={item.id}>
        <td className="border px-4 py-2 text-center">
          {num + 1 + (currentPage - 1) * rowsPerPage}
        </td>
        {role === "Admin" ? (
          <td className="border px-4 py-2">{item.company}</td>
        ) : null}
        <td className="border px-4 py-2 text-center">{item.ref_num}</td>
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
        <td className="border px-4 py-2 text-center">
          {statuses.some((status) => item.status?.name.includes(status)) && (
            <motion.span
              whileHover={{ color: "#912534", textDecoration: "underline" }}
              className="cursor-pointer"
              onClick={handleClick}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: { ...router.query, id: item.id },
                }}
                passHref
                shallow
                replace
              >
                View
              </Link>
            </motion.span>
          )}

          {dialogStatus && rating != 0 && (
            <React.Fragment key={item.id}>
              <WORowsDialog
                visible={dialogStatus}
                onHide={handleWODialog}
                id={item.id}
              />
            </React.Fragment>
          )}
        </td>
      </tr>
    </>
  );
};

export default WORows;
