import React, { useState } from 'react';
import {Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelper';


const Card = ({product, 
                showViewProductButton = true, 
                showAddToCartButton = true, 
                cartUpdate = false, 
                showRemoveProductButton = false}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = () => {
        return(
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return showAddToCartButton && (
            <button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>
                    Add to cart
            </button>
        )
    }

    const showRemoveButton = (showRemoveProductButton) => {
        return showRemoveProductButton && (
            <button className="btn btn-outline-danger mt-2 mb-2" onClick={() => removeItem(product._id)}>
                    Remove Product
            </button>
        )
    }

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
            ) : (
            <span className="badge badge-primary badge-pill">Out Of Stock</span>
            )
    }

    const handleChange = productId => event => {
        console.log("Value: ", event.target.value);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        console.log("Count: ", count)
        if(event.target.value >= 1){
            console.log()
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }


    return (
        
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p className = "lead mt-2">{product.description.substring(0, 100)}</p>
                    <p className="black-9">Rs. {product.price}</p>
                    <p className="black-8">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

                        {showStock(product.quantity)}
                    
                        {showViewButton(showViewProductButton)}

                        {showAddToCart(showAddToCartButton)}

                        {showRemoveButton(showRemoveProductButton)}

                        {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
        
    )
}

export default Card;