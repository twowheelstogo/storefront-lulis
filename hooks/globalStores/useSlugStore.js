import { useContext } from "react";
import { SlugContext } from "context/SlugContext";

/**
 * Gets the UI store React context
 *
 * @returns {Object} React context for UI store
 */
export default function useSlugStore() {
	const ctx = useContext(SlugContext);
	return ctx;
}
