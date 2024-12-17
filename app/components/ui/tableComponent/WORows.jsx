"use client";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";
import WORowsDialog from "./WORows/WORowsDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WORows = ({ item = {}, num = 0, currentPage = 0, rowsPerPage = 10 }) => {
  const [dialogStatus, setDialogStatus] = useState(item.dialog_status);

  const handleWODialog = () => {
    setDialogStatus(!dialogStatus);
  };

  const router = useRouter();

  const handleClick = () => {
    handleWODialog();
  };

  return (
    <>
      <tr key={item.id}>
        <td className="border px-4 py-2 text-center">
          {num + 1 + (currentPage - 1) * rowsPerPage}
        </td>
        <td className="border px-4 py-2 text-center">{item.ref_num}</td>
        <td className="border px-4 py-2 text-center">
          <StatusBadge
            title={item.status.name}
            bg_color={item.status.bg_color}
            font_color="white"
          />
        </td>
        <td className="border px-4 py-2 text-start">{item.service}</td>
        <td className="border px-4 py-2 text-center">{item.estimated_done}</td>
        <td className="border px-4 py-2 text-center">
          <motion.span
            whileHover={{
              color: "#912534",
              textDecoration: "underline",
            }}
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
              View Details
            </Link>
          </motion.span>
          {dialogStatus && (
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
