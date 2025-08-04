export interface CartItem {
    productId: number
    quantity: number
}

export interface CartState {
    items: CartItem[]
    isDrawerOpen: boolean
    total: number
    visibleItemCount: number
}