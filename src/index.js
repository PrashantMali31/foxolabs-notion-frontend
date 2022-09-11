import "react-app-polyfill/stable"
import "core-js"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {Provider} from "react-redux"
import store from "./store"
import SnackbarProvider from "react-simple-snackbar"
import {CookiesProvider} from "react-cookie";
import {QueryClient, QueryClientProvider, useQuery} from "react-query"
const queryClient = new QueryClient()

ReactDOM.render(

  <Provider store={store}>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </Provider>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
