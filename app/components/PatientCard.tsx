import React, { useState } from "react";
interface Props {
  patient_name: string;
  age: string;
  sex: string;
  created_at: string;
  item: any;
  type: string;
}
const PatientCard = ({
  patient_name,
  age,
  sex,
  created_at,
  item,
  type,
}: Props) => {
  const [seeFull, setSeeFull] = useState(false);
  let date = new Date(created_at);
  const date_creation =
    date.getDate() + " / " + date.getMonth() + " / " + date.getFullYear();
  return (
    <>
      {" "}
      <div className="w-[30%] bg-white rounded-xl p-4 font-poppins font-medium flex flex-col gap-2 border-2 border-[#e0e0e0] aspect-[1.35] justify-between">
        <p>Name: {patient_name}</p>
        <p>Age: {age}</p>
        <p>Sex: {sex}</p>
        <p>Created At: {date_creation}</p>
        <button
          type="button"
          className="w-full py-2 bg-primary text-white rounded-lg"
          onClick={() => setSeeFull(true)}
        >
          See Full Report &rarr;
        </button>
      </div>
      {seeFull && (
        <div
          className="overlay w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.2)]"
          onClick={() => setSeeFull(false)}
        ></div>
      )}
      {seeFull && type === "Nose" && (
        <div className="--full-report min-w-[50%] p-4 h-[80%] overflow-y-scroll overflow-hidden bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-nowrap">
          <h1 className="text-2xl font-poppins font-medium mb-4">
            Report Data
          </h1>
          <div
            className="cross w-8 h-8 font-bold absolute top-4 right-2 cursor-pointer"
            onClick={() => setSeeFull(false)}
          >
            X
          </div>
          <ul className="font-poppins">
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
              Middle Turbinate and Meatus: {item.Middle_Turbinate_and_Meatus}
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
          </ul>
        </div>
      )}
      {seeFull && type === "Ear" && (
        <div className="-full-report min-w-[70%] p-4 h-[80%] overflow-y-scroll">
          <ul className="font-poppins">
            <li>Report Name: {item.reportName}</li>
            <li>Name: {item.patient.patient_name}</li>
            <li>Age: {item.patient.age}</li>
            <li>Sex: {item.patient.sex} </li>
            <li>Created At: {new Date(item.createdAt).toLocaleString()}</li>
            <li>Oral Cavity: {item.Oral_Cavity}</li>
            <li>Hard Palate: {item.Hard_Palate}</li>
            <li>Soft Palate: {item.Soft_Palate}</li>
            <li>Uvula: {item.Uvula}</li>
            <li>Posterior Of Tongue: {item.Posterior_Of_Tongue}</li>
            <li>Epiglottis: {item.Epiglottis}</li>
            <li>Vallecula: {item.Vallecula}</li>
            <li>Pharyngoepiglottic Fold: {item.Pharyngoepiglottic_Fold}</li>
            <li>Aryepiglottic Fold: {item.Aryepiglottic_Fold}</li>
            <li>Arytnoids: {item.Arytnoids}</li>
            <li>Ventricular Band: {item.Ventricular_Band}</li>
            <li>Vocal Cord: {item.Vocal_Cord}</li>
            <li>Posterior Pharyngeal Wall: {item.Posterior_Pharyngeal_Wall}</li>
            <li>Sub Glottis: {item.Sub_Glottis}</li>
            <li>Other Findings: {item.Other_Findings}</li>
            <li>Impression Throat: {item.Impression_Throat}</li>
            <li>EAR: {item.EAR}</li>
            <li>EAC: {item.EAC}</li>
            <li>Tympanic Membrane: {item.Tympanic_Membrane}</li>
            <li>Pars Flaccida: {item.Pars_Flaccida}</li>
            <li>Pars Tensa: {item.Pars_Tensa}</li>
            <li>Impression Ear: {item.Impression_Ear}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PatientCard;
