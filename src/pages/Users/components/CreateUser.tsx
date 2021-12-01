import { Box } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import McButton from "../../../shared/components/Button";
import McInput from "../../../shared/components/Input";
import { createUser } from "../../../store/slicers/users";

const CreateUser = ({ getData, handleCloseDialog }) => {
  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const { handleSubmit } = methods;
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
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
