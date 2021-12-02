import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
interface IInput {
  name: string;
  label: string;
  shrink?: boolean
}

const McInput = ({ name, label, shrink, ...props }: IInput) => {
  const { control, formState } = useFormContext();
  const { register } = control;

  return (
    <TextField
      fullWidth
      label={label}
      margin="dense"
      InputLabelProps={{ shrink }}
      error={formState?.errors?.[name]}
      {...register(name, { required: true })}
      {...props}
    />
  );
};

export default McInput;
