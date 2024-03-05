import { z } from 'zod';

const PatientDataSchema = z.object({
    patient_name: z.string(),
    age: z.string(),
    sex: z.string(),
});

const ReportDataSchema = z.object({
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

export const ReportSchema = z.object({
    reportName: z.string(),
    patientData: PatientDataSchema,
    reportData: ReportDataSchema,
});