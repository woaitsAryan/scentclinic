"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientCard from "../components/PatientCard";
import Image from "next/image";

const FindPage = () => {
  const [noseData, setNoseData] = useState<any[]>([]);
  const [earThroatData, setEarThroatData] = useState<any[]>([]);
  const [type, setType] = useState<string>("Nose");
  const [patientName, setPatientName] = useState<string>("");
  const [reportName, setReportName] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findNose`
      );
      setNoseData(result.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findEarThroat`
      );
      setEarThroatData(result.data.data);
    };
    fetchData();
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSearch = async () => {
    if (type === "Nose") {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findNose?patient_name=${patientName}&reportName=${reportName}&date=${searchDate}`
      );
      setNoseData(result.data.data);
      return;
    }
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findEarThroat?patient_name=${patientName}&reportName=${reportName}&date=${searchDate}`
    );
    setEarThroatData(result.data.data);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-base flex justify-between items-start">
      <section className="--filter-panel shadow-xl w-fit min-w-[25%] h-full min-h-screen bg-white p-8 flex flex-col gap-4">
        <Image
          src="/logo-scent.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-32"
        />
        <h1 className="text-3xl font-poppins font-semibold">Filter Reports</h1>
        <div className="flex gap-4 items-center">
          <label htmlFor="type">Report Type:</label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className="px-4 py-2 outline-none border-2 border-[#e0e0e0] rounded-lg"
          >
            <option value="Nose">Nose</option>
            <option value="Ear/Throat">Ear/Throat</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="search">Search by Patient Name:</label>
          <div className="flex">
            <input
              id="search"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-[75%] outline-none border-2 border-[#e0e0e0] rounded-lg rounded-r-none border-r-0 px-2 py-2"
            />
            <button
              onClick={handleSearch}
              className="w-[25%] bg-primary text-white rounded-lg rounded-l-none"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="search">Search by Day:</label>
          <div className="flex">
            <input
              id="search"
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-[75%] outline-none border-2 border-[#e0e0e0] rounded-lg rounded-r-none border-r-0 px-2 py-2"
            />
            <button
              onClick={handleSearch}
              className="w-[25%] bg-primary text-white rounded-lg rounded-l-none"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="search">Search by Report name:</label>
          <div className="flex">
            <input
              id="search"
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-[75%] outline-none border-2 border-[#e0e0e0] rounded-lg rounded-r-none border-r-0 px-2 py-2"
            />
            <button
              onClick={handleSearch}
              className="w-[25%] bg-primary text-white rounded-lg rounded-l-none"
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <div className="--report-data w-[75%] h-full p-8">
        <h1 className="text-3xl font-poppins font-semibold mb-6">
          Reports Data
        </h1>
        <div className="w-full flex gap-2 flex-wrap">
          {type === "Nose"
            ? noseData.map((item, index) => (
                <PatientCard
                  patient_name={item.patient.patient_name}
                  age={item.patient.age}
                  sex={item.patient.sex}
                  created_at={item.createdAt}
                  key={index}
                  item={item}
                  type={"Nose"}
                />
              ))
            : earThroatData.map((item, index) => (
                <PatientCard
                  patient_name={item.patient.patient_name}
                  age={item.patient.age}
                  sex={item.patient.sex}
                  created_at={item.createdAt}
                  key={index}
                  item={item}
                  type={"Ear"}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FindPage;
{
  /* <ul key={index}>
                <li>Report Name: {item.reportName}</li>
                <li>Patient Name: {item.patient.patient_name}</li>
                <li>Patient Age: {item.patient.age}</li>
                <li>Patient Sex: {item.patient.sex}</li>
                <li>Created At: {new Date(item.createdAt).toLocaleString()}</li>
                <li>Right Naasal Cavity: {item.Right_Naasal_Cavity}</li>
                <li>
                  Inferior Turbinate and Meatus:{" "}
                  {item.Inferior_Turbinate_and_Meatus}
                </li>
                <li>
                  Middle Turbinate and Meatus:{" "}
                  {item.Middle_Turbinate_and_Meatus}
                </li>
                <li>Uncinate Process: {item.Uncinate_Process}</li>
                <li>
                  Superior Turbinate and Meatus:{" "}
                  {item.Superior_Turbinate_and_Meatus}
                </li>
                <li>Sphenoethmoidal Recess: {item.Sphenoethmoidal_Recess}</li>
                <li>Left Nasal Cavity: {item.Left_Nasal_Cavity}</li>
                <li>Bulla: {item.Bulla}</li>
                <li>Septum: {item.Septum}</li>
                <li>Nasopharynx: {item.Nasopharynx}</li>
                <li>Roof: {item.Roof}</li>
                <li>Posterior Wall: {item.Posterior_Wall}</li>
                <li>Eustachian Tube Orifice: {item.Eustachian_Tube_Orifice}</li>
                <li>Interpretation: {item.Interpretation}</li>
                <li>Impression: {item.Impression}</li>
              </ul> */
}
