import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, motion } from "framer-motion";

const SignupDialog = ({
  visible = false,
  handleVisible = () => {},
  getVerification = () => {},
  dialogLoading = 0,
  handleDialogForm = () => {},
}) => {
  const [token, setToken] = useState("");
  const customInput = ({ events, props }) => (
    <input {...events} {...props} type="text" className="custom-otp-input" />
  );

  return (
    <>
      {visible ? (
        <Dialog
          style={{ minWidth: "30rem", maxHeight: "30rem" }}
          header="Email Verification"
          className=" h-full"
          visible={visible}
          closable={false}
        >
          <div className=" h-full gap-6 items-center  flex flex-col justify-center">
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
            <div className=" relative flex items-center justify-center ">
              <AnimatePresence>
                <div
                  className={
                    dialogLoading === 1 ? " blur-sm shadow-md relative r" : ""
                  }
                >
                  <InputOtp
                    value={token}
                    onChange={(e) => {
                      handleDialogForm(e);
                    }}
                    inputTemplate={customInput}
                    length={5}
                  />
                </div>
                <AnimatePresence>
                  {dialogLoading === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className=" absolute left-full ms-5"
                    >
                      <i className="pi pi-spin pi-spinner text-3xl"></i>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {dialogLoading === 4 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className=" absolute left-full ms-5"
                    >
                      <i className="pi pi-check text-green-500 text-3xl"></i>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatePresence>

              <AnimatePresence>
                {dialogLoading === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=" w-full absolute h-full z-50 flex justify-center items-center"
                  >
                    <i className="pi pi-spin pi-spinner text-4xl  "></i>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {dialogLoading === 4 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <WebButton
                    title="Submit Code"
                    onClickFunction={getVerification}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

export default SignupDialog;
