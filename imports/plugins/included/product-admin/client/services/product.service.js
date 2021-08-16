import fetch from 'node-fetch';
import {useState, useEffect} from 'react';
import { Meteor } from "meteor/meteor";
const productDefault = {
    value:"No se ha seleccionado ningún producto",
    key:0,
    categ_id: 0
};
export default {
    useFetch: (_query = 0) =>{
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
            if(_query == 0){
                return;
            }
            let query = `?categories[]=${_query}`;
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
        },[_query]);

        return  {products, isLoading, error};
    }
}
