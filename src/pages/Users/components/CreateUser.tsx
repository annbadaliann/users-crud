import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Box from "@mui/system/Box";

import TcoButton from "../../../shared/components/Button";
import TcoInput from "../../../shared/components/Input";
import { AppDispatch } from "../../../store";
import { createUser } from "../../../store/slicers/users";
import { IUserForm } from "../../../store/models/interfaces/user";
interface ICreateUserProps {
  getData: () => void;
  handleCloseDialog: () => void;
}


const CreateUser = ({ getData, handleCloseDialog }: ICreateUserProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const { handleSubmit } = methods;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (formData: IUserForm) => {
    const { meta } = await dispatch(createUser(formData));

    if (meta.requestStatus !== "fulfilled") {
      return;
    }
    enqueueSnackbar("User successfully created", { variant: "success" });
    handleCloseDialog();
    getData();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TcoInput label="Name" name="name" />
          <TcoInput label="Job" name="job" />
          <Box display="flex" justifyContent="center" mt={4}>
            <TcoButton type="submit">Submit</TcoButton>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateUser;
