import patientData from '../../data/patients';

import { NonSensitivePatientEntry } from '../types';

const patients: NonSensitivePatientEntry[] = patientData as NonSensitivePatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => {
    return patients;
};

export default {
    getPatients
};

