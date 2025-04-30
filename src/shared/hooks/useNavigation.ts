
import { useNavigate } from 'react-router-dom'
import { ROUTES } from  '../../app/constants/routes'

export const useNavigation = () => {
    const navigate = useNavigate()

    return {
        goToHome: () => navigate(ROUTES.HOME),
        goToProductDetail: (id: number) => 
            navigate(`${ROUTES.PRODUCTS.DETAIL.replace(':id', id.toString())}`),
        goToCategoryProducts: (groupId:string)=>
            navigate(ROUTES.CATEGORIES.PRODUCTS.replace(':groupId',groupId))
    }
}