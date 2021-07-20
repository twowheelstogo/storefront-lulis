import React,{Component,Fragment, useState} from "react";
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
    const {id} = props;
    const [state,setState] = useState({
        menuOpen:null
    })
    const handleOpen =(event)=>{
        setState({
            menuOpen:event.currentTarget
        })
    }   
    const handleClose = () => {
        setState({
            menuOpen:null
        })
    }
    const editAddress = () => {
        let href = window.location.href;
        window.location.href = `${origin}/en/address/${id}?redirect=${encodeURIComponent(href)}`;
    }
        return(
            <div>
                <IconButton 
                onClick={handleOpen} 
                aria-controls={id}
                aria-haspopup="true">
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                id={id}
                keepMounted
                anchorEl={state.menuOpen}
                open={Boolean(state.menuOpen)}
                onClose={handleClose}>
                    <MenuItem onClick={editAddress}>Editar</MenuItem>
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
        this.setState({
            menuOpen:event.currentTarget
        })
    }   
    handleClose = () => {
        this.setState({
            menuOpen:null
        })
    }
    createAddress = () => {
        let href = window.location.href;
        window.location.href = `${origin}/en/address?redirect=${encodeURIComponent(href)}`;
    }
    render(){
        const {account:{addressBook},components:{RadioButtonItem}} = this.props;
        return(
            <Items>
                {addressBook.map(({
                    _id,
                    description,
                    address,
                    reference,
                })=>(
                    <RadioButtonItem 
                    title={description}
                    description={address}
                    trailing={
                    <Controls
                    id= {_id}
                     />}
                    trailingProps={{
                        menuOpen:this.state.menuOpen,
                        handleOpen:this.handleOpen,
                        handleClose:this.handleClose
                    }}
                    handleChange={()=>{}}
                    />
                ))}
                <CustomRoundedButton onClick={this.createAddress}>
                    <CustomButtonText>{"Agregar otra dirección"}</CustomButtonText>
                    <AddIcon/>
                </CustomRoundedButton>
            </Items>
        );
    }
}
export default withComponents(AddressList);