import React from "react";

const NewTickets = () => {
  return (
    <div className="flex gap-3">
      <SearchInput name="ref_num" />
      <WebButton title="Search" />
    </div>
  );
};

export default NewTickets;
