import React from "react";
import { DecryptionProvider } from "../Context/DecryptionContext";

const DownloadDocumentLayout = ({ children }) => {
  return (
    <div>
      <DecryptionProvider>{children}</DecryptionProvider>
    </div>
  );
};

export default DownloadDocumentLayout;
