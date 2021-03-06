import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AccountProfileInfo from "components/AccountProfileInfo";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ChevronRightIcon from "mdi-material-ui/ChevronRight";
import AddressbookIcon from "mdi-material-ui/BookOpen";
import OrderIcon from "mdi-material-ui/Package";
import { useRouter } from "next/router";
import useAuthStore from "hooks/globalStores/useAuthStore";
import Link from "components/Link";
import Router from "translations/i18nRouter";

const useStyles = makeStyles((theme) => ({
	accountProfileInfoContainer: {
		marginBottom: theme.spacing(4)
	}
}));

/**
 * Renders the menu in the profile view
 *
 * @returns {React.Component} The profile view react component
 */
function ProfileMenu() {
	const classes = useStyles();
	const { account } = useAuthStore();
	const { asPath } = useRouter();

	const menuItems = [
		{
			href: "/profile/address",
			route: "/profile/address",
			label: "Libreta de direcciones",
			isSelected: asPath.includes("/profile/address"),
			icon: <AddressbookIcon/>
		},
		{
			href: "/profile/orders",
			route: "/profile/orders",
			label: "Mis ordenes",
			isSelected: asPath.includes("/profile/orders"),
			icon: <OrderIcon/>
		}
	];

	return (
		<section>
			<div className={classes.accountProfileInfoContainer}>
				<AccountProfileInfo 
				shouldShowEditButton
				editAccountButtonText="Editar cuenta"
				onClickEdit={()=>Router.push("/profile/edit")}
				viewer={account} />
			</div>
			<div className={classes.inPageMenuItemLink}>
				<List component="nav">
					{menuItems.map((menuItem, index) => (
						<Link href={menuItem.href} key={menuItem.id || `item-${index}`}>
							<ListItem
								button
								component="a"
								selected={menuItem.isSelected}

							>
								<ListItemIcon>
									{menuItem.icon}
								</ListItemIcon>
								<ListItemText primary={menuItem.label} />
								<ListItemSecondaryAction>
									<ChevronRightIcon />
								</ListItemSecondaryAction>
							</ListItem>
						</Link>
					))}
				</List>
			</div>
		</section>
	);
}

ProfileMenu.propTypes = {
	router: PropTypes.object.isRequired
};

export default ProfileMenu;
