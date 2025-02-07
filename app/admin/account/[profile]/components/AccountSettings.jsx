"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { ATOB } from "@/app/function/decryptor";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import "./AccountSettings.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import CopyButton from "@/app/components/ui/CopyButton";
import Link from "next/link";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";
import EditButton from "@/app/components/ui/EditButton";
import api from "@/app/api/api";
import { InputMask } from "primereact/inputmask";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import WebButton from "@/app/components/ui/WebButton";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import ExportAccountButton from "./AccountSettings/ExportAccountButton";

const AccountSettings = () => {
  const { profile } = useParams();

  //api
  const { CustomerDatabasApi } = api();
  const {
    updateCustomerDataById,
    getEmailVerification,
    insertEmailVerification,
    verifiedEmail,
    deleteEmail,
  } = CustomerDatabasApi();

  const { customer, isLoading } = useAccountSettingContext();
  const { role } = useAccountDataContext();
  const [form, setForm] = useState({
    address: { val: customer[432], status: false },
    company_name: { val: customer[228], status: false },
    contact_person: { val: customer[466], status: false },
    job_title: { val: customer[471], status: false },
    email: { val: customer[229], status: false, dialog: false },
    phone: { val: `+${customer[233]}`, status: false },
  });
  const [otp, setOtp] = useState({ val: "", otp: "", id: "" });

  const formHandler = (e, bool) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: { val: e.target.value, status: bool },
    }));
  };

  const get_email_verification = async () => {
    try {
      const number = await getEmailVerification(customer.id);
      const selected_number = number.filter(
        (item) => item[2834] === form.email.val
      );
      console.log(number);
      if (selected_number) {
        setOtp({
          otp: selected_number[0][2833],
          val: "",
          id: selected_number[0]["id"],
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const customInput = ({ events, props }) => (
    <input {...events} {...props} type="text" className="custom-otp-input" />
  );

  const insert_email_verification = async () => {
    try {
      if (form.email?.val != "") {
        const email_data = await getEmailVerification(customer.id);
        if (Array.isArray(email_data)) {
          for (const email of email_data) {
            const delete_email = await deleteEmail(email["id"]);
            console.log(delete_email);
          }
        }

        const result = await insertEmailVerification(
          customer.id,
          form.email.val
        );
        if (result) {
          const email_data = await get_email_verification(customer.id);
          console.log(email_data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const update_customer = async (field_id, value) => {
    try {
      const update = await updateCustomerDataById(customer.id, field_id, value);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const decrypt = ATOB(profile);
  if (decrypt === "account") {
    if (isLoading === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" w-full h-full flex justify-center items-center"
        >
          <ProgressSpinner />
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" p-3 flex flex-col gap-3"
        key={customer.id}
      >
        <div className="w-full justify-between flex items-center">
          <span className=" text-3xl font-bold underline">Your Data</span>
        </div>
        <div className="overflow-x-auto w-full ">
          <table className="min-w-1/2 w-full mt-3  text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">ID</td>
                <td className="border px-4 py-2 ">{customer[461]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Company</td>
                <td className="border px-4 py-2 ">
                  {!form.company_name?.status ? (
                    <>
                      {customer[228]}

                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            company_name: { val: customer[228], status: true },
                          }));
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="company_name"
                          value={form.company_name?.val}
                          className="border w-full p-2"
                          onChange={(e) => formHandler(e, true)}
                        />
                        <EditButton
                          onClickFunction={() => {
                            setForm((prev) => ({
                              ...prev,
                              company_name: {
                                val: customer[228],
                                status: false,
                              },
                            }));
                          }}
                        />{" "}
                        <i
                          className="pi pi-save cursor-pointer hover:text-green-500"
                          onClick={() =>
                            update_customer("228", form.company_name?.val)
                          }
                        ></i>
                      </div>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Status</td>
                <td className="border px-4 py-2 ">
                  <StatusBadge
                    title={customer[230]}
                    font_color="white"
                    bg_color="green"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Address</td>
                {form.address?.status && (
                  <td className="border px-4 py-2">
                    <textarea
                      type="text"
                      name="address"
                      className="w-full border resize-none p-2"
                      value={form.address?.val}
                      onChange={(e) => formHandler(e, true)}
                    />
                    <div className="flex gap-2">
                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            address: { val: customer[432], status: false },
                          }));
                        }}
                      />
                      <i
                        className="pi pi-save cursor-pointer hover:text-green-500"
                        onClick={() =>
                          update_customer("432", form.address?.val)
                        }
                      ></i>
                    </div>
                  </td>
                )}
                {!form.address?.status && (
                  <td className="border px-4 py-2 ">
                    {customer[432]}
                    <EditButton
                      onClickFunction={() => {
                        setForm((prev) => ({
                          ...prev,
                          address: { val: customer[432], status: true },
                        }));
                      }}
                    />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto w-full ">
          <table className="min-w-1/2 w-full mt-3 text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">Contact Person</td>
                <td className="border px-4 py-2 ">
                  {!form.contact_person?.status ? (
                    <div className="flex gap-2 items-center">
                      {customer[466]}
                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            contact_person: {
                              val: customer[466],
                              status: true,
                            },
                          }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name="contact_person"
                        value={form.contact_person?.val}
                        onChange={(e) => formHandler(e, true)}
                        className="border p-2"
                      />
                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            contact_person: {
                              val: customer[466],
                              status: false,
                            },
                          }));
                        }}
                      />
                      <i
                        className="pi pi-save cursor-pointer hover:text-green-500"
                        onClick={() =>
                          update_customer("466", form.contact_person?.val)
                        }
                      ></i>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Job Title</td>
                <td className="border px-4 py-2 ">
                  {!form.job_title?.status ? (
                    <div className="flex gap-2 items-center">
                      {customer[471]}
                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            job_title: {
                              val: customer[471],
                              status: true,
                            },
                          }));
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name="job_title"
                        value={form.job_title?.val}
                        onChange={(e) => formHandler(e, true)}
                        className="border p-2"
                      />
                      <EditButton
                        onClickFunction={() => {
                          setForm((prev) => ({
                            ...prev,
                            job_title: {
                              val: customer[471],
                              status: false,
                            },
                          }));
                        }}
                      />
                      <i
                        className="pi pi-save cursor-pointer hover:text-green-500"
                        onClick={() =>
                          update_customer("471", form.job_title?.val)
                        }
                      ></i>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Phone</td>
                <td className="border px-4 py-2 ">
                  <div>
                    {!form.phone?.status ? (
                      <>
                        {customer[233]}
                        <EditButton
                          onClickFunction={() => {
                            setForm((prev) => ({
                              ...prev,
                              phone: {
                                val: customer[233],
                                status: true,
                              },
                            }));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <InputMask
                          value={`${form.phone?.val}`}
                          onChange={(e) => formHandler(e, true)}
                          mask="+99-999-9999-9999"
                          name="phone"
                          placeholder="+99-999-9999-9999"
                          className="border p-2"
                        />
                        <EditButton
                          onClickFunction={() => {
                            setForm((prev) => ({
                              ...prev,
                              phone: {
                                val: customer[233],
                                status: false,
                              },
                            }));
                          }}
                        />{" "}
                        <i
                          className="pi pi-save cursor-pointer hover:text-green-500"
                          onClick={() =>
                            update_customer("233", form.phone?.val)
                          }
                        ></i>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Email</td>
                <td className="border px-4 py-2 ">
                  <div className="flex gap-2 items-center">
                    {!form.email?.status ? (
                      <>
                        {customer[229]}
                        <EditButton
                          onClickFunction={() => {
                            setForm((prev) => ({
                              ...prev,
                              email: {
                                val: customer[229],
                                status: true,
                              },
                            }));
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="email"
                          name="email"
                          className="border p-2"
                          value={form.email?.val}
                          onChange={(e) => formHandler(e, true)}
                        />
                        <EditButton
                          onClickFunction={() => {
                            setForm((prev) => ({
                              ...prev,
                              email: {
                                val: customer[229],
                                status: false,
                              },
                            }));
                          }}
                        />
                        <i
                          className="pi pi-save cursor-pointer hover:text-green-500"
                          onClick={
                            () => {
                              setForm((prev) => ({
                                ...prev,
                                email: {
                                  val: form.email?.val,
                                  status: true,
                                  dialog: true,
                                },
                              }));
                              insert_email_verification();
                              get_email_verification();
                            }
                            // update_customer("233", form.phone?.val)
                          }
                        ></i>

                        <Dialog
                          visible={form.email?.dialog}
                          onHide={() =>
                            setForm((prev) => ({
                              ...prev,
                              email: {
                                val: form.email?.val,
                                status: true,
                                dialog: false,
                              },
                            }))
                          }
                          header="Email Verification"
                          className="w-1/3"
                        >
                          <div className="p-3 flex flex-col gap-5 items-center">
                            <style scoped>
                              {`
                .custom-otp-input {
                    width: 40px;
                    font-size: 36px;
                    border: 0 none;
                    appearance: none;
                    text-align: center;
                    transition: all 0.2s;
                    background: transparent;
                    border-bottom: 2px solid var(--surface-500);
                }

                .custom-otp-input:focus {
                    outline: 0 none;
                    border-bottom-color: var(--primary-color);
                }
            `}
                            </style>
                            <InputOtp
                              value={otp.val}
                              onChange={(e) =>
                                setOtp((prev) => ({ ...prev, val: e.value }))
                              }
                              inputTemplate={customInput}
                              length={5}
                            />
                            <WebButton
                              onClickFunction={() => {
                                if (otp.otp === otp.val) {
                                  update_customer("229", form.email?.val);
                                  setForm((prev) => ({
                                    ...prev,
                                    email: {
                                      val: form.email?.val,
                                      status: true,
                                      dialog: false,
                                    },
                                  }));
                                  verifiedEmail(otp.id);
                                }
                              }}
                            />
                          </div>
                        </Dialog>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto w-full ">
          <table className="min-w-1/2 w-full mt-3 text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Document Summary
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">
                  <div className="flex items-center gap-1 w-fit  ">
                    <span>Total Expatriate </span>
                  </div>
                </td>
                <td className="border px-4 py-2 ">{customer[1506]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">
                  <div className="flex items-center gap-1 w-fit ">
                    <span>Total Dependent </span>
                  </div>
                </td>
                <td className="border px-4 py-2 ">{customer[1507]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">
                  <div className="flex items-center gap-1 w-fit  ">
                    <span>Total Visitors </span>
                  </div>
                </td>
                <td className="border px-4 py-2 ">{customer[1508]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Grand Total </td>
                <td className="border px-4 py-2 ">{customer[1509]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }
};

export default AccountSettings;
