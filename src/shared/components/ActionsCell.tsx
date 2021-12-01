import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  iconWrapper: {
    margin: "0 4px",
  },
  icon: {
    color: theme.palette.grey[200],
  },
  root: {
    display: "flex",
    width: "35px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function ActionsCell({ actions, row }): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {actions.map((item) => (
        <div key={item.id}>
          <IconButton size="small" onClick={(e) => item.callback(e, row)}>
            {<item.icon className={classes.icon} />}
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default ActionsCell;
