/* eslint-disable no-use-before-define */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { applyTheme } from "@reactioncommerce/components/utils";
import useShop from "hooks/shop/useShop";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F4F1F1",
  },
}));

export default function SelectBranch(props) {
  const defaultId = props.defaultId || "";
  const { shopState } = useShop();
  const { branch, branches } = shopState;
  const defaultBranch = branches.find((x) => x._id === defaultId) || {
    generalData: { name: "No hay sucursal seleccionada" },
  };
  const classes = useStyles();
  const hookChange = props.hookChange || (() => {});

  return (
    <Autocomplete
      className={classes.root}
      id="select-branches"
      disableClearable
      size="small"
      options={branches}
      getOptionLabel={(option) => option.generalData.name}
      defaultValue={defaultBranch}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
      onChange={(event, newValue) => {
        hookChange(newValue);
      }}
    />
  );
}
