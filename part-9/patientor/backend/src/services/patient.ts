import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';

const patients: NonSensitivePatientEntry[] = patientData as NonSensitivePatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => {
    return patients;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient
};

