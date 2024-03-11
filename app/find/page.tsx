'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FindPage = () => {
    const [noseData, setNoseData] = useState<any[]>([])
    const [earThroatData, setEarThroatData] = useState<any[]>([])
    const [type, setType] = useState<string>('Nose')
    const [patientName, setPatientName] = useState<string>("");
    const [reportName, setReportName] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findNose`,
            )
            setNoseData(result.data.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findEarThroat`,
            )
            setEarThroatData(result.data.data)
        }
        fetchData()
    }, [])

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)
    }

    const handleSearch = async () => {
        if(type === 'Nose'){
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findNose?patient_name=${patientName}&reportName=${reportName}`,
            )
            setNoseData(result.data.data)
            return;
        }
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/findEarThroat?patient_name=${patientName}&reportName=${reportName}`,
        )
        setEarThroatData(result.data.data)
    }

    return (
        <div>
            <h1>Find Page</h1>
            <div>
                <label htmlFor="type">Select Type:</label>
                <select id="type" value={type} onChange={handleTypeChange}>
                    <option value="Nose">Nose</option>
                    <option value="Ear/Throat">Ear/Throat</option>
                </select>
            </div>
            <div>
                <label htmlFor="search">Search by Patient Name:</label>
                <input id="search" type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <label htmlFor="search">Search by Report name:</label>
                <input id="search" type="text" value={reportName} onChange={(e) => setReportName(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h2>{type} Data:</h2>
                {type === 'Nose'
                    ? noseData.map((item, index) => (
                        <ul key={index}>
                            <li>Report Name: {item.reportName}</li>
                            <li>Patient Name: {item.patient.patient_name}</li>
                            <li>Patient Age: {item.patient.age}</li>
                            <li>Patient Sex: {item.patient.sex}</li>
                            <li>Created At: {new Date(item.createdAt).toLocaleString()}</li>
                            <li>Right Naasal Cavity: {item.Right_Naasal_Cavity}</li>
                            <li>Inferior Turbinate and Meatus: {item.Inferior_Turbinate_and_Meatus}</li>
                            <li>Middle Turbinate and Meatus: {item.Middle_Turbinate_and_Meatus}</li>
                            <li>Uncinate Process: {item.Uncinate_Process}</li>
                            <li>Superior Turbinate and Meatus: {item.Superior_Turbinate_and_Meatus}</li>
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
                        </ul>))
                    : earThroatData.map((item, index) => (
                        <ul key={index}>
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
                        </ul>))}
            </div>
        </div>
    )
}

export default FindPage