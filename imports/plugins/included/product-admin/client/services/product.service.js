import fetch from 'node-fetch';
import {useState, useEffect} from 'react';
import { Meteor } from "meteor/meteor";
const productDefault = {
    value:"No se ha seleccionado ningún producto",
    key:0,
    categ_id: 0
};
export default {
    useFetch: (categoriesFilter = null, _query = null) =>{
        const [products, setProducts] = useState([productDefault]);
        
        const [isLoading, setIsLoading] = useState(true);

        const [error, setError] = useState({
            hasError:false,
            message: "it does not has error"
        });
        
        const _fetchProduct = async () =>{
            let userSession = sessionStorage.getItem(`oidc.user:${Meteor.settings.public.oidcUrl}:reaction-admin`);
            if (userSession != null){
                userSession = JSON.parse(userSession);
            }else{
                userSession = {access_token:"", token_type:""};
            }
            //setIsLoading(true);
            let query = "";
            if (categoriesFilter != null){
                if(categoriesFilter.categoryProduct != 0){
                    query = `?categories[]=${categoriesFilter.categoryProduct}`;
                }
            }
            if (_query != 0){
                query = `?categories[]=${_query}`;
            }
            if(query == ""){
                return;
            }
            fetch(`${Meteor.settings.public.invoiceUrl}/api/products${query}`, {
                method: 'get',
                headers: { 'Authorization': `Bearer ${userSession.access_token}` },
            })
            .then(res => {
                return res.json()})
            .then(json => {
                json.push(productDefault);
                setProducts(json);})
            .catch((err)=>{
                setError({hasError:true, message:err.message})})
            .finally(()=>{/*setIsLoading(false)*/});
        }

        useEffect(()=>{
            _fetchProduct();
        },[categoriesFilter, _query]);

        return  {products, isLoading, error};
    }
}