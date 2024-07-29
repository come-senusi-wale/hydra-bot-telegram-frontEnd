import React from 'react'
import logo from "@/public/image/hydratBot.jpeg";
import { FaBars } from "react-icons/fa";
import Image from 'next/image';
import  "../style/nav.css";

export const Nav = () =>{

    return(<>
    <nav>
        <div id='nav'>
            <div id='logo'>
                <Image src={logo} alt="" className='img'/>
            </div>
            <div id='toggle'>
                <h2><FaBars></FaBars></h2>
            </div>
        </div>
    </nav>
    </>)
}