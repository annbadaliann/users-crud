import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TcoButton from "../../shared/components/Button";
import TcoInput from "../../shared/components/Input";
import { loginUser } from "../../store/slicers/auth";
import { AppDispatch } from "../../store";
import { IUser } from "../../store/models/interfaces/user";

import useStyles from "./style";

const Login = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (data: IUser) => {
      const { meta, payload } = await dispatch(loginUser(data));

      if (meta.requestStatus !== "fulfilled") {
        enqueueSnackbar("Email or password is wrong", { variant: "error" });
        return;
      }
      
      localStorage.setItem("token", payload.token);
      history.push("/users");
    },
    [dispatch, enqueueSnackbar, history]
  );

  return (
    <div className={classes.wrapper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TcoInput label="Email" name="email" />
          <TcoInput label="Password" name="password" />
          <Box display="flex" justifyContent="center" mt={4}>
            <TcoButton type="submit">Submit</TcoButton>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
