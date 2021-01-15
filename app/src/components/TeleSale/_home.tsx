import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        console.log('did moun')
        return () => {
            console.log('unmoun')
        }
    })
    return <div>
       Home 
    </div>; 
}

export default Home;