import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import McButton from "../../shared/components/Button";
import { registerUser, selectUser } from "../../store/slicers/auth";

import { ESteps } from "../../shared/models/Interfaces/auth";
import { AppDispatch } from "../../store";
import {
  selectSelectedMentors,
  selectSuggestedMentors,
} from "../../store/slicers/mentors";
import { IUser } from "../../store/models/interfaces/user";

import { ILocation } from "./model";
import constants from "./constants";
import useStyles from "./style";
import McInput from "../../shared/components/Input";

function Register() {
  const [activeStep, setActiveStep] = useState(ESteps.FirstStep);

  const location: ILocation = useLocation();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const classes = useStyles();

  const methods = useForm({
    shouldUnregister: false,
    mode: "all",
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = useCallback(
    async (data: IUser) => {
      const form = user || data;
      await dispatch(registerUser({ ...form }));
      history.push("/home");
    },
    [dispatch, history]
  );

  return (
    <Box className={classes.mainWrapper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <FormProvider {...methods}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <McInput label="Email" name="email" />
          <McInput label="Password" name="password" />
          <Box display="flex" justifyContent="center" mt={4}>
            <McButton type="submit">Submit</McButton>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default Register;
