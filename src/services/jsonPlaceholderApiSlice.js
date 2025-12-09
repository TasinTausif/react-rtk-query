import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating API slice that automatically handles fetching(get), mutating(Post, put, delete), caching, refetching and auto generate hooks
export const jsonPlaceholderApiSlice = createApi({
    reducerPath: 'jsonPlaceholderApiSlice',//It is just the key name that'' store it in the cache of Redux
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/"//Rest of the url will be added after this base URL
    }),
    keepUnusedDataFor:20,//It releases the space kept for caching if that data is unused for 20 secs
    refetchOnFocus:true,//If user changes tab and again come back to this tab, data will be refetched
    endpoints: (builder) => ({
        // getPosts: builder.query({ query: () => "posts" }),//Also allowed to declare like this
        getPosts: builder.query({//It is the individual method that is holding the url and stuffs
            query: () => ({
                url: "posts"
            }),
            keepUnusedDataFor:5//Setting up time for individual method
        }),
        // getOnePost: builder.query({query: (id) => `posts/${id}`}),
        createPosts: builder.mutation({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                body: newPost
            })
        })
    })
})

// Converting rtk query and mutation to hooks. And it is done in the following convention
export const { useGetPostsQuery, useCreatePostsMutation } = jsonPlaceholderApiSlice