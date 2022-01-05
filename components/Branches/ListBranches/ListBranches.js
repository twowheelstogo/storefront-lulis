import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import StoreIcon from "@material-ui/icons/Store";
import useBranch from "hooks/branches/useBranch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: 300,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8ce0c9",
      outline: `1px solid #8ce0c9`,
    },
  },
  branchTitle: {
    textAlign: "center",
  },
  secondText: {
    fontSize: "12px",
    color: "#6b6b6b",
    display: "inline",
  },
  phone: {
    float: "right",
  },
}));

const ListBranches = (props) => {
  const { handleClose } = props;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { branches, loading } = useBranch();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <div>
      <h1 className={classes.branchTitle}>Sucursales</h1>
      <div className={classes.root}>
        <List component="nav">
          {branches.map((branch, index) => {
            return (
              <ListItem
                key={`branch-${index}`}
                button
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <StoreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component="span" variant="subtitle2">
                      {branch.generalData.name}
                    </Typography>
                  }
                  secondary={
                    <div>
                      <Typography component="span" variant="body2" className={classes.secondText}>
                        {branch.generalData.address}
                      </Typography>
                      <p className={`${classes.secondText} ${classes.phone}`}>Tel. {branch.generalData.phone}</p>
                    </div>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default ListBranches;
