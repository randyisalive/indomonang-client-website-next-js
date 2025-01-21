import React from "react";
import { useExpatriateListContext } from "../../account/[profile]/[id]/context/ExpatriateListContext";
import { useDependentListContext } from "../../account/[profile]/[id]/context/DependentListContext";
import DocumentTable from "./DocumentTable";

const DependentExport = () => {
  const { expatriates } = useExpatriateListContext();
  const { dependent } = useDependentListContext();
  const data = expatriates.map((expat) => {
    const depend_data = dependent.filter(
      (depent) => expat[1082] === depent[1317]
    );
    return {
      expat: expat[1082],
      dependent: depend_data,
    };
  });

  return (
    <table className="w-full" style={{ fontSize: "5px" }}>
      <thead className="fixed-header">
        <tr>
          <th
            className="p-2 text-white text-sm"
            style={{ backgroundColor: "#9C1C23" }}
            colSpan={11}
          >
            Dependent
          </th>
        </tr>
        <tr>
          <th className="p-3 font-bold text-center bg-gray-500 border">Name</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            Relationship
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            Passport
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">VISA</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            KITAS
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">MERP</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">STM</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">SKTT</th>

          <th className="p-3 font-bold text-center bg-gray-500 border">SKJ</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">EPO</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr>
                <td
                  className="p-1 text-start border font-bold bg-gray-100"
                  style={{ fontSize: "10px" }}
                  colSpan={10}
                >
                  {item.expat}
                </td>
              </tr>
              {item.dependent?.map((i, depIndex) => {
                return (
                  <tr key={depIndex}>
                    <td className="p-1 text-start border">{i[1100]}</td>
                    <td className="p-1 text-start border">{i[1096]}</td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1427]}
                        noDoc={i[1318]}
                        expData={i[1324]}
                        remainingDays={i[1322]}
                      />
                    </td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1479]}
                        noDoc={i[1474]}
                        expData={i[1476]}
                        remainingDays={i[1477]}
                      />
                    </td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1432]}
                        noDoc={i[1321]}
                        expData={i[1327]}
                        remainingDays={i[1328]}
                      />
                    </td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1428]}
                        noDoc={i[1339]}
                        expData={i[1341]}
                        remainingDays={i[1342]}
                      />
                    </td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1430]}
                        noDoc={i[1344]}
                        expData={i[1346]}
                        remainingDays={i[1347]}
                      />
                    </td>
                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1431]}
                        noDoc={i[1349]}
                        expData={i[1351]}
                        remainingDays={i[1357]}
                      />
                    </td>

                    <td className="p-1 text-start border">
                      <DocumentTable
                        status={i[1429]}
                        noDoc={i[1360]}
                        expData={i[1362]}
                        remainingDays={i[1363]}
                      />
                    </td>

                    <td className="p-1 text-start border">
                      {i[1365] && i[1350] ? (
                        <table className="w-full">
                          <tr>
                            <td className=" font-bold text-start">No. EPO: </td>
                            <td className="text-end">{i[1365]}</td>
                          </tr>
                          <tr>
                            <td className=" font-bold text-start">
                              Issuing Date:
                            </td>
                            <td className="text-end">{i[1350]}</td>
                          </tr>
                        </table>
                      ) : (
                        <p className=" text-center text-red-500 font-bold">
                          NO PROCESS
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default DependentExport;
