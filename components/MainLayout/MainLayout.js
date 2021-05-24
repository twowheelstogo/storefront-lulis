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
      marginRight: "auto"
    },
    article: {
      padding: theme.spacing(0)
    }
  });
class MainLayout extends Component{
    static propTypes = {
      children: PropTypes.node,
      classes: PropTypes.object,
      shop: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      viewer: PropTypes.object
    };
  
    static defaultProps = {
      classes: {}
    };
  
    render(){
        const {classes,children,shop,viewer} = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                <Header shop={shop} viewer={viewer}/>
                <SlideHero/>
                <main className={classes.main}>
                    <article className={classes.article}>{children}</article>
                </main>
          <Footer />
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(MainLayout);