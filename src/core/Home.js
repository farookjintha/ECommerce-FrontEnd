import React from 'react';
import Layout from './Layout';

const Home = () => (
    <Layout title="Home Page" description = "Node React E-commerce App">
        {process.env.REACT_APP_API_URL}
    </Layout>
);

export default Home;