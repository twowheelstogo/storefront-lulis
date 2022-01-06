import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext();

const initialState = {
  branches: [],
  branch: { generalData: { name: 'No hay sucursal seleccionada' }}
};

export const ShopProvider = ({ shop, children }) => {
  const [branch, setBranch] = useState(initialState.branch);
  const [branches, setBranches] = useState(initialState.branches);
	const shopData = { ...shop, shopState: { branch, setBranch, branches, setBranches } };
  return <ShopContext.Provider value={shopData}>
		{children}
	</ShopContext.Provider>
};

ShopProvider.propTypes = {
	children: PropTypes.node,
	shop: PropTypes.object
};
