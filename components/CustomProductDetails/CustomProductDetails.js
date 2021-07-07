import React from "react";
import {Grid,IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RelatedProducts from "components/RelatedProducts";
import RoundedButton from "components/RoundedButton";
const styles = (theme) => ({
    root:{
        paddingTop:theme.spacing(10),
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
    },
    image:{
        margin:'auto',
        display:'block'
    },
    content:{
        width:'100%',
        // background:'red',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    headerContent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'auto',
        marginBottom:'auto',
        alignItems:'center'
    },
    title: theme.typography.title2,
    subtitle:theme.typography.subtitle3,
    favoriteIcon:{
        color:theme.palette.primary.main
    },
    description:{
        fontSize:'16px',
        color:'black'
    },
    controls:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"flex-end",
        gap:'10px',
        alignItems:'center'
    },
    centerControls:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:'10px',
        alignItems:'center',
        paddingTop:theme.spacing(2)
    },
    removeButton:{
        background:theme.palette.primary.main,
        color:'white',
        borderRadius:'10px',
        width:'36px',
        height:'36px'

    },
    addButon:{
        background:theme.palette.secondary.light,
        color:'white',
        borderRadius:'10px',
        width:'36px',
        height:'36px'
    },
    bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        width:'100%',
        // background:'green'
    }
});
const CustomProductDetails = props => {
    const theme = useTheme();
    const matches= useMediaQuery(theme.breakpoints.down("sm"));
    const {classes,product} = props
    return(
        <React.Fragment>
            <div className={classes.root}>
            <Grid container>
                <Grid item lg={6} xs={12}>
                    <div>
                        <img src={product.primaryImage.URLs.medium} width={"70%"} className={classes.image}/>
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className={classes.content}>
                        <div>
                        <div className={classes.headerContent}>
                        <div className={classes.title}>{product.title}</div>
                        <IconButton>
                        <FavoriteIcon className={classes.favoriteIcon}/>
                        </IconButton>
                        </div>
                        <div className={classes.subtitle}>{product.pricing[0].displayPrice}</div>
                        <br></br>
                        <div className={classes.description}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at diam lectus. Nullam ultricies metus nec turpis aliquet ullamcorper. Aenean dolor justo, imperdiet nec ligula ut, cursus porta lacus. Donec eu ornare velit. Fusce sit amet ipsum sit amet odio mollis rhoncus eget nec justo. Aenean facilisis ullamcorper sodales. Pellentesque pretium at risus in tincidunt. Vestibulum est felis, malesuada sed odio vitae, rhoncus bibendum mi. Sed vitae egestas lectus. Fusce vel fermentum metus. "}</div>
                        </div>
                        <br></br>
                        <div className={!matches?classes.controls:classes.centerControls}>
                            <IconButton className={classes.removeButton}>
                                <RemoveIcon/>
                            </IconButton>
                            <div className={classes.title}>2</div>
                            <IconButton className={classes.addButon}>
                                <AddIcon/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <RelatedProducts/>
                </Grid>
                <div className={classes.bottom}>
                <Grid
                    item
                    xs={12}
                    lg={4}>
                    <br></br>
                    <br></br>
                        <RoundedButton/>
                    </Grid>
                </div>
            </Grid>
            </div>
        </React.Fragment>
    );
}
export default withStyles(styles)(CustomProductDetails);