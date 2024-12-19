"use client";
import React, { useState } from "react";

const useAccountSettingsData = () => {
  const [customer, setCustomer] = useState([]);

  return { customer };
};

export default useAccountSettingsData;
