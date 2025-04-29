import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Account ,Token,message,register} from '../../utils/Types';
import { host } from '../../../Config';
import { registerData } from '../../utils/Types';
import { getSession } from '../../utils/session';
export const authApi = createApi({
    reducerPath:'authApi',
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
        LogIn:build.mutation<Token,Account>({
            query:(user)=>({
                url:'api/login',
                body:user,
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                redirect:'follow',
            })
        }),

        GetProfile:build.query<registerData,void>({
            query:()=>({
                method:'GET',
                url:'api/profile',
                headers:{
                    'Content-Type':'application/json',
                },
                redirect:'follow',
            })
        }),

        Register:build.mutation<message,register>({
            query:(data)=>({
                method:'POST',
                url:'api/register',
                body:data,
                headers:{
                    'Content-Type':'application/json',
                }
            })
        }),

    })
})

export const {useLogInMutation,useGetProfileQuery,useRegisterMutation} = authApi;