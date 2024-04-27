import { z } from 'zod';

const PatientDataSchema = z.object({
    patient_name: z.string(),
    patient_id : z.string(),
    age: z.string(),
    sex: z.string(),
});

const NoseDataSchema = z.object({
    Right_Naasal_Cavity: z.string().optional(),
    Inferior_Turbinate_and_Meatus: z.string().optional(),
    Middle_Turbinate_and_Meatus: z.string().optional(),
    Uncinate_Process: z.string().optional(),
    Superior_Turbinate_and_Meatus: z.string().optional(),
    Sphenoethmoidal_Recess: z.string().optional(),
    Left_Nasal_Cavity: z.string().optional(),
    Bulla: z.string().optional(),
    Septum: z.string().optional(),
    Nasopharynx: z.string().optional(),
    Roof: z.string().optional(),
    Posterior_Wall: z.string().optional(),
    Eustachian_Tube_Orifice: z.string().optional(),
    Interpretation: z.string().optional(),
    Impression: z.string().optional(),
});

const EarThroatDataSchema = z.object({
    Oral_Cavity: z.string().optional(),
    Hard_Palate: z.string().optional(),
    Soft_Palate: z.string().optional(),
    Uvula: z.string().optional(),
    Posterior_Of_Tongue: z.string().optional(),
    Epiglottis: z.string().optional(),
    Vallecula: z.string().optional(),
    Pharyngoepiglottic_Fold: z.string().optional(),
    Aryepiglottic_Fold: z.string().optional(),
    Arytnoids: z.string().optional(),
    Ventricular_Band: z.string().optional(),
    Vocal_Cord: z.string().optional(),
    Posterior_Pharyngeal_Wall: z.string().optional(),
    Sub_Glottis: z.string().optional(),
    Other_Findings: z.string().optional(),
    Impression_Throat: z.string().optional(),
    EAR: z.string().optional(),
    EAC: z.string().optional(),
    Tympanic_Membrane: z.string().optional(),
    Pars_Flaccida: z.string().optional(),
    Pars_Tensa: z.string().optional(),
    Impression_Ear: z.string().optional(),
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