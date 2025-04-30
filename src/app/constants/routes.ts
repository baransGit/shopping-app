export const ROUTES = {
    HOME:'/',
    PRODUCTS: {
        LIST: '/products',
        DETAIL: '/product/:id',  
    },
    CATEGORIES:{
        LIST:'/',
        PRODUCTS: '/category/:groupId'
    }


}as const