import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";
import CheckoutCartItem from "components/CheckoutCartItem";

const styles = (theme) => ({
	fulfillmentGroup: {
	},
	fulfillmentGroupDetails: {
		padding: theme.spacing(2)
	},
	fulfillmentGroupCount: theme.typography.subtitle2,
	fulfillmentGroupHeader: {
		borderBottom: theme.palette.borders.default,
		borderTop: theme.palette.borders.default,
		padding: theme.spacing(1, 2)
	},
	fulfillmentGroupHeaderRightColumn: {
		textAlign: "right"
	},
	trackShipmentButton: {
		textTransform: "none"
	}
});

class OrderCardFulfillmentGroup extends Component {
  static propTypes = {
  	classes: PropTypes.object,
  	currentGroupCount: PropTypes.number,
  	fulfillmentGroup: PropTypes.shape({
  		items: PropTypes.shape({
  			nodes: PropTypes.arrayOf(PropTypes.object)
  		}),
  		data: PropTypes.shape({
  			shippingAddress: PropTypes.object
  		})
  	}),
  	hasMoreCartItems: PropTypes.bool,
  	loadMoreCartItems: PropTypes.func,
  	onChangeCartItemsQuantity: PropTypes.func,
  	onRemoveCartItems: PropTypes.func,
  	payments: PropTypes.arrayOf(PropTypes.object),
  	totalGroupsCount: PropTypes.number
  }

  static defaultProps = {
  	hasMoreCartItems: false,
  	loadMoreCartItems() { },
  	onChangeCartItemsQuantity() { },
  	onRemoveCartItems() { }
  }

  handleItemQuantityChange = (quantity, cartItemId) => {
  	const { onChangeCartItemsQuantity } = this.props;

  	onChangeCartItemsQuantity({ quantity, cartItemId });
  }

  handleRemoveItem = (_id) => {
  	const { onRemoveCartItems } = this.props;

  	onRemoveCartItems(_id);
  }

  renderItems() {
  	const { classes, fulfillmentGroup } = this.props;

  	if (fulfillmentGroup && Array.isArray(fulfillmentGroup.items.nodes)) {
  		const items = fulfillmentGroup.items.nodes.map((item) => ({
  			...item,
  			// Backwards compatibility until all component library components are updated
  			// to accept `inventoryAvailableToSell`.
  			currentQuantity: item.currentQuantity || item.inventoryAvailableToSell
  		}));

  		return (
  			<Grid className={classes.fulfillmentGroupDetails} item xs={12} md={12}>
  				<CartItems
  					isMiniCart
  					isReadOnly
  					items={items}
  					components={{
  						CustomCartItem:(cartItemProps)=>(
  							<CheckoutCartItem {...cartItemProps}/>
  						)
  					}}
  				/>
  			</Grid>
  		);
  	}

  	return null;
  }

  onTrackShipmentButtonClick() {
  	// TODO: What do we do to track a shipment? Link to a specific provider website?
  }

  render() {
  	const { classes, currentGroupCount, fulfillmentGroup, totalGroupsCount } = this.props;

  	return (
  		<Fragment>
  			<section className={classes.fulfillmentGroup}>
  				<header className={classes.fulfillmentGroupHeader}>
  					<Grid
  						container
  						direction="row"
  						justify="center"
  						alignItems="center"
  						spacing={3}
  					>
  						<Grid item xs={6}>
  							<Typography className={classes.fulfillmentGroupCount} variant="subtitle1">Env??os {currentGroupCount} de {totalGroupsCount}</Typography>
  						</Grid>
  						<Grid item xs={6} className={classes.fulfillmentGroupHeaderRightColumn}>
  							{fulfillmentGroup.tracking ?
  								<Button
  									className={classes.trackShipmentButton}
  									onClick={this.onTrackShipmentButtonClick}
  									size="small"
  									variant="outlined"
  								>
                    Seguimiento del env??o
  								</Button>
  								:
  								<Button
  									className={classes.trackShipmentButton}
  									disabled
  									size="small"
  									variant="outlined"
  								>
                    Sin seguimiento
  								</Button>
  							}
  						</Grid>
  					</Grid>
  				</header>
  				{this.renderItems()}
  			</section>
  		</Fragment>
  	);
  }
}

export default withStyles(styles)(OrderCardFulfillmentGroup);
