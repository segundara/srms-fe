import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import "../commonStyle/style.scss";

const WelcomePage = () => {
    return (
        <Jumbotron className="jumbo d-flex">
            <div className="d-flex flex-column">
                <span>Welcome to my SRS project.</span>
                <span>Login details can be found in <a href="https://cloudy-blue-lion.cyclic.app/api-docs">api-docs</a></span>
            </div>
        </Jumbotron>
    )
}

export default WelcomePage;
