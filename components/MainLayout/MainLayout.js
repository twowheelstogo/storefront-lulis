import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Header from "components/MainHeader";
import Footer from "components/CustomFooter";
import SlideHero from "custom/components/SlideHero";
import PropTypes from "prop-types";
import withCart from "containers/cart/withTempCart";
import inject from "hocs/inject";
import { Fab } from "@material-ui/core";
import { WhatsApp as WhatsAppIcon } from "@material-ui/icons";
const styles = (theme) => ({
	root: {
		minHeight: "100vh"
	},
	main: {
		flex: "1 1 auto",
		maxWidth: theme.layout.mainContentMaxWidth,
		marginLeft: "auto",
		marginRight: "auto",
		minHeight: "50vh"
	},
	article: {
		padding: theme.spacing(0)
	},
	floatingButton: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: 10,
		background: "#25d366",
		color: "white"
	}
});
class MainLayout extends Component{
    static propTypes = {
		cart: PropTypes.shape({
			/**cart properties */
		addItemsToCart: PropTypes.func,
		addOrCreateCartLoading: PropTypes.bool,
		cart: PropTypes.any,
		checkoutMutations: PropTypes.any,
		hasMoreCartItems: PropTypes.bool,
		loadMoreCartItems: PropTypes.func,
		onChangeCartItemsQuantity: PropTypes.func,
		removeCartItemsLoading: PropTypes.bool,
		clearAuthenticatedUsersCart: PropTypes.func,
		refetchAccountCart: PropTypes.any,
		setEmailOnAnonymousCart: PropTypes.any,
		}),
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
	goToPage = (url) => {
		window.open(url, "_blank").focus();
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
    						{childrens.map( (child, i) =>(
								<React.Fragment key={i}>
									{React.cloneElement(child,{ ...cart})}
								</React.Fragment>
							))}
    					</article>
    				</main>
    				<Footer />
					<Fab className = {classes.floatingButton}
					onClick = {()=> this.goToPage("https://wa.me/50245485624")}>
						<WhatsAppIcon />
					</Fab>
    			</div>
    		</React.Fragment>
    	);
    }
}
export default withStyles(styles)(withCart(inject("uiStore")(MainLayout)));