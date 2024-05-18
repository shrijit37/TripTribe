import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints(
  {
    endpoints:(builder)=>(
      {
        login:builder.mutation({
          query:(data)=>({
            url:'/users/auth',
            method:'POST',
            body:data
          })
        }),
        register:builder.mutation({
          query:(data)=>({
            url:'/users',
            method:'POST',
            body:data
          })
        })
      }
    )
  }
)

export const {useLoginMutation,useRegisterMutation} = userApiSlice;
