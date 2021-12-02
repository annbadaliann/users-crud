import { useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Box from "@mui/system/Box";

import McButton from "../../../shared/components/Button";
import McInput from "../../../shared/components/Input";
import { createUser, getUser } from "../../../store/slicers/users";
import { AppDispatch } from "../../../store";

interface IEditUserProps {
  getData: () => void;
  handleCloseDialog: () => void;
  userId: number | undefined;
}

const EditUser = ({ getData, handleCloseDialog, userId }: IEditUserProps) => {
  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const dispatch = useDispatch<AppDispatch>();

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

  const { handleSubmit } = methods;

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
