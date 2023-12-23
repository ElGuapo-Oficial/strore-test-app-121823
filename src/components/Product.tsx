import React from 'react';
import '../styles/components/Product.css'

const Product: React.FC<any> = ({ product, addToCart }) => {
    return (
        <div className='product'>
            <div className="img"><img key={product.id} src={product.src.original} /></div>
            <Description addToCart={addToCart}/>
        </div>
    )
}

export default Product;


const Description: React.FC<any> = ({ product, addToCart }) => {
    return (
        <>
            <div>Descrption</div>
            <button onClick={() => addToCart(product)}>Add To Cart</button>
        </>
    )
}