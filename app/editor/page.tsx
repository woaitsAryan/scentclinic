"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ReportBase from "../sections/ReportBase";
export default function Editor() {
  const [save, setSave] = useState(false);
  const [reportName, setReportName] = useState("Patient_Record_01");

  return (
    <>
      <Navbar
        setSave={setSave}
        reportName={reportName}
        setReportName={setReportName}
      />
      <ReportBase save={save} setSave={setSave} reportName={reportName} />
    </>
  );
}
