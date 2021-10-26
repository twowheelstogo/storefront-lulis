import React, { Component, Fragment } from "react";
import { withComponents } from "@reactioncommerce/components-context";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
const Items = styled.div`
    display: flex;
    flex-direction:column;
    gap: 20px;
`;
const CustomText2 = styled.div`
    font-size: 24px;
    color: #B8BCCA;
`;
class SearchProductListDesktop extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		components: PropTypes.shape({
			HorizontalProductCard: CustomPropTypes.component.isRequired
		})
	}
	render() {
		const {
			items,
			components: { HorizontalProductCard },
			addItemsToCart,
			onChangeCartItemsQuantity,
			cart,
			addOrCreateCartLoading,
			currencyCode,
			uiStore
		} = this.props;
		return (
			<Items>
				<CustomText2>{`${items.length} coincidencia${items.length == 1 ? "" : "s"}`}</CustomText2>
				{(items || []).map((item) => {
					const productInCart = (cart?.items || []).find((cartItem) => cartItem.productSlug == item.slug);
					return {
						...item,
						cartItem: productInCart
					};
				})
					.map((item) => (
						<HorizontalProductCard
							addOrCreateCartLoading={addOrCreateCartLoading}
							currencyCode={currencyCode}
							product={item}
							uiStore={uiStore}
							addItemsToCart={addItemsToCart}
							onChangeCartItemsQuantity={onChangeCartItemsQuantity}
						/>
					))}
			</Items>
		);
	}
}
export default withComponents(SearchProductListDesktop);