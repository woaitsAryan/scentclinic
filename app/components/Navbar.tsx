import React, { useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoSaveOutline } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
const Navbar = () => {
  const generatePdf = async () => {
    const element = document.getElementById("pdf-content"); // Replace with your actual div ID

    if (element) {
      try {
        const canvas = await html2canvas(element);

        // Convert canvas to PDF
        const pdf = new jsPDF();
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height
        );
        pdf.save("your-file-name.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Element not found");
    }
  };
  const [reportName, setReportName] = useState("Patient_Record_01");
  return (
    <div className="sticky top-0 left-0 w-full h-20 shadow-lg bg-white z-[100]">
      <div className="w-[80%] h-full mx-auto flex justify-between items-center">
        <Image
          src="/logo-scent.svg"
          width={400}
          height={400}
          alt="Scent Clinic"
          className="h-[80%] w-auto"
        />
        <input
          type="text"
          name="Report Name"
          className="outline-none border-0 w-[30%] text-center"
          placeholder="Report Name"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          autoComplete="off"
        />
        <button
          type="button"
          className="flex gap-2 bg-light text-white px-6 py-2 rounded-lg font-medium text-lg items-center active:scale-95 transition-all duration-200 ease-linear"
        >
          <FaSave size={20} />
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
