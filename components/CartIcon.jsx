"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon(){

const { cart } = useCart();

return(

<Link href="/cart" className="relative">

🛒

<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">

{cart.length}

</span>

</Link>

)

}