import  {CartItem} from '../../types'

    export const isValidQuantity = (quantity:number)=>{
         return quantity >0 && Number.isInteger(quantity)
    }

    export const hasValidItems = (items:CartItem[])=>{
        return items.every(item=> item.quantity>0)
    }

    export const isProductInCart = (items: CartItem[], productId: number) => {
        return items.some(item => item.productId === productId)
    }