import { Avatar, Card } from "@mui/material";
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getUser } from "../../store/slicers/users";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  card: {
    padding: "20px",
    width: "500px",
    margin: "0 auto",
    display: "flex",
    boxShadow: "0 0 10px #ccc",
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  goBack: {
    display: "flex",
    cursor: "pointer"
  }
}));

const UserDetails = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

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
    history.push('/users')
  }

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
