import fetch from 'node-fetch';
import {useState, useEffect} from 'react';
import { Meteor } from "meteor/meteor";
const categoryDefault = {
    name:"No se ha seleccionado ninguna categoría",
    id:0
};
export default {
    useFetch: () =>{
        const [categories, setCategories] = useState([categoryDefault]);
        
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
            setIsLoading(true);
            fetch(`${Meteor.settings.public.invoiceUrl}/api/product-categories`, {
                method: 'get',
                headers: { 'Authorization': `Bearer ${userSession.access_token}` },
            })
            .then(res => {
                return res.json()})
            .then(json => {
                json.push(categoryDefault);
                setCategories(json);})
            .catch((err)=>{
                console.log("error", err);
                setError({hasError:true, message:err.message})})
            .finally(()=>{setIsLoading(false)});
        }

        useEffect(()=>{
            _fetchProduct();
        },[]);

        return  {categories, isLoading, error, setIsLoading};
    }
}