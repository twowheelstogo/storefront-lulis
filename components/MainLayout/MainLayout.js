import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Header from "components/MainHeader";
import Footer from "components/CustomFooter";
import SlideHero from "custom/components/SlideHero";
import PropTypes from "prop-types";
import withCart from "containers/cart/withTempCart";
import inject from "hocs/inject";

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
    isObject =(obj)=>{
    	return (!!obj) && (obj.constructor === Object);
    }
    render(){
    	const {classes,children,shop,viewer,title,subtitle,background,type,cart} = this.props;
    	const sliderProps={
    		title,subtitle,background,type
    	};
    	const childrens =Array.isArray(children) ?(children||[]).filter(child=>this.isObject(child)):[];
    	return (
    		<React.Fragment>
    			<div className={classes.root}>
    				<Header shop={shop} viewer={viewer} cart={cart}/>
    				<SlideHero {...sliderProps}/>
    				<main className={classes.main}>
    					<article className={classes.article}>
    						{childrens.map( child =>(
    							React.cloneElement(child,{ ...cart})
    						))}
    					</article>
    				</main>
    				<Footer />
    			</div>
    		</React.Fragment>
    	);
    }
}
export default withStyles(styles)(withCart(inject("uiStore")(MainLayout)));