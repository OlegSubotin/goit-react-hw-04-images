import React from "react";
import ReactLoading from "react-loading";
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.wrapper}>
            <ReactLoading type="spinningBubbles" color="#3f51b5" />
        </div>
    );
};

export default Loader;