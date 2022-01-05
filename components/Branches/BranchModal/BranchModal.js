import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import ListBranches from "components/Branches/ListBranches";
import useShop from "hooks/shop/useShop";

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paperModal: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paperWeb: {
    width: 600,
  },
  paperMobile: {
    width: 350,
  },
}));

const BranchModal = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const { shopState } = useShop();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const body = (
    <div style={modalStyle} className={`${classes.paperModal} ${!matches ? classes.paperWeb : classes.paperMobile}`}>
      <ListBranches handleClose={handleClose} />
    </div>
  );

  return (
    <div>
      <Tooltip title={shopState.branch.generalData.name}>
        <Button color="inherit" onClick={handleOpen}>
          Sucursales
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default BranchModal;
