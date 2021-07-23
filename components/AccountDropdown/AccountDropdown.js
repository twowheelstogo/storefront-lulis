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
import SvgIcon from "@material-ui/core/SvgIcon";
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
const BasketIcon = () => <SvgIcon>
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12.25C15.3137 12.25 18 9.56371 18 6.25C18 2.93629 15.3137 0.25 12 0.25C8.68629 0.25 6 2.93629 6 6.25C6 9.56371 8.68629 12.25 12 12.25Z"/>
<path d="M24 25.75V19.75C24 18.85 23.55 17.95 22.8 17.35C21.15 16 19.05 15.1 16.95 14.5C15.45 14.05 13.8 13.75 12 13.75C10.35 13.75 8.7 14.05 7.05 14.5C4.95 15.1 2.85 16.15 1.2 17.35C0.45 17.95 0 18.85 0 19.75V25.75H24Z"/>
</svg>
</SvgIcon>
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
          <SvgIcon>
            <BasketIcon/>
          </SvgIcon>
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
