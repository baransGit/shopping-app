import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {ProductList} from '../features/product/pages/ProductList'
import {ROUTES} from '../app/constants/routes'
import {MainLayout} from '../shared/components/layout/MainLayout'
import { ProductDetail } from '../features/product/pages/ProductDetail'
import { CategoryList } from '../features/category/components/CategoryList'


const router =createBrowserRouter([
    
    {
        path:ROUTES.HOME,
        element:<MainLayout/>,
        children:[
            {
               index:true,
               element : <CategoryList/>
            },
            {
                path :ROUTES.CATEGORIES.PRODUCTS,
                element:<ProductList/>
            },
            {
                path: ROUTES.PRODUCTS.DETAIL,
                element: <ProductDetail />
            },

        
           
        ]
    }


])
export const Router = ()=>{
    return <RouterProvider router={router}/>
}