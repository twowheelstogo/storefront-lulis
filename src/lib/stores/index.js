import { autorun, configure } from "mobx";
import { ExecutionEnv } from "lib/utils/executionEnv";
import AuthStore from "./AuthStore";
import RoutingStore from "./RoutingStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

const authStore = new AuthStore("meteorToken");
const keycloakAuthStore = new AuthStore("keycloakToken");
const routingStore = new RoutingStore();
const uiStore = new UIStore();

autorun(() => {
  // Execute only in browser.
  if (ExecutionEnv.canUseDOM) {
    const { query } = routingStore;
    if (query && query.limit) {
      uiStore.setPageSize(parseInt(query.limit, 10));
    }

    if (query && query.sortby) {
      uiStore.setSortBy(query.sortby);
    }
  }
});

export default {
  authStore,
  keycloakAuthStore,
  routingStore,
  uiStore
};