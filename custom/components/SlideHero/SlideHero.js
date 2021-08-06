import React from "react";
import {makeStyles,} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme)=>({
	videoPlayer:{
		position:"absolute",
		objectFit:"cover",
		width:"100%",
		height:"100%",
		zIndex:0,
		top:0,
		left:0,
		bottom:0,
		right:0,
	},
	background:{
		position:"absolute",
		objectFit:"cover",
		width:"100%",
		height:"100%",
		zIndex:0,
		top:0,
		left:0,
		bottom:0,
		right:0,
	},
	slideContent:{
		zIndex:200,
		margin:"auto",
		padding:"0 15px",
		position:"relative"
	},
	hero:{
		position:"relative",
		overflow:"hidden",
		top:0,
		left:0,
		width:"auto",
		margin:0,
		height:"50vh",
		display:"flex",
		[theme.breakpoints.up("md")]:{
			height: "70vh"
		}
	}
}));
function SlideHero(props){
	const {title,subtitle,background,type} = props;
	const classes = useStyles();
	return(
		<React.Fragment>
			<div className={classes.hero}>
				{type=="video"
					?<video id="video-player" className={classes.videoPlayer} poster="//cdn.shopify.com/s/files/1/0100/4575/1377/files/Homepage_Desktop_Still0_2_1600x.jpg?v=1571852084" playsInline="" muted="" autoplay="" loop="" width="100%">
						<source src={background} type="video/mp4"/>
            
            Your browser does not support the video tag.
					</video>:<img src={background} className={classes.background} width="100%"></img>}
				<div className={classes.slideContent}>
					<h1 style={{color:"white",fontSize: "8vw",
                
						letterSpacing: ".0119em"}}>{title}</h1>
				</div>
			</div>
		</React.Fragment>
	);
}
SlideHero.propTypes={
	title:PropTypes.string.isRequired,
	subtitle:PropTypes.string.isRequired,
	background:PropTypes.string.isRequired,
	type:PropTypes.string.isRequired
};
export default SlideHero;