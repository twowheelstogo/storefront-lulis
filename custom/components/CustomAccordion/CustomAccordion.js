import React,{useState} from "react";
import PropTypes from "prop-types";
import {makeStyles,IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove"
const useStyles = makeStyles((theme)=>({
    root:{

    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottom:'1px solid rgba(207,178,160,.2)',
        padding:'10px 0'
    },
    content:{
    },
    question:{
        borderBottom:'1px solid rgba(207,178,160,.2)',
        padding:'10px 0'
    },
    icon:{

    },
    title:{
        color:'#84C7D9'
    },
    subtitle:{
        color:'#84C7D9'
    },
    bodytext:{
        color:'7A6240'
    }
}))
const CustomAccordion = (props)=>{
    const classes = useStyles();
    const {id,name,items} = props;
    const [open,setOpen] = useState(false);
    const changeState =()=>{
        setOpen(!open);
    }
    return(
        <React.Fragment>
            {/**Header of Accordion */}
            <div className={classes.header}>
            <h1 className={classes.title}>{name}</h1>
            <IconButton onClick={changeState}>
                {!open?<AddIcon/>:<RemoveIcon/>}
            </IconButton>
            </div>
            {/* Expandable content of Accordion */}
            {open &&(
                <div className={classes.content}>
                {items.map(item=>{
                    return <div className={classes.question}>
                        <h4 className={classes.subtitle}>{item.title}</h4>
                        <p className={classes.bodytext}>{item.body}</p>
                    </div>
                })}
            </div>
            )}
        </React.Fragment>
    );
}
CustomAccordion.PropTypes={
    id:PropTypes.string,
    name:PropTypes.string,
    items:PropTypes.array
}
export default CustomAccordion;