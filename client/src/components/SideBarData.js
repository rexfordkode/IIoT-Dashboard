import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
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
  //   title: "Products",
  //   path: "/products",
  //   icon: <FaIcons.FaCartPlus />,
  //   className: "nav-text",
  // },
  // {
  //   title: "Team",
  //   path: "/team",
  //   icon: <IoIcons.IoMdPeople />,
  //   className: "nav-text",
  // },
  // {
  //   title: "Messages",
  //   path: "/messages",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   className: "nav-text",
  // },
  // {
  //   title: "Support",
  //   path: "/support",
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   className: "nav-text",
  // },
];
