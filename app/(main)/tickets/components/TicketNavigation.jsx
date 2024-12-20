"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const TicketNavigation = () => {
  const [page, setPage] = useState(0);
  const nav_data = [
    { id: 0, title: "New Tickets", nav: "new" },
    { id: 1, title: "Tickets List", nav: "list" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const real_path = pathname.split("/")[2];
  console.log(real_path);

  useEffect(() => {
    if (real_path === "new") {
      setPage(0);
    } else if (real_path === "list") {
      setPage(1);
    }
  }, [real_path]);

  return (
    <div className="flex mx-5 lg:mx-0 gap-3 text-sm my-4 border-b">
      {nav_data.map((item) => (
        <span
          key={item.id}
          onClick={() => router.push(`${item.nav}`)}
          className={`${
            item.id === page ? "border-b-2 border-b-blue-600" : ""
          } font-bold cursor-pointer pb-1`}
        >
          {item.title}
        </span>
      ))}
    </div>
  );
};

export default TicketNavigation;
