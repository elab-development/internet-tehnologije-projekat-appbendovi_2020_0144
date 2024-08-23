import React from 'react';
import {FaHeart, FaMusic} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="text-center"><FaMusic /> Sa ljubavlju od Savine i Isidore <FaHeart />.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;