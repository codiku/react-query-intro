import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
    </QueryClientProvider>
);
