import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Header from "components/MainHeader";
import Footer from "components/Footer";
import SlideHero from "custom/components/SlideHero";
import PropTypes from "prop-types";
const styles = (theme) => ({
    root: {
      minHeight: "100vh"
    },
    main: {
      flex: "1 1 auto",
      maxWidth: theme.layout.mainContentMaxWidth,
      marginLeft: "auto",
      marginRight: "auto",
      paddingTop:"70px"
    },
    article: {
      padding: theme.spacing(0)
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
        const {classes,children,shop,viewer,title,subtitle,background,type} = this.props;
        const sliderProps={
          title,subtitle,background,type
        }
        return (
            <React.Fragment>
                <div className={classes.root}>
                <Header shop={shop} viewer={viewer} noScrollAction/>
                <main className={classes.main}>
                    <article className={classes.article}>{children}</article>
                </main>
          <Footer />
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(CustomLayout);