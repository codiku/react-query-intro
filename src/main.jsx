import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })


ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
    </QueryClientProvider>
);
