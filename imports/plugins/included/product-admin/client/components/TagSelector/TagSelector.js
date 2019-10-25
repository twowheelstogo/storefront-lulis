import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import i18next from "i18next"
import CloseIcon from "mdi-material-ui/Close";
import Select from "@reactioncommerce/catalyst/Select";
import SplitButton from "@reactioncommerce/catalyst/SplitButton";
import { useApolloClient } from "@apollo/react-hooks";
import { useSnackbar } from "notistack"
import {
  Grid,
  Card as MuiCard,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { getTags } from "./helpers";
import { ADD_TAGS_TO_PRODUCTS, REMOVE_TAGS_FROM_PRODUCTS } from "./mutations";


const ACTION_OPTIONS = [{
  label: "Add tags to products",
  type: "ADD"
}, {
  label: "Remove tags from products",
  isDestructive: true,
  type: "REMOVE"
}];

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    overflow: "visible",
    padding: theme.spacing(2)
  },
  cardContainer: {
    alignItems: "center"
  },
  cardActions: {
    padding: theme.spacing(2),
    justifyContent: "flex-end"
  },
  hidden: {
    display: "none"
  },
  visible: {
    display: "block"
  }
}));

/**
 * TagSelector component
 * @param {Object} props Component props
 * @returns {React.Component} A React component
 */
function TagSelector({ isVisible, selectedProductIds, setVisibility }) {
  const apolloClient = useApolloClient();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  /**
   *
   * @param {Object} option The selected action option
   * @param {Integer} index The index of the selected action option
   * @returns {undefined} undefined
   */
  async function handleTagsAction(option) {
    const tagIds = selectedTags && selectedTags.map(({ value }) => (value));

    // Prevent user from executing action if he/she has not // yet selected at least one tag
    if (!tagIds.length) {
      return enqueueSnackbar(i18next.t("admin.addRemoveTags.invalidSelection"), { variant: "warning" });
    }

    let mutationName;
    let data; let loading; let error;
    setIsLoading(true);
    switch (option.type) {
      case "ADD":
        mutationName = "addTagsToProducts";
        ({ data, loading, error } = await apolloClient.mutate({
          mutation: ADD_TAGS_TO_PRODUCTS,
          variables: {
            input: {
              productIds: selectedProductIds,
              tagIds
            }
          }
        }));

        setIsLoading(loading);
        break;
      case "REMOVE":
        mutationName = "removeTagsFromProducts";
        ({ data, loading, error } = await apolloClient.mutate({
          mutation: REMOVE_TAGS_FROM_PRODUCTS,
          variables: {
            input: {
              productIds: selectedProductIds,
              tagIds
            }
          }
        }));

        setIsLoading(loading);
        break;
    }

    if (data && data[mutationName]) {
      // Notify user of performed action
      if (mutationName.startsWith("add")) {
        enqueueSnackbar(i18next.t("admin.addRemoveTags.addConfirmation"))
      } else {
        enqueueSnackbar(i18next.t("admin.addRemoveTags.removeConfirmation"))
      }
    }

    if (error) {
      enqueueSnackbar(i18next.t("admin.addRemoveTags.errorMessage"), { variant: "error" });
    }

    setVisibility(false);
    setSelectedTags([]);
  }

  return (
    <Fragment>
      {isVisible &&
        <Grid item sm={12} >
          <MuiCard classes={{ root: classes.cardRoot }}>
            <CardHeader
              action={
                <IconButton aria-label="close" onClick={() => setVisibility(false)}>
                  <CloseIcon />
                </IconButton>
              }
              title={i18next.t("admin.addRemoveTags.title")}
            />
            <CardContent>
              <Grid container spacing={1} className={classes.cardContainer}>
                <Grid item sm={12}>
                  <Select
                    cacheOptions
                    defaultOptions
                    isAsync
                    isMulti
                    loadOptions={(query) => getTags(apolloClient, query)}
                    onSelection={(tags) => setSelectedTags(tags)}
                    placeholder={i18next.t("admin.addRemoveTags.inputPlaceholder")}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <SplitButton
                color="primary"
                options={ACTION_OPTIONS}
                onClick={handleTagsAction}
                isWaiting={isLoading}
              />
            </CardActions>
          </MuiCard>
        </Grid>
      }
    </Fragment>
  );
}

TagSelector.propTypes = {
  isVisible: PropTypes.bool,
  selectedProductIds: PropTypes.array,
  setVisibility: PropTypes.func
};

export default TagSelector;

