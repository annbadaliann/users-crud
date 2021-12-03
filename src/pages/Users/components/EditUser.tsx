import { useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Box from "@mui/system/Box";

import TcoButton from "../../../shared/components/Button";
import TcoInput from "../../../shared/components/Input";
import { editUser, getUser } from "../../../store/slicers/users";
import { AppDispatch } from "../../../store";
import { IUserForm } from "../../../store/models/interfaces/user";

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
    const { meta, payload } = await dispatch(getUser(userId)) as any;

    if (meta.requestStatus !== "fulfilled") {
      return;
    }

    reset({
      job: "Frotend",
      name: payload?.data.first_name,
    });

  }, [dispatch, reset, userId]);

  useEffect(() => {
    if(userId){
      getUserDetails();
    }
  }, [getUserDetails, userId]);


  const onSubmit = async (formData: IUserForm) => {
    const { meta } = await dispatch(editUser({data: formData, userId}));

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
          <TcoInput label="Name" name="name" shrink={watch('name') !== null}/>
          <TcoInput label="Job" name="job" shrink={watch('job') !== null}/>
          <Box display="flex" justifyContent="center" mt={4}>
            <TcoButton type="submit">Submit</TcoButton>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditUser;
