import {React} from 'react'
import { Outlet } from 'react-router';


const Body = ()=>
    {
        return (
            <>
            <h2>Body Page</h2>
            <Outlet/>
            </>
        )
    }

export default Body;