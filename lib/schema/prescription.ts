import { z } from 'zod';

export const PrescriptionSchema = z.object({
    name: z.string(),
    premedication: z.string(),
    right_nasal_cavity: z.string(),
    inferior_turbinate_and_meatus: z.string(),
    uncinate_process: z.string(),
    indication: z.string(),
});

