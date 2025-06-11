import Category from "../pages/Category/Category";
import Colors from "../pages/Colors/Colors";
import Home from "../pages/home/Home";
import Order from "../pages/Order/Order";
import Product from "../pages/Product/Product";
import User from "../pages/User/User";



export default [
    {
        element: Home
    },
    {
        path: "categories",
        element: Category
    },
    {
        path: "products",
        element: Product
    },
    {
        path: "orders",
        element: Order
    },
    {
        path: "users",
        element: User
    },
    {
        path: "colors",
        element: Colors
    },
]