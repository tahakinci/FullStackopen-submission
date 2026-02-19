import {
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import patientsService from "../../services/patients";
import { EntryFormValues, NewEntrySchema } from "../../types";

type PropTypes = {
  id: string | undefined;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EntryForm = ({ id, setNotification, setIsFormOpen }: PropTypes) => {
  const { control, handleSubmit } = useForm<EntryFormValues>({
    mode: "all",
    resolver: zodResolver(NewEntrySchema),
    defaultValues: {
      type: "Hospital",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
    },
  });

  const type = useWatch({
    control,
    name: "type",
  });

  const onSubmit = async (data: EntryFormValues) => {
    try {
      if (!id) return;
      const addedEntry = await patientsService.addEntry(data, id);
      console.log(addedEntry);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data?.error?.[0]?.message ?? "";
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
      }
    }
  };

  const dynamicFields = () => {
    switch (type) {
      case "HealthCheck":
        return (
          <Controller
            control={control}
            name="healthCheckRating"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Health check rating"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );

      case "Hospital":
        return (
          <>
            <Stack spacing={1} sx={{ border: "2px dashed gray", padding: 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ paddingBottom: 1 }}
              >
                Discharge
              </Typography>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="discharge.date"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Date"
                      InputLabelProps={{ shrink: true }}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="discharge.criteria"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Criteria"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </>
        );

      case "OccupationalHealthcare":
        return (
          <>
            <Controller
              control={control}
              name="employerName"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Employer"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Stack spacing={1} sx={{ border: "2px dashed gray", padding: 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ paddingBottom: 1 }}
              >
                Sick Leave
              </Typography>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="sickLeave.startDate"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Start date"
                      InputLabelProps={{ shrink: true }}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="sickLeave.endDate"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="End date"
                      InputLabelProps={{ shrink: true }}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value={"Hospital"}>Hospital</MenuItem>
              <MenuItem value={"OccupationalHealthcare"}>
                Occupational Healthcare
              </MenuItem>
              <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            </Select>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="specialist"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Specialist"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="diagnosisCodes"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Diagnosis Codes"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              value={(field.value ?? []).join(".")}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\s+/g, "");
                const normalized = cleaned.replace(/\.+/g, ".");
                const trimmed = normalized.replace(/^\.|\.$/g, "");
                field.onChange(trimmed ? trimmed.split(".") : []);
              }}
            />
          )}
        />
        {dynamicFields()}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EntryForm;
