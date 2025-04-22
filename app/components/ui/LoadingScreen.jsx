import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <ProgressSpinner />
    </div>
  );
};

export default LoadingScreen;
