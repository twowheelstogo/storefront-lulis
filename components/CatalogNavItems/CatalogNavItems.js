import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {AppBar} from "@material-ui/core";
const styles = (theme) => ({
    root:{
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
        padding:'15px',
        overflowY:'scroll',
        scrollbarWidth:'none'
    },
    items:{
        display:'flex',
        flexDirection:'row',
    }
})
const itemStyles = (theme) =>({
    root:{
        
    },
    unselected:{
        color:theme.palette.secondary.main,
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
        background:theme.palette.secondary.light,
        borderRadius:'10px'
    },
    selected:{
        color:theme.palette.secondary.main,
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
        background:theme.palette.secondary.main,
        borderRadius:'10px'
    }
})
const CatalogNavItems = (props) => {
    const {classes,tags} = props;
    return (
        <div className={classes.root}>
        <div className={classes.items}>
        {Array.from(new Array(20)).map((item)=><CatalogItem/>)}
        </div>
    </div>
    );
}
const CatalogItem = withStyles(itemStyles)((props) =>{
    const {classes} = props;
    return(
        <div>
            <div className={classes.unselected}>
            item
        </div>
        </div>
    );
})
export default withStyles(styles)(CatalogNavItems);