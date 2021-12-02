import { ReactNode, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    padding: "13px 20px",
    borderRadius: "10px",
    height: "54px",
    cursor: "pointer",
    width: "100%",
  },
}));

type Variant = "text" | "contained" | "outlined";

interface IMcButton {
  children: ReactNode;
  width?: string;
  className?: string | undefined;
  clickHandler?: any;
  variant?: Variant | undefined;
  disabled?: boolean;
  type?: string,
}

const TcoButton = ({
  children,
  width = "257px",
  className,
  disabled,
  clickHandler,
  variant = "contained",
  type,
}: IMcButton) => {
  const classes = useStyles();

  const computedStyles = useMemo(() => {
    return {
      width,
    };
  }, [width]);

  return (
    <Button
      className={`${classes.root} ${className}`}
      color="primary"
      onClick={clickHandler}
      disabled={disabled}
      type="submit"
      variant={variant}
      style={computedStyles}
    >
      {children}
    </Button>
  );
};

export default TcoButton;
