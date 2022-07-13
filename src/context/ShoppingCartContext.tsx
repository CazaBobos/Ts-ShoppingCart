import { createContext,ReactNode, useContext, useState } from "react";

type CartItem = {
    id: number,
    quantity: number
}
type ShoppingCartValue = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems : CartItem[]
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void
}
type ShoppingCartProviderProps = {
    children: ReactNode
}

const ShoppingCartContext = createContext({} as ShoppingCartValue);
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [isOpen,setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const [cartItems,setCartItems] = useState<CartItem[]>([])
    const cartQuantity = cartItems.reduce((quantity,item) =>
        item.quantity + quantity,0
    )

    //searches for the item, and if found it returns 
    //its quantity, otherwise returns 0
    const getItemQuantity = (id:number) => cartItems.find(item => item.id === id)?.quantity || 0
    
    //if the item is not in the cart, it gets added.
    //if it is, find the one with the passed id and
    //increases it while leaving the rest as is.
    const increaseCartQuantity = (id:number) => {
        setCartItems(currItems => {
            return (currItems.find(item =>item.id === id) == null) ?
                [...currItems,{id, quantity: 1}]
                :
                currItems.map(item => {
                    return (item.id === id) ?
                    {...item,quantity: item.quantity + 1} : item
                })
        })
    }

    //works nearly the same way. Only difference is 
    //that checks if the quantity is equal to 1, and
    //removes it in that case. If not, decreases it.
    const decreaseCartQuantity = (id:number) => {
        setCartItems(currItems => {
            return (currItems.find(item =>item.id === id)?.quantity === 1) ?
                currItems.filter(item => item.id !== id)
                :
                currItems.map(item => {
                    return (item.id === id) ?
                    {...item,quantity: item.quantity - 1} : item
                })
        })
    }
    const removeFromCart = (id:number) => {
        setCartItems(currItems => currItems.filter(item => item.id !== id))
    }

    return(
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}