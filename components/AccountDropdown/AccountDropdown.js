import React, { useState, Fragment } from "react";
import inject from "hocs/inject";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import ViewerInfo from "components/ViewerInfo";
import Link from "components/Link";

const useStyles = makeStyles((theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing(2)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  regularButton: {
    color: '#0095b3',
  },
  underlinedButton: {
    color: '#0095b3',
    textDecoration: 'underline'
  }
}));

const AccountDropdown = () => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer] = useViewer();
  const isAuthenticated = viewer && viewer._id;

  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  return (
    <Fragment>
      { isAuthenticated ?
        <ButtonBase onClick={toggleOpen}>
          <ViewerInfo viewer={viewer} />
        </ButtonBase>
        :
        <IconButton color="inherit" onClick={toggleOpen}>
          <AccountIcon />
        </IconButton>
      }

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={Boolean(anchorElement)}
        onClose={onClose}
      >
        <div className={classes.accountDropdown}>
          {isAuthenticated ?
            <Fragment>
              <div className={classes.marginBottom}>
                <Link href="/profile/address">
                  <Button color="secondary" fullWidth className = { classes.regularButton }>
                    Profile
                  </Button>
                </Link>
              </div>
              <div className={classes.marginBottom}>
                <Button color="secondary" fullWidth href={`/change-password?email=${encodeURIComponent(viewer.emailRecords[0].address)}`} className = { classes.regularButton }>
                  Change Password
                </Button>
              </div>
              <Button color="secondary" fullWidth href="/logout" className = { classes.underlinedButton }>
                Sign Out
              </Button>
            </Fragment>
            :
            <Fragment>
              <div className={classes.authContent}>
                <Button color="primary" fullWidth href="/signin" className = { classes.underlinedButton }>
                  Sign In
                </Button>
              </div>
              <Button color="primary" fullWidth href="/signup" className = { classes.regularButton }>
                Create Account
              </Button>
            </Fragment>
          }
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);
