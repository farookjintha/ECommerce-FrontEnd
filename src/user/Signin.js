import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signIn, authenticate } from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: 'john@gmail.com',
        password: 'jjj123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    };

    const clickSignIn = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signIn({email, password})
        .then(data => {
            if(data.err){
                setValues({...values, error: data.err, loading: false})
            }else{
                authenticate(data, ()=> setValues({...values, redirectToReferrer: true}))
            }
        })
    }

    const signInForm = () => (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
                </div>
                <button onClick={clickSignIn} className="btn btn-primary">Sign In</button>
            </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display:error ? '':'none'}} >
            {error}
        </div>
    );

    const showLoading = () => loading && (
        <div className="alert alert-info" >
            <h2>Loading...</h2>
        </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to="/" />
        }
    }


    return(
        <Layout title="Sign In Page" description = "Sign-in to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>

    );
}

export default Signin; 