import { z } from 'zod';

const PatientDataSchema = z.object({
    patient_name: z.string(),
    age: z.string(),
    sex: z.string(),
});

const NoseDataSchema = z.object({
    Right_Naasal_Cavity: z.string(),
    Inferior_Turbinate_and_Meatus: z.string(),
    Middle_Turbinate_and_Meatus: z.string(),
    Uncinate_Process: z.string(),
    Superior_Turbinate_and_Meatus: z.string(),
    Sphenoethmoidal_Recess: z.string(),
    Left_Nasal_Cavity: z.string(),
    Bulla: z.string(),
    Septum: z.string(),
    Nasopharynx: z.string(),
    Roof: z.string(),
    Posterior_Wall: z.string(),
    Eustachian_Tube_Orifice: z.string(),
    Interpretation: z.string(),
    Impression: z.string(),
});

const EarThroatDataSchema = z.object({
    Oral_Cavity: z.string(),
    Hard_Palate: z.string(),
    Soft_Palate: z.string(),
    Uvula: z.string(),
    Posterior_Of_Tongue: z.string(),
    Epiglottis: z.string(),
    Vallecula: z.string(),
    Pharyngoepiglottic_Fold: z.string(),
    Aryepiglottic_Fold: z.string(),
    Arytnoids: z.string(),
    Ventricular_Band: z.string(),
    Vocal_Cord: z.string(),
    Posterior_Pharyngeal_Wall: z.string(),
    Sub_Glottis: z.string(),
    Other_Findings: z.string(),
    Impression_Throat: z.string(),
    EAR: z.string(),
    EAC: z.string(),
    Tympanic_Membrane: z.string(),
    Pars_Flaccida: z.string(),
    Pars_Tensa: z.string(),
    Impression_Ear: z.string(),
});

export const NoseSchema = z.object({
    reportName: z.string(),
    patientData: PatientDataSchema,
    reportData: NoseDataSchema,
});

export const EarThroatSchema = z.object({
    reportName: z.string(),
    patientData: PatientDataSchema,
    reportData: EarThroatDataSchema,
});