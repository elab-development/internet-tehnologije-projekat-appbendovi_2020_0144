import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";

const Header = props => {

    const {naslov, podnaslov} = props;

    return (
        <>
            <div className="naslov mt-3">
                <h1>{naslov}</h1>
                <hr/>
                <p>{podnaslov}</p>
            </div>
        </>
    );
};

Header.propTypes = {
   naslov : PropTypes.string.isRequired,
   podnaslov : PropTypes.node
};

export default Header;