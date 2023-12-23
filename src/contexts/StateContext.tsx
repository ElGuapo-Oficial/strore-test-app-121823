import React, { createContext, useReducer, Dispatch } from 'react';

// Assuming you have a Product type defined elsewhere
export type ProductType = {
    id: number,
    image: string,
    price: number,
    quantity: number
}

type State = {
    products: ProductType[];
};

type Action = 
    | { type: 'addToCart'; payload: { product: ProductType } }
    | { type: 'removeFromCart'; payload: { productId: number; } };

const StateContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: { products: [] },
    dispatch: () => undefined, // Placeholder function
});

const initialState: State = { products: [] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'addToCart':
            // Check if the product already exists in the cart
            const existingProduct = state.products.find(p => p.id === action.payload.product.id);
            if (existingProduct) {
                // Update the quantity of the existing product
                return {
                    ...state,
                    products: state.products.map(p =>
                        p.id === action.payload.product.id ? { ...p, quantity: p.quantity + (action.payload.product.quantity || 1) } : p
                    )
                };
            } else {
                // Add the new product to the cart
                const newProduct = { ...action.payload.product, quantity: action.payload.product.quantity || 1 }; // Assuming the product details are in the payload
                return {
                    ...state,
                    products: [...state.products, newProduct]
                };
            }
        case 'removeFromCart':
            // Filter out the product to be removed
            return {
                ...state,
                products: state.products.filter(p => p.id !== action.payload.productId)
            };
        default:
            return state;
    }
};

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateContext;
