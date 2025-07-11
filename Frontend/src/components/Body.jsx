import {React} from 'react'
import { Outlet } from 'react-router';
import NavBar from './NavBar';


const Body = ()=>
    {
        return (
            <>
            <NavBar/>
            <h2>Body Page</h2>
            <Outlet/>
            </>
        )
    }

export default Body;