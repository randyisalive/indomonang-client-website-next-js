import React from "react";
import VisaCard from "./DataCard/deplendent/VisaCard";
import PassportCard from "./DataCard/deplendent/PassportCard";
import KitasCard from "./DataCard/deplendent/KitasCard";
import MerpCard from "./DataCard/deplendent/MerpCard";
import { useParams } from "next/navigation";
import RptkaCard from "./DataCard/deplendent/RptkaCard";
import NotificationCard from "./DataCard/deplendent/NotificationCard";
import StmCard from "./DataCard/deplendent/StmCard";
import SkttCard from "./DataCard/deplendent/SkttCard";
import SkjCard from "./DataCard/deplendent/SkjCard";
import LkCard from "./DataCard/deplendent/LkCard";
import EpoCard from "./DataCard/deplendent/EpoCard";
import ItkCard from "./DataCard/visitors/ItkCard";

const DataCard = ({ icon = "", title = "", type = "", data = [] }) => {
  const { id } = useParams();
  const visaData = data?.map((item) => {
    if (id === "Dependent") {
      return {
        id: item.id,
        statusVisa: item[1479],
        visaType: item[1472],
        purpose: item[1473],
        visaNumber: item[1474],
        issuingData: item[1475],
        expiredDate: item[1476],
        remainingDays: item[1477],
        ymd: item[1498],
        attachment: item[2282],
      };
    } else if (id === "Expatriate") {
      return {
        id: item.id,
        statusVisa: item[1422],
        visaType: item[1406],
        purpose: item[1407],
        visaNumber: item[1408],
        issuingData: item[1409],
        expiredDate: item[1410],
        remainingDays: item[1411],
        ymd: item[1491],
        attachment: item[2272],
      };
    } else if (id === "Visitors") {
      return {
        id: item.id,
        statusVisa: item[1471],
        visaType: item[1462],
        purpose: item[1463],
        visaNumber: item[1464],
        issuingData: item[1465],
        expiredDate: item[1466],
        remainingDays: item[1467],
        ymd: item[1485],
        attachment: item[2289],
      };
    }
  });
  const passportData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        statusPass: item[1413],
        passportNum: item[1154],
        issuingDate: item[1160],
        expiredDate: item[1161],
        remainingDays: item[1159],
        ymd: item[1488],
        attachment: item[1262],
      };
    } else if (id === "Dependent") {
      return {
        statusPass: item[1427],
        passportNum: item[1318],
        issuingDate: item[1323],
        expiredDate: item[1324],
        remainingDays: item[1322],
        ymd: item[1332],
        attachment: item[2281],
      };
    } else if (id === "Visitors") {
      return {
        statusPass: item[1484],
        passportNum: item[1480],
        issuingDate: item[1482],
        expiredDate: item[1483],
        remainingDays: item[1481],
        ymd: item[1468],
        attachment: item[2288],
      };
    }
  });
  const kitasData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1421],
        num: item[1157],
        issuingPlace: item[1367],
        issuingDate: item[1255],
        expiredDate: item[1257],
        remainingDays: item[1258],
        ymd: item[1492],
        attachment: item[2273],
      };
    } else if (id === "Dependent") {
      return {
        status: item[1432],
        num: item[1321],
        issuingPlace: item[1382],
        issuingDate: item[1325],
        expiredDate: item[1327],
        remainingDays: item[1328],
        ymd: item[1334],
        attachment: item[2283],
      };
    }
  });
  const merpData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1420],
        num: item[1278],
        issuingPlace: item[1369],
        issuingDate: item[1279],
        expiredDate: item[1280],
        remainingDays: item[1281],
        ymd: item[1493],
        attachment: item[2274],
      };
    } else if (id === "Dependent") {
      return {
        status: item[1428],
        num: item[1339],
        issuingPlace: item[1384],
        issuingDate: item[1340],
        expiredDate: item[1341],
        remainingDays: item[1342],
        ymd: item[1343],
        attachment: item[2284],
      };
    }
  });
  const rptkaData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1424],
        num: item[1155],
        issuingDate: item[1256],
        expiredDate: item[1259],
        remainingDays: item[1260],
        ymd: item[1489],
        attachment: item[2269],
      };
    }
  });
  const notificationData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1423],
        num: item[1156],
        issuingDate: item[1274],
        expiredDate: item[1275],
        remainingDays: item[1276],
        ymd: item[1490],
        attachment: item[2270],
      };
    }
  });
  const stmData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1419],
        num: item[1283],
        issuingPlace: item[1370],
        issuingDate: item[1284],
        expiredDate: item[1285],
        remainingDays: item[1286],
        ymd: item[1494],
        attachment: item[2275],
      };
    } else if (id === "Dependent") {
      return {
        status: item[1430],
        num: item[1344],
        issuingPlace: item[1385],
        issuingDate: item[1345],
        expiredDate: item[1346],
        remainingDays: item[1347],
        ymd: item[1348],
        attachment: item[2285],
      };
    }
  });
  const skttData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1418],
        num: item[1288],
        issuingPlace: item[1371],
        issuingDate: item[1294],
        expiredDate: item[1291],
        remainingDays: item[1303],
        ymd: item[1495],
        attachment: item[2276],
      };
    } else if (id === "Dependent") {
      return {
        status: item[1431],
        num: item[1349],
        issuingPlace: item[1386],
        issuingDate: item[1352],
        expiredDate: item[1351],
        remainingDays: item[1357],
        ymd: item[1353],
        attachment: item[2286],
      };
    }
  });
  const lkData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1416],
        num: item[1298],
        issuingPlace: item[1372],
        issuingDate: item[1299],
        expiredDate: item[1301],
        remainingDays: item[1308],
        ymd: item[1496],
        attachment: item[2277],
      };
    }
  });
  const skjData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        status: item[1415],
        num: item[1310],
        issuingDate: item[1311],
        expiredDate: item[1312],
        remainingDays: item[1313],
        ymd: item[1497],
        attachment: item[2279],
      };
    } else if (id === "Dependent") {
      return {
        status: item[1429],
        num: item[1360],
        issuingDate: item[1361],
        expiredDate: item[1362],
        remainingDays: item[1363],
        ymd: item[1364],
        attachment: item[2287],
      };
    } else if (id === "Visitors") {
      return {
        status: item[1469],
        num: item[1455],
        issuingDate: item[1456],
        expiredDate: item[1457],
        remainingDays: item[1458],
        ymd: item[1459],
        attachment: item[2291],
      };
    }
  });
  const epoData = data?.map((item) => {
    if (id === "Expatriate") {
      return {
        num: item[1315],
        issuingDate: item[1290],
        attachment: item[2271],
      };
    } else if (id === "Dependent") {
      return {
        num: item[1365],
        issuingDate: item[1350],
        attachment: item[2280],
      };
    }
  });
  const itkData = data?.map((item) => {
    if (id === "Visitors") {
      return {
        status: item[1470],
        num: item[1449],
        issuingDate: item[1450],
        expiredDate: item[1451],
        remainingDays: item[1452],
        ymd: item[1453],
        attachment: item[2290],
      };
    }
  });

  return (
    <div className="p-3 shadow-sm  border my-3 w-full rounded-sm lg:w-5">
      <span className="flex gap-2 items-center">
        <i className={icon}></i>
        <h5 className=" text-lg font-bold">{title}</h5>
      </span>
      {type === "visa" && <VisaCard visaData={visaData[0]} />}
      {type === "passport" && <PassportCard passportData={passportData[0]} />}
      {type === "kitas" && <KitasCard kitasData={kitasData[0]} />}
      {type === "merp" && <MerpCard merpData={merpData[0]} />}
      {type === "rptka" && <RptkaCard data={rptkaData[0]} />}
      {type === "notification" && (
        <NotificationCard data={notificationData[0]} />
      )}
      {type === "stm" && <StmCard data={stmData[0]} />}
      {type === "sktt" && <SkttCard data={skttData[0]} />}
      {type === "lk" && <LkCard data={lkData[0]} />}
      {type === "skj" && <SkjCard data={skjData[0]} />}
      {type === "epo" && <EpoCard data={epoData[0]} />}
      {type === "itk" && <ItkCard data={itkData[0]} />}
    </div>
  );
};

export default DataCard;
