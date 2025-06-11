

import { IoMdBasket } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { SiProducthunt } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


export const layoutData = [
  {
    link: "/app",
    title: "Home",
    icon: IoMdBasket,
  },
  {
    link: "/app/categories",
    title: "Category",
    icon: BiSolidCategory,
  },
  {
    link: "/app/products",
    title: "Product",
    icon: SiProducthunt,
  },
  {
    link: "/app/orders",
    title: "Order",
    icon: MdProductionQuantityLimits,
  },
  {
    link: "/app/users",
    title: "User",
    icon: FaUserAlt,
  },
  {
    link: "/app/colors",
    title: "Colors",
    icon: IoIosColorPalette,
  },
];
