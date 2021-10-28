import React, { Fragment } from "react";
import CategoryTabs from "custom/components/CategoryTabs";
import PropTypes from "prop-types";
const HomePage = props => {
	const {
		catalogItems,
		currencyCode,
		isLoadingCatalogItems,
		tags,
		cart,
		addOrCreateCartLoading,
		addItemsToCart,
		onChangeCartItemsQuantity
	} = props;

	return (
		<Fragment>
			<CategoryTabs
				catalogItems={catalogItems}
				currencyCode={currencyCode}
				isLoadingCatalogItems={isLoadingCatalogItems}
				tags={tags}
				cart={cart}
				addOrCreateCartLoading={addOrCreateCartLoading}
				addItemsToCart={addItemsToCart}
				onChangeCartItemsQuantity={onChangeCartItemsQuantity}
			/>

		</Fragment>
	);
};
HomePage.propTypes = {
	catalogItems: PropTypes.array,
	currencyCode: PropTypes.string,
	isLoadingCatalogItems: PropTypes.bool,
	tags: PropTypes.array,
	addItemsToCart: PropTypes.func.isRequired,
	onChangeCartItemsQuantity: PropTypes.func.isRequired
};

export default HomePage;
