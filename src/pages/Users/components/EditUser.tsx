import { Box } from "@mui/system";
import React, { useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import McButton from "../../../shared/components/Button";
import McInput from "../../../shared/components/Input";
import { createUser, getUser } from "../../../store/slicers/users";

const EditUser = ({ getData, handleCloseDialog, userId }) => {
  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const dispatch = useDispatch();

  const getUserDetails = useCallback(async () => {
    const { meta } = await dispatch(getUser(userId));

    if (meta.requestStatus !== "fulfilled") {
      return;
    }
    // show alert
  }, [dispatch, userId]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const { handleSubmit, reset } = methods;

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

export default EditUser;
