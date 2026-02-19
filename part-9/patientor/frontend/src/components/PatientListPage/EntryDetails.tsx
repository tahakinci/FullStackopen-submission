import { Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Entry, HealthCheckRating } from "../../types";

type PropTypes = {
    entry: Entry
};


const EntryDetails = ({ entry }: PropTypes) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };


    const baseContainerSx = {
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
    };

    const headerRowSx = {
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontWeight: 600,
    };

    const getHealthRatingColor = (rating: HealthCheckRating) => {
        switch (rating) {
            case HealthCheckRating.Healthy:
                return "success.main";
            case HealthCheckRating.LowRisk:
                return "warning.main";
            case HealthCheckRating.HighRisk:
                return "error.light";
            case HealthCheckRating.CriticalRist:
                return "error.main";
            default:
                return "grey.500";
        }
    };

    switch (entry.type) {
        case "Hospital":
            return (
                <Stack sx={baseContainerSx} spacing={1}>
                    <Stack sx={headerRowSx} direction="row">
                        <LocalHospitalIcon />
                        <span>{entry.type}</span>
                    </Stack>

                    <Stack spacing={0.5}>
                        <span>{entry.description}</span>
                        <span>Diagnosed by {entry.specialist}</span>
                    </Stack>
                </Stack>
            );

        case "HealthCheck":
            return (
                <Stack sx={baseContainerSx} spacing={1}>
                    <Stack sx={headerRowSx} direction="row">
                        <MedicalServicesIcon />
                        <span>{entry.type}</span>
                    </Stack>

                    <Stack spacing={0.5}>
                        <span>{entry.description}</span>

                        <Stack direction="row" alignItems="center" gap={1}>
                            <FavoriteIcon
                                sx={{
                                    color: getHealthRatingColor(entry.healthCheckRating),
                                }}
                            />
                        </Stack>

                        <span>Diagnosed by {entry.specialist}</span>
                    </Stack>
                </Stack>
            );
        case "OccupationalHealthcare":
            return (
                <Stack sx={baseContainerSx} spacing={1}>
                    <Stack sx={headerRowSx} direction="row">
                        <WorkIcon />
                        <span>{entry.type}</span>
                        <span>({entry.employerName})</span>
                    </Stack>

                    <Stack spacing={0.5}>
                        <span>{entry.description}</span>
                        <span>Diagnosed by {entry.specialist}</span>
                    </Stack>
                </Stack>
            );

        default:
            return assertNever(entry);
    }

};

export default EntryDetails;
