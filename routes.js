const routes = require("next-routes")();

routes
	.add("contactUs", "/contactUs", "contactUs")
	.add("lulisCare", "/lulisCare", "lulisCare")
	.add("store", "/store", "store")
	.add("cart", "/cart", "cart")
	.add("checkout", "/cart/checkout", "checkout")
	.add("checkoutLogin", "/cart/login", "checkout")
	.add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
	.add("login", "/login", "login")
	.add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
	.add("product", "/product/:slugOrId/:variantId?", "product")
	.add("shop", "/shop/:shopId/:tag", "productGrid")
	.add("tag", "/tag/:slug", "tag");

module.exports = routes;