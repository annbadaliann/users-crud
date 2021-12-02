import React, { useState, useCallback, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { getUser } from "../../store/slicers/users";

import useStyles from "./style";
import { IUser } from "../../store/models/interfaces/user";
import { AppDispatch } from "../../store";

interface IParams {
  id: string;
}

const UserDetails = () => {
  const [userData, setUserData] = useState<IUser | null>(null);

  const history = useHistory();
  const { id } = useParams<IParams>();

  const dispatch = useDispatch<AppDispatch>();

  const classes = useStyles();

  const getUserDetails = useCallback(async () => {
    const { meta, payload } = await dispatch(getUser(id));

    if (meta.requestStatus !== "fulfilled") {
      return;
    }
    // show alert
    setUserData(payload.data);
  }, [dispatch, id]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const goBack = () => {
    history.push("/users");
  };

  return (
    <Fragment>
      <div onClick={goBack} className={classes.goBack}>
        <KeyboardArrowLeftIcon />
        <p>Users</p>
      </div>
      <div className={classes.card}>
        <img src={userData?.avatar} className={classes.avatar} alt="user" />
        <ul>
          <li>ID: {userData?.id}</li>
          <li>First name: {userData?.first_name}</li>
          <li>Last name{userData?.last_name}</li>
          <li>Email: {userData?.email}</li>
        </ul>
      </div>
    </Fragment>
  );
};

export default UserDetails;
