import React,{ Component, Fragment, useEffect, useState } from "react";
import Layout from "components/CustomLayout";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import PropTypes from "prop-types";
import useShop from "hooks/shop/useShop";
import { applyTheme } from "@reactioncommerce/components/utils";
import { withApollo } from "lib/apollo/withApollo";
import { locales } from "translations/config";
import Head from "next/head";
import styled from "styled-components";
import { Grid,useMediaQuery,Divider,Button } from "@material-ui/core";
import { useTheme,withStyles } from '@material-ui/core/styles';
import RoundedButton from "components/RoundedButton";
import withGoogleMaps from "containers/maps/withGoogleMap";
import GoogleMapComponent from "components/GoogleMaps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import withAddressBook from "containers/address/withAddressBook";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import inject from "hocs/inject";
import relayConnectionToArray from "lib/utils/relayConnectionToArray";
import PageLoading from "components/PageLoading";
import Router from "translations/i18nRouter";
import { useRouter } from "next/router";


const PlacesWithStandaloneSearchBox = (props)=>
{
  return <div data-standalone-searchbox="">
  <StandaloneSearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    onPlacesChanged={props.onPlacesChanged}
    controlPosition = {google.maps.ControlPosition.TOP_LEFT}
  >
    {props.children}
  </StandaloneSearchBox>
  </div>
};
const PlacesWithSearchBox = (props)=>
{
  return <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    onPlacesChanged={props.onPlacesChanged}
    controlPosition = {google.maps.ControlPosition.TOP_LEFT}
  >
    <div style={{width:'50%',padding:'10px'}}>
    {props.children}
    </div>
  </SearchBox>
};
const styles = theme => ({
    flexForm:{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    flexMap:{
        padding: 0,
        flex: '1 1 auto',
        display:'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    form:{
        width: '100%',
        maxWidth: '600px',
        alignSelf: 'center',
        paddingLeft: 'auto',
        paddingRight: 'auto',
        display:'flex',
        flexDirection:'column',
        height: '100%',
        paddingTop:theme.spacing(5),
        [theme.breakpoints.down("md")]:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2)
        },
        paddingBottom: theme.spacing(5),
        justifyContent: 'space-between'
    },
    map:{
        width: '100%',
        height: '100%',
    },
    searchInput:{
        padding: theme.spacing(2)
    },
    addressItems:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:'10px'
    }
});
const CustomTitle = styled.div`
    color: #7A6240;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
`;
const RenderedForm = styled.div`
    padding-top: 40px;
    @media (min-width: ${applyTheme("sm", "breakpoints")}px) {
        padding-top: 70px;
      }
`;
const CreateAddress = props =>{
    const shop = useShop();
    const theme = useTheme();
    const [currentAddressBook,setCurrentAddressBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const pageTitle = `Address | New | ${shop && shop.name}`;
    const matches= useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();
    const handleAddAddress = async(value) => {
        const {onAddressAdded,onAddressEdited} = props;
        const {query:redirect} = router 
        let meta=value;
        delete value._id;
        if(props.googleProps.locationRef.latitude!=undefined){
            meta = {
                ...value,
                geolocation:props.googleProps.locationRef
            }
        }
        if(addressBookId!=null){
            await onAddressEdited(addressBookId,meta);
        }else{
            await onAddressAdded(meta);
        }
        window.location.href = decodeURIComponent(redirect.redirect);
    }

    useEffect(()=>{
        const {
            authStore:{account:{addressBook}},
            addressBookId
        } = props;
        if(router.query.addressId==undefined) {
            setLoading(false);
            return;
        };
        const addresses = (addressBook && relayConnectionToArray(addressBook)) || [];
        let current = addresses.find((item)=>item._id==addressBookId);
        setCurrentAddressBook(current);
        if(current!=undefined) setLoading(false);
    },[]);
    const {addressBookId} = props;
    if(loading) return <PageLoading/>
    return(
        <Layout shop={shop} noMaxwidth>
             <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={shop && shop.description} />
            </Head>
            {!matches && <RenderWeb {...props} 
                handleAddAddress={handleAddAddress}
                value={currentAddressBook}
             />}
            {matches && <RenderMobile {...props}
                handleAddAddress={handleAddAddress}
                value={currentAddressBook}
            />}
        </Layout>
    );
};
const RenderMobile = withStyles(styles)((props) => {
    const [current,setCurrent] = useState(0);
    const {googleProps,
           classes,
           components:{TextInput,AddressForm},
           value,
           addressBookId
        } = props;
        let form = null;
        const [state,setState] = useState({
            address:value?value.address:'ninguna',
            description:value?value.description:'ninguna'
        })
        const handleChange = (event) =>{
            setState({
                description:event.description?event.description:'',
                address:event.address?event.address:''
            })
        }
    return (
        <Fragment>
            {current==0 &&(
                <Grid container style={{minHeight:'calc(100vh - 130px)'}}>
                    <Grid item xs={12}>
                    <div className={classes.flexMap}>
                    <div className={classes.map}>
                        <div className={classes.searchInput}>
                            <PlacesWithStandaloneSearchBox {...googleProps}>
                            <TextInput
                                    id="search"
                                    name="search"
                                    placeholder="buscar una dirección"
                                    />
                            </PlacesWithStandaloneSearchBox>
                        </div>
                        <div style={{height:'500px'}}>
                        <GoogleMapComponent {...googleProps} location={value && value?.geolocation}/>
                        </div>
                    </div>
                            <div style={{paddingBottom:'20px',
                            paddingTop:'10px',
                            paddingLeft:'10px',paddingRight:'10px'}}>
                                <RoundedButton
                                onClick={()=>{setCurrent(1)}}
                                buttonTitle={"Guardar y continuar"}
                                />
                            </div>
                </div>
                    </Grid>
                </Grid>
            )}
            {current==1 &&(
                <Grid container style={{minHeight:'calc(100vh - 130px)'}}>
                    <Grid item xs={12}>
                    <div className={classes.flexForm}>
                        <div className={classes.form}>
                            <div className={classes.addressItems}>
                            <CustomTitle style={{fontSize:'30px'}}>{addressBookId?"Editar Dirección":"Crear Dirección"}</CustomTitle>
                            <Divider style={{width:'80%'}}/>
                            <Button variant="outlined"
                                size="small"
                                startIcon={<LocationSearchingIcon/>}
                                onClick={()=>setCurrent(0)}
                            >Cambiar la ubicación</Button>
                            <RenderedForm>
                                <AddressForm
                                ref={(formEl)=>{
                                    form = formEl;
                                }}
                                onChange={handleChange}
                                value={value}
                                onSubmit={props.handleAddAddress}/>
                            </RenderedForm>
                            </div>
                            <div>
                                <RoundedButton
                                onClick={()=>{form.submit()}}
                                buttonTitle={"Guardar Cambios"}
                                buttonSubtitle = {`${state.description} - ${state.address}`}
                                />
                            </div>
                        </div>
                    </div>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
});
const RenderWeb = withStyles(styles)((props) => {
    const {classes,components:{
        AddressForm,
        Field,
        TextInput
    },googleProps,value,addressBookId} = props;
    const [state,setState] = useState({
        address:value?value.address:'ninguna',
        description:value?value.description:'ninguna'
    })
    let form = null;
    const handleChange = (event) =>{
        setState({
            description:event.description?event.description:'',
            address:event.address?event.address:''
        })
    }
    return(
        <Fragment>
            <Grid container style={{minHeight:'calc(100vh - 70px)'}}>
                <Grid item xs={12} md={6}>
                    <div className={classes.flexForm}>
                        <div className={classes.form}>
                            <div>
                            <CustomTitle>{addressBookId?"Editar Dirección":"Crear Dirección"}</CustomTitle>
                            <Divider/>
                            <RenderedForm>
                            <AddressForm
                            ref = {(ref)=>{
                              form = ref;
                            }}
                            onChange={handleChange}
                            value={value}
                            onSubmit = {props.handleAddAddress}

                            />
                            </RenderedForm>
                            </div>
                            <div>
                                <RoundedButton
                                onClick={()=>{form.submit()}}
                                buttonTitle={"Guardar Cambios"}
                                buttonSubtitle = {`${state.description} - ${state.address}`}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={classes.flexMap}>
                        <div className={classes.map}>
                            <GoogleMapComponent 
                            {...googleProps}
                            location={value && value?.geolocation}
                            SearchBox = {
                                <PlacesWithSearchBox
                                {...googleProps}>
                                    <TextInput
                                    id="search"
                                    name="search"
                                    placeholder="buscar una dirección"
                                    />
                                </PlacesWithSearchBox>
                            }/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
});
export async function getStaticProps({ params: { lang,addressId }}) {
    const primaryShop = await fetchPrimaryShop(lang);
    const translations = await fetchTranslations(lang, ["common"]);
    let addressBookId = addressId && addressId;
    if (!primaryShop) {
          return {
              props: {
              shop: null,
              ...translations
              },
              addressBookId:null,
              // eslint-disable-next-line camelcase
              unstable_revalidate: 1 // Revalidate immediately
          };
      }
  
      return {
          props: {
              ...primaryShop,
              ...translations,
              addressBookId,
          },
          // eslint-disable-next-line camelcase
          unstable_revalidate: 120 // Revalidate each two minutes
      };
  }
  
  /**
   *  Static paths for the cart
   *
   * @returns {Object} the paths
   */
  export async function getStaticPaths() {
    return {
      paths: locales.map((locale) => ({ params: { lang: locale, addressId:"-" } })),
      fallback: true
    };
  }
  
export default withApollo()(withGoogleMaps(withAddressBook(inject("routingStore","authStore")(CreateAddress))));