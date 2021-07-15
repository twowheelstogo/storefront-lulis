import React,{Component,Fragment} from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-start;
    align-items: flex-end;
`;
const CustomRoundedButton = styled.div`
    width: auto;
    text-align: center;
    min-height: 34px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    background: #F4F1F1;
    border-radius: 14px;
    padding-left: 10px;
    padding-right: 10px;
    color:black;
    cursor: pointer;
    &:hover{
        color:white;
        background: #DCDCDC
    }
`;
const CustomButtonText = styled.div`
    font-size: 16px;
    font-height: 400;
`;
const Controls = (props) => {
    const {menuOpen,handleClose,handleOpen} = props;

        return(
            <div>
                <IconButton 
                onClick={handleOpen} 
                aria-controls="opt-menu" 
                aria-haspopup="true">
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                id="opt-menu"
                keepMounted
                anchorEl={menuOpen}
                open={Boolean(menuOpen)}
                onClose={handleClose}>
                    <MenuItem>Editar</MenuItem>
                    <MenuItem>Eliminar</MenuItem>
                </Menu>
            </div>
        );
}
class AddressList extends Component{
    constructor(props){
        super(props);
        this.state ={
            menuOpen:null
        }
    }
    handleOpen =(event)=>{
        console.log("currentTarget: ",event.currentTarget)
        this.setState({
            menuOpen:event.currentTarget
        })
    }   
    handleClose = () => {
        this.setState({
            menuOpen:null
        })
    }
    render(){
        const {account:{addressBook},components:{RadioButtonItem}} = this.props;
        return(
            <Items>
                {([{},{}]).map((address)=>(
                    <RadioButtonItem 
                    title="Casa"
                    description="7av 8-68 zona 9, Guatemala, Guatemala"
                    trailing={<Controls/>}
                    trailingProps={{
                        menuOpen:this.state.menuOpen,
                        handleOpen:this.handleOpen,
                        handleClose:this.handleClose
                    }}
                    handleChange={()=>{}}
                    />
                ))}
                <CustomRoundedButton>
                    <CustomButtonText>{"Agregar otra dirección"}</CustomButtonText>
                    <AddIcon/>
                </CustomRoundedButton>
            </Items>
        );
    }
}
export default withComponents(AddressList);