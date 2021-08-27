import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Badge, IconButton } from "@material-ui/core";
import Link from "components/Link";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";

const StyledContent = styled.div`
display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  font-size: 14px;
  font-weight:300;
  color: "#7A6240";
`;

const StyledTitle = styled.div`
font-size:18px;
font-weight:700;
color:#000000;
display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
`;

const styles = (theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        background: theme.palette.background.cards,
        padding: "10px",
        borderRadius: "10px",
    },
    leading: {
        width: "50",
        height: "auto"
    },
    content: {
        width: "100%",
        paddingLeft: "5px",
        paddingRight: "5px",
    },
    trailing: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        marginRight: "0",
        marginLeft: "auto",
    },
    image: {
        borderRadius: "10px"
    },
    title: theme.typography.title1,
    subtitle: {
        fontSize: 14,
        fontWeight: 300,
        color: "#7A6240",
        background: "red",
    },
    controls: {
        display: "flex",
        flexDirection: "row",
    },
    badge: {
        width: 20,
        height: 20,
        top: 0,
        right: 0,
        backgroundColor: theme.palette.reaction.badges.product,
        color: theme.palette.primary.main
    }
});

const HorizontalBundleItemCard = (props) => {
    const {
        product,
        classes,
        handleChange,
        disabled
    } = props;

    const { slug } = product;
    const hostname = process.browser && (window.location.hostname != "localhost" ? "https://api.qbit01.com" : "http://localhost:3000");
    const media = (process.browser && product.media && product.media.length > 0 && product.media[0].URLs) ? `${hostname}${product.media[0].URLs.small.replace("jpg", "png")}` : `${hostname}/resources/placeholder.gif`;

    return (
        <React.Fragment>
            <Badge badgeContent={(product.quantity && product.quantity) || 0}
                classes={{ badge: classes.badge }}>
                <div className={classes.root}>
                    <div className={classes.leading}>
                        <img className={classes.image} src={media} width={95} height={95} />
                    </div>
                    <div className={classes.content}>
                        <Link
                            href="/product/[...slugOrId]"
                            as={`/product/${slug}`}>
                            <StyledTitle>{product.title}</StyledTitle>
                            <StyledContent>{product.description}</StyledContent>
                        </Link>
                    </div>
                    <div className={classes.trailing}>
                        <div className={classes.controls}>
                            <IconButton size="small" color="primary" disabled={(product.quantity == undefined || product.quantity == 0)} onClick={() => { handleChange(product, -1) }}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton size="small" color="primary" disabled={disabled} onClick={() => { handleChange(product, 1) }}>
                                <AddIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div></div>
                </div>
            </Badge>
        </React.Fragment>
    );
}

export default withStyles(styles)(HorizontalBundleItemCard);
