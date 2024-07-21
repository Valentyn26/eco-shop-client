import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='wrapper'>
            <h1>404 Not Found</h1>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default ErrorPage;