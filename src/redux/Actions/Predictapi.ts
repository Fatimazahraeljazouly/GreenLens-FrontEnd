import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { host } from '../../../Config';
import { DiseaseInfo } from "../../utils/Types";
import { getSession } from '../../utils/session';



export const Predictapi=createApi({
    reducerPath:'Predictapi',
    baseQuery:fetchBaseQuery({
        baseUrl:host,
        prepareHeaders:async(headers)=>{
            const token = await getSession('token');
            if(token){
                headers.append('Authorization',`Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints:(build)=>({
        Predict:build.mutation<DiseaseInfo,any>({
            query:(image)=>{
                const formData = new FormData();
                formData.append('image', {
                    uri: image.uri,
                    name:image.name,
                    type: image.type,
                  });
                return{
                    url:'api/predict',
                    method:'POST',
                    body:formData,
                    redirect:'follow',
                }
            }
        })
    })
})

export const {usePredictMutation}=Predictapi
