import React, {useState} from 'react'
import "./NavBar.css";
import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import { SideBarData } from './SideBarData'
import {IconContext} from 'react-icons'


function NavBar() {
    const [sidebar, setSidebar] = useState(true);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <h1 id='heading'>MQTT BROKER</h1>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose  onClick={showSidebar}/>
                </Link>
              </li>
              {SideBarData.map((item, index) => {
                return (
                  <li key={index} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
  export default NavBar;