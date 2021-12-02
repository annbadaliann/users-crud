import { useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const { handleSubmit, reset, watch } = methods;

  const dispatch = useDispatch<AppDispatch>();

  const getUserDetails = useCallback(async () => {
    const { meta, payload } = await dispatch(getUser(userId));

    if (meta.requestStatus !== "fulfilled") {
      return;
    }

    reset({
      job: "Frotend",
      name: payload.data.first_name,
    });

  }, [dispatch, reset, userId]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);


  const onSubmit = async (formData) => {
    const { meta } = await dispatch(createUser(formData));

    if (meta.requestStatus !== "fulfilled") {
      return;
    }
    enqueueSnackbar("User successfully updated", { variant: "success" });
    handleCloseDialog();
    getData();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <McInput label="Name" name="name" shrink={watch('name') !== null}/>
          <McInput label="Job" name="job" shrink={watch('job') !== null}/>
          <Box display="flex" justifyContent="center" mt={4}>
            <McButton type="submit">Submit</McButton>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditUser;
