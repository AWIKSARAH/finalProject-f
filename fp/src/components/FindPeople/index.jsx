import React from 'react';
import { Outlet } from 'react-router-dom';
function Find() {
    return ( <>
    <h1>Find People</h1>
    <input type="search" name="q" id="" />
    <Outlet/>
    </> );
}
export default Find;