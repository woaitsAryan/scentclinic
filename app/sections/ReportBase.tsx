import React, { useEffect, useState } from "react";
import Widgets from "../components/Widgets";
import Clipboard from "./Clipboard";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FieldModal from "../components/FieldModal";

const ReportBase = ({
  save,
  setSave,
  reportName,
}: {
  save: boolean;
  setSave: React.Dispatch<React.SetStateAction<boolean>>;
  reportName: string;
}) => {
  const [zoom, setZoom] = useState(0);
  const [zoomVal, setZoomVal] = useState(50);
  const [savePdf, setSavePdf] = useState(false);
  const [addNewField, setAddNewField] = useState(false);
  const [labels, setLabels] = useState<string[]>(curr_labels);
  const [patientData, setPatientData] = useState({
    patient_name: "",
    age: "",
    sex: "",
  });
  const [reportData, setReportData] = useState({});
  useEffect(() => {
    if (zoomVal === 50 && zoom === 0) return;
    else {
      setZoomVal(50 + 10 * zoom);
    }
  }, [zoom]);
  useEffect(() => {
    if (save) {
      const data = {
        reportName,
        patientData,
        reportData,
      };
      console.log(data);
      setSave(false);
    }
  }, [save]);
  const generatePdf = async () => {
    const element = document.getElementById("pdf-content"); // Replace with your actual div ID

    if (element) {
      try {
        const canvas = await html2canvas(element, { scale: 4 });
        const pdf = new jsPDF();
        pdf.addImage(
          canvas.toDataURL("image/jpeg"),
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height,
          "NONE"
        );
        pdf.save(reportName);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Element not found");
    }
  };
  useEffect(() => {
    (async () => {
      if (savePdf && zoom === 4) {
        generatePdf();
        setSavePdf(false);
      }
    })();
  }, [savePdf, zoom]);
  return (
    <div className="wrapper w-full flex justify-center items-start py-4 font-poppins relative">
      <div
        id="pdf-content"
        className="aspect-[210/297] border-0 bg-white border-[#aeaeae70] shadow-xl relative"
        style={{ width: `${zoomVal}%` }}
      >
        <Widgets
          zoom={zoom}
          setZoom={setZoom}
          setSavePdf={setSavePdf}
          setAddNewField={setAddNewField}
        />
        <header className="w-full min-h-[18%] h-fit py-4 flex flex-col gap-4 border-b-2 border-[#232323]">
          <div className="w-[90%] mx-auto --info-section flex justify-between items-center">
            <Image
              src="/logo-scent.svg"
              width={1000}
              height={1000}
              alt="Logo"
              className="w-[40%]"
            />
            <div className="Address font-poppins text-[0.75em] font-medium">
              No. 27, Vellore - Katpadi Road
              <br />
              Silk Mill, Gandhi Nagar, Katpadi
              <br />
              Vellore, PIN: 632006
              <br />
              Email : scentclinics@gmail.com
              <br />
              Ph: 9342683675
            </div>
          </div>
          <div className="--details-section font-poppins w-full">
            <h1 className="text-[20px] font-medium text-center">
              Endoscopy Report
            </h1>
            <div className="--patient-details flex justify-between items-center gap-4 w-[90%] mx-auto text-sm overflow-x-hidden mt-4 h-10">
              <div className="flex gap-2 items-center h-full w-[50%]">
                <label htmlFor="Name">Name: </label>
                <input
                  type="text"
                  name="Name"
                  id=""
                  autoComplete="off"
                  className="w-full h-full outline-none"
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      patient_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-2 h-full items-center w-fit">
                <label htmlFor="Age">Age: </label>
                <input
                  type="text"
                  name="Age"
                  id=""
                  autoComplete="off"
                  className="w-16 h-full outline-none"
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      age: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-2 h-full items-center w-fit">
                <label htmlFor="Sex">Sex: </label>
                <input
                  type="text"
                  name="Sex"
                  id=""
                  autoCapitalize="off"
                  className="w-16 h-full outline-none"
                  onChange={(e) =>
                    setPatientData({
                      ...patientData,
                      sex: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {/* <div className="h-[2px] w-[90%] mt-4 mx-auto bg-[#232323]" /> */}
          </div>
        </header>
        <section className="--report-content w-full h-[75%] flex">
          <section className="--form-data w-[70%] p-8 h-full flex flex-col gap-2 items-start ">
            {labels.map((label, i) => (
              <div className="flex gap-2 items-center w-full" key={i}>
                <label htmlFor="Sex" className="text-nowrap">
                  {label}:{" "}
                </label>
                <input
                  type="text"
                  name={label}
                  autoCapitalize="off"
                  className="w-full h-full outline-none"
                  onChange={(e) =>
                    setReportData({ ...reportData, [label]: e.target.value })
                  }
                />
              </div>
            ))}
          </section>
          <aside className="--images-clipboard w-[30%] h-full  flex items-center justify-between flex-col gap-4 p-4">
            <Clipboard />
            <Clipboard />
            <Clipboard />
            <Clipboard />
          </aside>
        </section>
      </div>
      {addNewField && (
        <>
          <FieldModal
            labels={labels}
            setLabels={setLabels}
            setAddNewField={setAddNewField}
          />
          <div
            className="overlay fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[100]"
            onClick={() => setAddNewField(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default ReportBase;
const curr_labels = [
  "Right Naasal Cavity",
  "Inferior Turbinate & Meatus",
  "Middle Turbinate & Meatus",
  "Uncinate Process",
  "Superior Turbinate & Meatus",
  "Sphenoethmoidal Recess",
  "Left Nasal Cavity",
  "Inferior Turbinate & Meatus",
  "Middle Turbinate & Meatus",
  "Uncinate Process",
  "Superior Turbinate & Meatus",
  "Sphenoethmoidal Recess",
  "Bulla",
  "Septum",
  "Nasopharynx",
  "Roof",
  "Posterior Wall",
  "Eustachian Tube Orifice",
  "Interpretation",
  "Impression",
];
