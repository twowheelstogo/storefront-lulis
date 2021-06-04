import React from "react";
import {makeStyles,} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    videoPlayer:{
        position:'absolute',
        objectFit:'cover',
        width:'100%',
        height:'100%',
        zIndex:0,
        top:0,
        left:0,
        bottom:0,
        right:0,
    },
    slideContent:{
        zIndex:200,
        margin:'auto',
        padding:'0 15px',
        position:'relative'
    },
    hero:{
        position:'relative',
        overflow:'hidden',
        top:0,
        left:0,
        width:'auto',
        margin:0,
        height:'80vh',
        display:'flex'
    }
}));
function SlideHero(props){
    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.hero}>
            <video id="video-player" className={classes.videoPlayer} poster="//cdn.shopify.com/s/files/1/0100/4575/1377/files/Homepage_Desktop_Still0_2_1600x.jpg?v=1571852084" playsInline="" muted="" autoplay="" loop="" width="100%">
                <source src="https://cdn.shopify.com/s/files/1/0253/7442/5166/files/LB_Homepage_Cookie_Break.mp4?14611" type="video/mp4"/>
                
                Your browser does not support the video tag.
                </video>
                <div className={classes.slideContent}>
                <h1 style={{color:"white",fontSize: '10.25rem',
                
                letterSpacing: '.0119em'}}>YUM NOM NOM :)</h1>
                </div>
            </div>
        </React.Fragment>
    );
}
export default SlideHero;