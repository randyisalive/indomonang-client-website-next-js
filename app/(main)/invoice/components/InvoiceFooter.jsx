import React from "react";

const InvoiceFooter = ({ all_data = [] }) => {
  const subTotal = all_data.reduce((acc, item) => {
    const cleanedStr = item[1932].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const ppn_rp = all_data.reduce((acc, item) => {
    const cleanedStr = item[2049].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const grand_total = all_data.reduce((acc, item) => {
    const cleanedStr = item[2051].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  return (
    <tr>
      <td colSpan={5}></td>
      <td colSpan={0} className="text-start text-xs font-bold border px-4 py-2">
        <span className="underline">TOTALS:</span>
        <table className="table w-full">
          <tbody>
            {/* <tr>
              <td>ST </td>
              <td>: </td>
              <td className=" font-normal text-red-600">
                Rp. {subTotal.toLocaleString("id-ID")} ,-
              </td>
            </tr>
            <tr>
              <td>PPN </td>
              <td>: </td>
              <td className=" font-normal text-blue-600">
                Rp. {ppn_rp.toLocaleString("id-ID")} ,-
              </td>
            </tr> */}
            <tr>
              <td className=" text-secondaryBlue font-bold ">
                Rp. {grand_total.toLocaleString("id-ID")} ,-
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default InvoiceFooter;
