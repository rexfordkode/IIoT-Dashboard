import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";


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
    title: "Test Bench",
    path: "/testconnection",
    icon: <ImIcons.ImConnection />,
    className: "nav-text",
  },
];
