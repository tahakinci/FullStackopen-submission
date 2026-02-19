import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button, Container, List, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
// import diagnosisService from "../../services/diagnosis";
import { Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";
import Notification from "../Notification";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  // const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [notification, setNotification] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setPatient(null);
      return;
    }

    const fetchPatientDetail = async () => {
      try {
        setIsLoading(true);
        const res = await patientService.getPatient(id);
        setPatient(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientDetail();
  }, [id]);

  // useEffect(() => {
  //     const fetchDiagnoses = async () => {
  //         const hasDiagnosisCode = patient?.entries.some(
  //             entry => entry.diagnosisCodes?.length
  //         );
  //         if (!hasDiagnosisCode)
  //             return;

  //         try {
  //             setIsLoading(true);
  //             const data = await diagnosisService.getAll();
  //             setDiagnosis(data);
  //         } catch (error: unknown) {
  //             if (error instanceof Error) {
  //                 console.error(error);
  //             }
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     };

  //     fetchDiagnoses();
  // }, [patient]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!patient) {
    return <h2>Patient not found</h2>;
  }
  return (
    <Container
      disableGutters
      sx={{
        px: 0,
        mt: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
        <Typography variant="h4">{patient.name}</Typography>

        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </Stack>

      <Stack
        sx={{
          my: 1,
          border: "2px dashed black",
          p: 2,
          display: isFormOpen ? "block" : "none",
        }}
        spacing={2}
      >
        <Notification notification={notification} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography variant="h4">New Entry</Typography>
        </Stack>
        <EntryForm
          id={id}
          setNotification={setNotification}
          setIsFormOpen={setIsFormOpen}
        />
      </Stack>

      <Stack sx={{ mt: 2 }}>
        <Typography variant="h5">entries</Typography>
        <List>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </List>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen((state) => !state)}
      >
        ADD NEW ENTRY
      </Button>
    </Container>
  );
};

export default PatientDetail;
