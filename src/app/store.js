import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonPlaceholderApiSlice } from "../services/jsonPlaceholderApiSlice";

const store = configureStore({
    reducer: {
        [jsonPlaceholderApiSlice.reducerPath]: jsonPlaceholderApiSlice.reducer//Bringing data from the cache
    },
    // Middleware is handling the caching, preventing refeteching and maximum optimized data
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jsonPlaceholderApiSlice.middleware)
})

// Refetches data when window returns 
setupListeners(store.dispatch)

export default store