import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RenderMedia from "./RenderMedia";
import { isEmpty } from "lodash";

const styles = (theme) => ({
  extraEmphasisText: {
    fontWeight: theme.typography.fontWeightSemiBold
  }
});

const buildMedia = (urls) => [{
  URLs: urls
}];

const cleanedMetafields = (metafields) => {
  const items = [];
  (metafields || []).forEach((item, index) => {
      const bundleItems = JSON.parse(item.value) || [];
      bundleItems.forEach((bundleItem) => {
          items.push({
              ...bundleItem,
              boxId: index + 1
          });
      });
  });

  return items.map((item, index) => ({
      name: index,
      value: `box #${item.boxId}: ${item.title} (${item.quantity})`
  }));
};

const renderSubItems = (items) => {

  return cleanedMetafields(items).map((item)=> (<Typography variant="body2">{item.value}</Typography>))
}

class OrderCardFulfillmentGroupItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    item: PropTypes.shape({
      productTags: PropTypes.any,
      price: PropTypes.shape({
        displayAmount: PropTypes.string.isRequired
      }).isRequired,
      productVendor: PropTypes.string,
      quantity: PropTypes.number.isRequired,
      subtotal: PropTypes.shape({
        displayAmount: PropTypes.string.isRequired
      }).isRequired,
      title: PropTypes.string,
      variantTitle: PropTypes.string.isRequired
    }).isRequired
  };


  render() {
    const { classes, item } = this.props;
    const { price, productVendor, quantity, subtotal, title, variantTitle, imageURLs, productTags, metafields } = item;
    const tag = Array.isArray(productTags.nodes) && productTags.nodes[0].displayTitle;
    console.log(item);
    return (
      <Grid container>
        <Grid item xs={2} md={2}>
          <RenderMedia media={buildMedia(imageURLs)} />
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid item xs={12} md={12}>
            <Typography paragraph variant="h4">
              {title}
            </Typography>
            <Typography variant="body2">
              {variantTitle}
            </Typography>
            <Typography variant="body2">
              {"Categoría: " + tag}
            </Typography>
            <Typography variant="body2">
              Quantity: {quantity}
            </Typography>
            {!isEmpty(metafields) && (
              <div>
              <Typography variant="h4">{"items del bundle:"}</Typography>
      <hr></hr>
              <div>{renderSubItems(metafields)}</div>
            </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={4} md={4}>
          <Grid item xs={12} md={12}>
            <Typography paragraph variant="h4" align="right">
              {price.displayAmount}
            </Typography>
            <Typography variant="body1" align="right">
              Total({quantity}):&nbsp; <span className={classes.extraEmphasisText}>{subtotal.displayAmount}</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { name: "OrderCardFulfillmentGroupItem" })(OrderCardFulfillmentGroupItem);
