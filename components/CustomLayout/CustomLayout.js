import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Header from "components/MainHeader";
import Footer from "components/CustomFooter";
import PropTypes from "prop-types";
const styles = (theme) => ({
    root: {
      minHeight: "100vh",
      display:'flex',
      flexFlow:'column',
      height:'100%'
    },
    main: {
      flex: "1 1 auto",
      maxWidth: theme.layout.mainContentMaxWidth,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop:"70px",
      width:'100%',
    },
    mainNoMaxwidth:{
      flex: "1 1 auto",
      // maxWidth: theme.layout.mainContentMaxWidth,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop:"70px",
      width:'100%',
      minHeight:'100vh'
    },
    article: {
      padding: theme.spacing(0),
    }
  });
class CustomLayout extends Component{
    static propTypes = {
      children: PropTypes.node,
      classes: PropTypes.object,
      title:PropTypes.string,
      subtitle:PropTypes.string,
      background:PropTypes.string,
      type:PropTypes.string.isRequired,
      shop: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      viewer: PropTypes.object
    };
  
    static defaultProps = {
      classes: {}
    };
  
    render(){
        const {classes,children,shop,viewer,title,subtitle,background,type,noMaxwidth} = this.props;
        const sliderProps={
          title,subtitle,background,type
        }
        console.log(noMaxwidth);
        return (
            <React.Fragment>
                <div className={classes.root}>
                <Header shop={shop} viewer={viewer} noScrollAction/>
                <main className={noMaxwidth?classes.mainNoMaxwidth:classes.main}>
                    <article className={classes.article}>{children}</article>
                </main>
          <Footer />
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(CustomLayout);