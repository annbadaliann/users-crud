import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import McButton from "../../shared/components/Button";
import { loginUser, setAuthenticated } from "../../store/slicers/auth";

import { AppDispatch } from "../../store";

import { IUser } from "../../store/models/interfaces/user";

import useStyles from "./style";
import McInput from "../../shared/components/Input";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

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
        return;
      }
      localStorage.setItem("token", payload.token);
      history.push("/users");
    },
    [dispatch, history]
  );

  return (
    <Box className={classes.mainWrapper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <McInput label="Email" name="email" />
          <McInput label="Password" name="password" />
          <Box display="flex" justifyContent="center" mt={4}>
            <McButton type="submit">Submit</McButton>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Login;
