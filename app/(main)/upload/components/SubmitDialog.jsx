import WebButton from "@/app/components/ui/WebButton";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const SubmitDialog = () => {
  const [visible, setVisible] = useState(false);
  const handleDialog = (status) => {
    setVisible(status);
  };
  return (
    <div className="flex w-full mb-10 justify-end">
      <WebButton onClickFunction={() => handleDialog(true)} />
      <Dialog visible={visible} onHide={() => handleDialog(false)}></Dialog>
    </div>
  );
};

export default SubmitDialog;
