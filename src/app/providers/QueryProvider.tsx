// src/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,  
            gcTime: 1000 * 60 * 30,  
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
})

export const QueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}