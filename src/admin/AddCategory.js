import React, {useState, useReducer} from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //Destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) =>{
        setError('');
        setCategoryName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        //make request to api for creating category

    }


    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name of the category</label>
                <input type="text" className="form-control" onChange={handleChange} value={categoryName} autoFocus />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    )

    return(
        <Layout title="Add a new category" description={`Hello, ${user.name}! Do you wanna add a category?`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )

}

export default AddCategory;