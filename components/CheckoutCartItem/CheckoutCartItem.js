import React,{Component} from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root:{
        padding:theme.spacing(0)
    },
    image:{
        borderRadius: '10px'
    }
});
const Item = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    border-radius: 10px;
`;
const ItemBody = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
`;
const ItemActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const ItemLeading = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const ItemTrailing = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 0;
    margin-left: auto;
    width: 100px;
    align-items: flex-end;
`;
const ItemTitle = styled.div`
font-size:16px;
font-weight:700;
color:#000025;
`;
const ItemSubtitle = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#000025";
`;
const ItemContent = styled.div`
    width: 250px;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
class CheckoutCartItem extends Component{
    render(){
        const {classes} = this.props;
        return(
            <React.Fragment>
                <Item className={classes.root}>
                    <ItemBody>
                        <ItemLeading>
                        <img className={classes.image} src={imageUrl} width={70} height={70}></img>
                        </ItemLeading>
                        <ItemContent>
                            <ItemTitle>{"6 mini chocochip"}</ItemTitle>
                            <ItemSubtitle>{"2 x Q15.00"}</ItemSubtitle>
                        </ItemContent>
                        <ItemTrailing>
                            <ItemTitle>{"Q30.00"}</ItemTitle>
                        </ItemTrailing>
                    </ItemBody>
                </Item>
            </React.Fragment>
        );
    }
}
const imageUrl = "http://localhost:3000/assets/files/Media/BZWZs8T8eXBK3Zwou/large/Empanada dip alcachofa 1.jpg";
export default withStyles(styles)(CheckoutCartItem);