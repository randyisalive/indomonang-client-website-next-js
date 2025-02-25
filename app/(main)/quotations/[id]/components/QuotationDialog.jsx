"use client";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef, useState } from "react";
import useTermsOfService from "../../hooks/useTermsOfService";
import parse from "html-react-parser";
import { useQuotationContext } from "../../context/QuotationsContext";
import { useParams } from "next/navigation";
import WebButton from "@/app/components/ui/WebButton";
import SignatureCanvas from "react-signature-canvas";
import { Message } from "primereact/message";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { decryptMessage } from "@/app/function/decryptor";

const QuotationDialog = ({ visible = false, handleVisible = () => {} }) => {
  const { id } = useParams();
  const { terms } = useTermsOfService();
  const { quotations, upload_client_signature, approve_quotation } =
    useQuotationContext();
  const slice_id = id.slice(20, -20);

  const quotation_filtered = quotations?.filter((q) => q.id == slice_id);

  const filtered_terms = terms?.filter(
    (i) => i[662] === quotation_filtered?.[0]?.[439]
  );

  const signatureCanvasRef = useRef(null);

  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  const saveSignature = () => {
    const signatureImage = signatureCanvasRef.current.toDataURL("image/png");
    if (signatureImage) {
      const base64 = signatureImage.replace("data:image/png;base64,", "");
      if (
        base64 !==
        "iVBORw0KGgoAAAANSUhEUgAAAd0AAACWCAYAAACb1VJ1AAAAAXNSR0IArs4c6QAABhxJREFUeF7t1cEJAAAIAzG7/9Juca+4QCEIt3MECBAgQIBAIrBkxQgBAgQIECBwousJCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQKi6wcIECBAgEAkILoRtBkCBAgQICC6foAAAQIECEQCohtBmyFAgAABAqLrBwgQIECAQCQguhG0GQIECBAgILp+gAABAgQIRAKiG0GbIUCAAAECousHCBAgQIBAJCC6EbQZAgQIECAgun6AAAECBAhEAqIbQZshQIAAAQIPVQEAlyKjTskAAAAASUVORK5CYII="
      ) {
        setForm((prev) => ({ ...prev, signature: base64 }));
        if (form.client_name) {
          upload_client_signature(form.client_name, base64, real_id);
          approve_quotation(real_id);
        } else {
          setMsg("Name form cant be blank!");

          console.log("Empty Form");
        }
      } else {
        setMsg("Signature field can't be blank!");
      }
    }
  };

  // message warning
  const [msg, setMsg] = useState("");

  // checkbox
  const [checkbox, setCheckbox] = useState(false);

  // form
  const [form, setForm] = useState({ signature: "", client_name: "" });

  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setForm({ signature: "", client_name: "" });
    setCheckbox(false);
    setMsg("");
  }, [visible]);

  return (
    <Dialog
      visible={visible}
      header="Terms of Service"
      onHide={() => handleVisible("approveDialog", false)}
      style={{ minWidth: "50rem", maxWidth: "50rem", height: "30rem" }}
    >
      <div className="h-full overflow-y-auto flex flex-col gap-3">
        {terms.length > 0 &&
          parse(filtered_terms?.[0]?.[663] ? filtered_terms[0][663] : "")}
        <div className="flex gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
          <label htmlFor="">I agree to the Terms of Service Above</label>
        </div>
        {checkbox && (
          <div className="p-1 flex flex-col gap-3">
            <span className=" font-bold text-sm">
              To accept this Quotation, please sign here :
            </span>
            {msg && (
              <Message className="w-96 text-xs" text={msg} severity="error" />
            )}
            <div className="border w-96 ">
              <SignatureCanvas
                ref={signatureCanvasRef}
                penColor="black"
                canvasProps={{
                  className: "signature-canvas w-full",
                }}
              />
            </div>
            <div>
              <input
                type="text"
                name="client_name"
                className="border p-2 text-sm focus:outline-blue-500"
                id=""
                value={form.client_name}
                placeholder="Your Name"
                onChange={(e) => handleForm(e)}
              />
            </div>
            <div className="flex gap-3">
              <WebButton
                onClickFunction={clearSignature}
                title="Clear"
                bg_color="#FF0000"
              />
              <WebButton onClickFunction={saveSignature} title="Sign" />{" "}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default QuotationDialog;
