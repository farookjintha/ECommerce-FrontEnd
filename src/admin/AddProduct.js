import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {createCategory} from './apiAdmin';

const AddProduct = () => {

    const {user, token} = isAuthenticated();

    return (
        <Layout title="Add a new product" description={`Hello, ${user.name}! Do you wanna add a new product?`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">Add Product</div>
            </div>
            
        </Layout>
    );
}

export default AddProduct;