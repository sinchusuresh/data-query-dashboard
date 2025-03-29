import { configureStore } from "@reduxjs/toolkit"
import queryReducer from "./query-slice"

export const store = configureStore({
  reducer: {
    query: queryReducer,
  },
})

