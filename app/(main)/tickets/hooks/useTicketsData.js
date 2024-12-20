"use client";
import React, { useState } from "react";

const useTicketsData = () => {
  const [tickets, setTickets] = useState([]);

  return { tickets };
};

export default useTicketsData;
