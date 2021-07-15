import React,{Component,Fragment} from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-start;
    align-items: flex-start;
`;
class AddressList extends Component{
    constructor(props){
        super(props);
        this.state ={
            menuOpen:null
        }
    }
    handleOpen(){
        this.setState({
            menuOpen:true
        })
    }   
    handleClose(){
        this.setState({
            menuOpen:null
        })
    }
    renderControls(address){
        return(
            <div>
                <IconButton onClick={this.handleOpen}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                id="opt-menu"
                keepMounted
                anchorEl={menuOpen}
                open={Boolean(menuOpen)}
                onClose={this.handleClose}>
                    <MenuItem>Editar</MenuItem>
                    <MenuItem>Eliminar</MenuItem>
                </Menu>
            </div>
        );
    }
    render(){
        const {account:{addressBook},components:{RadioButtonItem}} = this.props;
        return(
            <Items>
                {addressBook.map((address)=>(
                    <RadioButtonItem 
                    title="Casa"
                    description="test"
                    trailing={this.renderControls()}
                    handleChange={()=>{}}
                    />
                ))}
            </Items>
        );
    }
}
export default withComponents(AddressList);