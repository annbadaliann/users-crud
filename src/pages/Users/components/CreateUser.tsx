import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Box from "@mui/system/Box";

import McButton from "../../../shared/components/Button";
import McInput from "../../../shared/components/Input";
import { AppDispatch } from "../../../store";
import { createUser } from "../../../store/slicers/users";

interface ICreateUserProps {
  getData: () => void;
  handleCloseDialog: () => void;
}

interface IUserForm {
  job: string;
  name: string;
}

const CreateUser = ({ getData, handleCloseDialog }: ICreateUserProps) => {
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
    // show alert
    handleCloseDialog();
    getData();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <McInput label="Name" name="name" />
          <McInput label="Job" name="job" />
          <Box display="flex" justifyContent="center" mt={4}>
            <McButton type="submit">Submit</McButton>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateUser;
