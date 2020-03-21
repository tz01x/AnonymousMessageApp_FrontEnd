// import React, { useState } from 'react';
// import React from 'react';
import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import './nav.css'
const Navbar = (props) => {
   const [NavitemClass, toggleNavItems] = useState(true);
   let nevitems = [{name:'home',url:'/test_my-app/'}, {name:'about',url:'./about'}, {name:'Settings',url:'./settings'}];
   // let {navItem,toggleNavItems}=useState();
   const normalNavitems='nev-items ';
   const toggolNav='nev-items-active'
   let handelNav=()=>{
      // document.querySelector()
      // console.log(4);
      toggleNavItems(!NavitemClass)
      
   }


   return (
      <nav>
         <div className='nev-brand'>faceless</div>
         <div className={NavitemClass?normalNavitems:normalNavitems+toggolNav}>


            {nevitems.map((item, index) => {
               return <div className='nev-item' key={index}>
                  <NavLink to={item.url}
                  isActive={()=>{
                     //no idea
                     
                     // console.log("match is calling ",match);
                     // console.log(location);
                     
                     
                  }}
                  >{item.name}</NavLink>
               </div>;

            })}

         </div>
         <div className="burger" onClick={handelNav}>
            <div className={NavitemClass?'bline1':"bline1 bline1-a"}></div>
            <div className={NavitemClass?'bline2':"bline2 bline2-a"}></div>
            <div className={NavitemClass?'bline3':"bline3 bline3-a"}></div>
         </div>



      </nav>

   )
};
export default Navbar;
