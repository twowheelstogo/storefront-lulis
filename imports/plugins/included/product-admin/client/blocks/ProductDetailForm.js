import React, { useState, useEffect } from "react";
import i18next from "i18next";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import useReactoForm from "reacto-form/cjs/useReactoForm";
import SimpleSchema from "simpl-schema";
import muiOptions from "reacto-form/cjs/muiOptions";
import muiCheckboxOptions from "reacto-form/cjs/muiCheckboxOptions";
import CountryOptions from "@reactioncommerce/api-utils/CountryOptions.js";
import { TextField, useConfirmDialog } from "@reactioncommerce/catalyst";
import useGenerateSitemaps from "/imports/plugins/included/sitemap-generator/client/hooks/useGenerateSitemaps";
import useProduct from "../hooks/useProduct";
import {ProductService, CategoryService} from '../services';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(4),
    minWidth: 350
  }
}));

const formSchema = new SimpleSchema({
  title: {
    type: String,
    optional: false
  },
  permalink: {
    type: String,
    optional: true
  },
  pageTitle: {
    type: String,
    optional: true
  },
  vendor: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  originCountry: {
    type: String,
    optional: true
  },
  shouldAppearInSitemap: {
    type: Boolean,
    optional: true,
  },
  odooProduct:{
    type: Number,
    optional: true,
    min:1
  },
  categoryProduct:{
    type: Number,
    optional: true,
    min:1
  }
});

const validator = formSchema.getFormValidator();
/**
 * @name ProductDetailForm
 * @param {Object} props Component props
 * @returns {React.Component} Product detail form react component
 */
