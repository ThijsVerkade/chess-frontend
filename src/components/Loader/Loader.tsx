import React from "react";
import "./_loader.scss"

export const Loader = (): JSX.Element => {
    return (<div>
        <span className="loader"></span>
        <span className="loader-bar"></span>
    </div>)
};