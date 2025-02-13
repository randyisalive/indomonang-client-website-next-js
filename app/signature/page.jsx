// SignaturePad.js
"use client";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import WebButton from "../components/ui/WebButton";

const SignaturePad = () => {
  const signatureCanvasRef = useRef(null);

  const clearSignature = () => {
    signatureCanvasRef.current.clear();
  };

  const saveSignature = () => {
    const signatureImage = signatureCanvasRef.current.toDataURL("image/png");
    console.log("Signature Image:", signatureImage);
  };

  return (
    <div>
      <div className="border w-96">
        <SignatureCanvas
          ref={signatureCanvasRef}
          penColor="purple"
          canvasProps={{
            className: "signature-canvas w-full",
          }}
        />
      </div>

      <WebButton onClickFunction={clearSignature} title="Clear" />
      <WebButton onClickFunction={saveSignature} title="Save" />
    </div>
  );
};

export default SignaturePad;
