"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

const TicketNavigation = () => {
  const [page, setPage] = useState(0);
  const nav_data = [
    { id: 0, title: "New Tickets", nav: "new" },
    { id: 1, title: "Tickets List", nav: "list" },
  ];

  const pathname = usePathname();
  const real_path = pathname.split("/")[2];

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
        <Link
          key={item.id}
          href={`/tickets/${item.nav}`}
          className={`${
            item.id === page ? "border-b-2 border-b-blue-600" : ""
          } font-bold cursor-pointer pb-1`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const TicketNavigationWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketNavigation />
    </Suspense>
  );
};

export default TicketNavigationWithSuspense;
