import { records, screening, user, apps,predict } from "../assets";
//predict will be added later

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: apps,
    link: "/",
  },
  {
    name: "records",
    imgUrl: records,
    link: "/medical-records",
  },
  {
    name: "screening",
    imgUrl: screening,
    link: "/screening-schedules",
  },

  {
    name: "profile",
    imgUrl: user,
    link: "/profile",
  },
  {
    name:"predict",
    imgUrl:predict,
    link:"/predictForm"
  }
];