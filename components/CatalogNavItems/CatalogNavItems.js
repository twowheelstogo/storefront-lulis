import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {AppBar} from "@material-ui/core";
const styles = (theme) => ({
	root:{
		boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
		padding:"15px",
		// position:'sticky',
		top:"70px",
		zIndex:2
		// background:'white'
	},
	items:{
		display:"grid",
		gap:"10px",
		gridAutoFlow:"column",
		overflowX:"scroll",
		scrollbarWidth:"none",
		justifyContent:"flex-start",
		// gridAutoColumns:'minmax(8rem,auto)'
	}
});
const CatalogNavItems = (props) => {
	const {classes,tags,selected,SetSelected} = props;
	return (
		<AppBar className={classes.root} position="sticky" color="white">
			<div className={classes.items}>
				{(tags||[]).map((item,i)=><CatalogItem key={`${i}`} item={item} current={selected} SetSelected={SetSelected}/>)}
			</div>
		</AppBar>
	);
};
const itemStyles = (theme) =>({
	root:{
		fontSize:"14px",
		fontWeight:400,
		margin:"auto",
		textAlign:"center",
		"&:hover":{
			background:"alpha(#f5f5f5,#f5f5f5)"
		}
	},
	unselected:{
		color:theme.palette.secondary.main,
		borderRadius:"15px",
		paddingLeft:theme.spacing(2),
		paddingRight:theme.spacing(2),
		paddingBottom:theme.spacing(0.5),
		paddingTop:theme.spacing(0.5),
	},
	selected:{
		color:theme.palette.secondary.main,
		paddingLeft:theme.spacing(2),
		paddingRight:theme.spacing(2),
		paddingBottom:theme.spacing(0.5),
		paddingTop:theme.spacing(0.5),
		background:theme.palette.secondary.light,
		borderRadius:"15px"
	}
});
const CatalogItem = withStyles(itemStyles)((props) =>{
	const {classes,item,current,SetSelected} = props;
	const selected = current?._id==item._id;
	return(
		<div className={classes.root} onClick={()=>SetSelected(item)}>
			<div className={selected?classes.selected:classes.unselected}>
				{item.displayTitle}
			</div>
		</div>
	);
});
export default withStyles(styles)(CatalogNavItems);