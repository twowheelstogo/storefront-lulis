import useUIStore from "hooks/globalStores/useUIStore";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useCartStore from "hooks/globalStores/useCartStore";
import useRoutingStore from "hooks/globalStores/useRoutingStore";
import useSlugStore from "hooks/globalStores/useSlugStore";
/**
 * Get the UI stores
 *
 * @returns {Object} the UI stores
 */
export default function useStores() {
	const authStore = useAuthStore();
	const cartStore = useCartStore();
	const routingStore = useRoutingStore();
	const uiStore = useUIStore();
	const slugStore = useSlugStore()
	return { uiStore, routingStore, authStore, cartStore, slugStore };
}
