"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import useWOData from "@/app/hooks/useWOData";
import { ProgressSpinner } from "primereact/progressspinner";
import JsonDisplay from "../../JsonDisplay";
import useProcessingData from "@/app/hooks/useProcessingData";
import { motion } from "framer-motion";

const WORowsDialog = ({ visible = false, onHide = () => {}, id = 0 }) => {
  const { wo, isLoading } = useWOData();
  const { processing, download_attachments, downloadStatus } =
    useProcessingData();
  const woFiltered = wo.filter((item) => item.id === id);
  const th_array = ["No", "Document", "Action"];

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width: "50rem", height: "50rem" }}
      header="Documents List"
      className=" overflow-y-auto"
      key={id}
    >
      {isLoading ? (
        <>
          <div className="flex w-full">
            <ProgressSpinner />
          </div>
        </>
      ) : (
        <>
          <table className="min-w-full mt-3  rounded-lg text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                {th_array.map((th, index) => (
                  <th key={index} className="py-3 px-4 text-center border">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processing.map((item) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td className="border px-4 py-2 text-center">1</td>
                      <td className="border px-4 py-2 text-center">
                        {item["1649"]}
                      </td>
                      <td
                        className="border px-4 py-2 text-center"
                        onClick={() => {
                          if (downloadStatus.length === 1) {
                            download_attachments(item.id);
                          }
                        }}
                      >
                        {downloadStatus.map((x) => {
                          if (x.id === item.id) {
                            return (
                              <>
                                <motion.i
                                  key={item.id}
                                  whileHover={{ color: "#9c1c23" }}
                                  className={`pi pi-spinner pi-spin text-lg cursor-pointer font-bold`}
                                ></motion.i>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <motion.i
                                  key={item.id}
                                  whileHover={{ color: "#9c1c23" }}
                                  className={`pi pi-download text-lg cursor-pointer font-bold`}
                                ></motion.i>
                              </>
                            );
                          }
                        })}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <JsonDisplay data={woFiltered[0]} />
          <JsonDisplay data={processing} />
        </>
      )}
    </Dialog>
  );
};

export default WORowsDialog;
