import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ListBranches from "components/Branches/ListBranches";

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
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BranchModal = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ListBranches handleClose={handleClose} />
    </div>
  );

  return (
    <div>
      <Tooltip title="Sucursal el zapotal z9">
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
