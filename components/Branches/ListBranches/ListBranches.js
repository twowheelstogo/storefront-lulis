import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import useBranch from "hooks/branches/useBranch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListBranches = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { branches, loading } = useBranch();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <h1>Sucursales</h1>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        {branches.map((branch, index) => {
          return (
            <ListItem button selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
              <ListItemText primary={branch.generalData.name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default ListBranches;
