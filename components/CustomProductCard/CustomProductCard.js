import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {Add as AddIcon, Remove as RemoveIcon} from "@material-ui/icons"
const StyledContent = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;
const StyledTitle = styled.div`
font-size:18px;
font-weight:700;
color:#000025;
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;
const styles = (theme) => ({
    root:{
        background:theme.palette.background.cards,
        width: 'auto',
        height:'auto',
        borderRadius:'14px',
        padding:theme.spacing(1),
        textAlign:'center'
    },
    image:{
        borderRadius:'10px',
    },
    title:theme.typography.title1,
    subtitle:{
        fontSize: 14,
        fontWeight:300,
        color: "#7A6240",
        background:'red',
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'start'
    }

});
const CustomProductCard = props => {
    const {product,classes} = props;
    return(
        <React.Fragment>
            <div className={classes.root}>
            <div className={classes.header}>
            <IconButton size="small" color="primary">
            <RemoveIcon/>
            </IconButton>
            <img className={classes.image} src={product.primaryImage.URLs.small} width={75} height={75}/>
            <IconButton size="small" color="primary">
            <AddIcon/>
            </IconButton>
            </div>
                <StyledTitle>{product.title}</StyledTitle>
                <StyledContent>{product.description}</StyledContent>
                <StyledTitle>{product.pricing[0].displayPrice}</StyledTitle>
            </div>
        </React.Fragment>
    );
}

export default withStyles(styles)(CustomProductCard);