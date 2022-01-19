import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
// import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    className: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdIcons.MdDashboard />,
    className: "nav-text",
  },
  {
    title: "Report",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    className: "nav-text",
  },
  // {
  //   title: "Messages",
  //   path: "/messages",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   className: "nav-text",
  // }
];