const ProductDetailForm = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    onUpdateProduct,
    product,
    shopId
  } = useProduct();
  const [categorySelected, setCategorySelected] = useState(0);
  const [productSelected, setProductSelected] = useState(0);
  const {categories} = CategoryService.useFetch(product);
  const {products} = ProductService.useFetch(product, categorySelected);
  const [_title, set_title] = useState("");
  useEffect(()=>{
    if(product){
      set_title(product.title);
      setCategorySelected(product.categoryProduct);
      setProductSelected(product.odooProduct);
    }
  },[product])
  const { generateSitemaps } = useGenerateSitemaps(shopId);
  const {
    openDialog: openGenerateSitemapsConfirmDialog,
    ConfirmDialog: GenerateSitemapsConfirmDialog
  } = useConfirmDialog({
    title: i18next.t("productDetailEdit.refreshSitemap", { defaultValue: "Refresh sitemap now?" }),
    cancelActionText: i18next.t("productDetailEdit.refreshSitemapNo", { defaultValue: "No, don't refresh" }),
    confirmActionText: i18next.t("productDetailEdit.refreshSitemapYes", { defaultValue: "Yes, refresh" }),
    onConfirm: () => {
      generateSitemaps();
    }
  });


  let content;

  const setMyProduct = (myProduct) =>{
    if(myProduct){
      let tmpSlug = myProduct.slug;
      tmpSlug = tmpSlug.split("_");
      if(tmpSlug.length > 1){
        tmpSlug = tmpSlug[1].split('-');
        if(tmpSlug.length > 1){
          let tmpSet = products.filter((e) => e.categ_id == tmpSlug[0]);
          tmpSet.push({
            value:"No se ha seleccionado ningún producto",
            key:0,
            categ_id: 0});
          myProduct.odooProduct = +tmpSlug[1];
          myProduct.categoryProduct = +tmpSlug[0];

        }else{
          myProduct.odooProduct = 0;  
          myProduct.categoryProduct = 0;
        }
      }else{
        myProduct.odooProduct = 0;  
        myProduct.categoryProduct = 0;
      }
    }
    return myProduct;
  }
  
  const {
    getFirstErrorMessage,
    getInputProps,
    hasErrors,
    isDirty,
    submitForm
  } = useReactoForm({
    async onSubmit(formData) {
      const shouldConformSitemapGenerate =
        formData.shouldAppearInSitemap !== product.shouldAppearInSitemap
        && formData.isVisible && !formData.isDeleted;

      setIsSubmitting(true);

      let tmpProduct = formSchema.clean(formData);
      delete tmpProduct.odooProduct;
      delete tmpProduct.categoryProduct;
      tmpProduct.slug = formData.title.trim().split(' ').join("-") + `_${formData.categoryProduct}-${formData.odooProduct}`;
      await onUpdateProduct({
        product: tmpProduct
      });

      if (shouldConformSitemapGenerate) {
        openGenerateSitemapsConfirmDialog();
      }

      setIsSubmitting(false);
    },
    onChanging: (formData) => {
      if(formData.categoryProduct !=  categorySelected){
        formData.odooProduct = 0;
        setProductSelected(0);
      }
      
      formData.slug = formData.title.trim().split(' ').join("-") + `_${formData.categoryProduct}-${formData.odooProduct}`;
    },
    validator(formData) {
      return validator(formSchema.clean(formData));
    },
    value: setMyProduct(product)
  });

  const originCountryInputProps = getInputProps("originCountry", muiOptions);

  if (product) {
    const odooProductInputProps = getInputProps("odooProduct", muiOptions);
    const categoryProductInputProps = getInputProps("categoryProduct", {...muiOptions,
      onChangingGetValue: (event) => {
        setCategorySelected(event.target.value);
        setProductSelected(0);
        let tmpSet = products.filter((e) => e.categ_id == event.target.value);
        tmpSet.push({
          value:"No se ha seleccionado ningún producto",
          key:0,
          categ_id: 0});
        //setcategoriesFilter(event.target.value);
        //setProductsTmp(tmpSet);
        return event.target.value}});
    content = (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitForm();
        }}
      >
        <TextField
          className={classes.textField}
          error={hasErrors(["categoryProduct"])}
          fullWidth
          helperText={getFirstErrorMessage(["categoryProduct"])}
          label="Categoría en el sistema de facturación"
          select
          {...categoryProductInputProps}
          value={categoryProductInputProps.value || categorySelected}
        >
          {categories.map((option, i) => (
            <MenuItem key={`odoo-category-${i}`} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.textField}
          error={hasErrors(["odooProduct"])}
          fullWidth
          helperText={getFirstErrorMessage(["odooProduct"])}
          label="Producto en el sistema de facturación"
          select
          {...odooProductInputProps}
          value={odooProductInputProps.value || productSelected}
          disabled={!categoryProductInputProps.value != 0}
        >
          {products.map((option, i) => (
            <MenuItem key={`odoo-product-${i}`} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.textField}
          error={hasErrors(["title"])}
          fullWidth
          helperText={getFirstErrorMessage(["title"])}
          label={i18next.t("productDetailEdit.title")}
          {...getInputProps("title", {...muiOptions,
            onChangingGetValue: (event) => {
              const regexVal = /^[a-zA-Z0-9 ]*$/;
              if(event.target.value.length > 1){
                if(event.target.value[event.target.value.length-1] == " " 
                && event.target.value[event.target.value.length-2] == " "){
                  return _title;
                }
              }else if(event.target.value.length == 1 
                && event.target.value == " " ){
                  return _title;
                }
              if(regexVal.test(event.target.value)){
                set_title(event.target.value);
                return event.target.value;
              }else{
                return _title;
              }
            }})
          }
        />
        <TextField
          className={classes.textField}
          error={hasErrors(["slug"])}
          fullWidth
          helperText={getFirstErrorMessage(["slug"])}
          label={i18next.t("productDetailEdit.parmalink")}
          {...getInputProps("slug", muiOptions)}
          disabled={true}
        />
        <TextField
          className={classes.textField}
          error={hasErrors(["pageTitle"])}
          fullWidth
          helperText={getFirstErrorMessage(["pageTitle"])}
          label={i18next.t("productDetailEdit.pageTitle")}
          {...getInputProps("pageTitle", muiOptions)}
        />
        <TextField
          className={classes.textField}
          error={hasErrors(["vendor"])}
          fullWidth
          helperText={getFirstErrorMessage(["vendor"])}
          label={i18next.t("productDetailEdit.vendor")}
          {...getInputProps("vendor", muiOptions)}
        />
        <TextField
          className={classes.textField}
          error={hasErrors(["description"])}
          fullWidth
          helperText={getFirstErrorMessage(["description"])}
          label={i18next.t("productDetailEdit.description")}
          {...getInputProps("description", muiOptions)}
        />
        <TextField
          className={classes.textField}
          error={hasErrors(["originCountry"])}
          fullWidth
          helperText={getFirstErrorMessage(["originCountry"])}
          label={i18next.t("productDetailEdit.originCountry")}
          onKeyPress={(event) => {
            if (event.key === "Enter") submitForm();
          }}
          select
          {...originCountryInputProps}
          value={originCountryInputProps.value || "GT"}
          disabled={true}
        >
          {CountryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          label={i18next.t("productDetailEdit.shouldAppearInSitemap")}
          control={<Checkbox />}
          {...getInputProps("shouldAppearInSitemap", muiCheckboxOptions)}
        />
        <Box textAlign="right">
          <Button
            color="primary"
            disabled={!isDirty || isSubmitting}
            variant="contained"
            type="submit"
          >
            {i18next.t("app.saveChanges")}
          </Button>
        </Box>
        <GenerateSitemapsConfirmDialog />
      </form>
    );
  }
  return (
    <Card className={classes.card} ref={ref}>
      <CardHeader title={i18next.t("admin.productAdmin.details")} />
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
});

export default ProductDetailForm;
