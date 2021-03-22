import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import "../commonStyle/style.scss";

const WelcomePage = () => {
    return (
        <Jumbotron className="jumbo d-flex">
            <div className="d-flex flex-column">
                <span>Welcome to the School Portal.</span>
                <span>Login details can be found in <a href="https://srms-be.herokuapp.com/api-docs">api-docs</a></span>
            </div>
        </Jumbotron>
    )
}

export default WelcomePage;
