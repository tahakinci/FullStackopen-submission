import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatientEntry[] => {
    return patients;
};

const getSinglePatient = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id) as Patient;

    if (!patient) {
        return undefined;
    }

    return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    } as Patient;

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryToPatient = (entry: NewEntry, id: string): Entry => {
    const entryId = uuid();
    const patient = patients.find(p => p.id === id);
    const NewEntry = {
        id: entryId,
        ...entry
    } as Entry;

    patient?.entries.push(NewEntry);
    return NewEntry;
};

export default {
    getPatients,
    addPatient,
    getSinglePatient,
    addEntryToPatient
};

