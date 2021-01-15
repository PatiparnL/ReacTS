import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { CLEAR_AUTHORIZED } from "../../stores/types/authorized";

const ErrorPage = () => {
    // const dispatch = useDispatch();

    useEffect(() => {
        // dispatch({ type: CLEAR_AUTHORIZED, payload: { infomation: null, haveAuthorized: null }})
    }, []);

    return <div>
       Error 
    </div>; 
}

export default ErrorPage;