import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Shopping Cart - Crunchy Bite",
  description:
    "Review and manage your Crunchy Bite order. View items, adjust quantities, and proceed to checkout.",
  openGraph: {
    title: "Your Cart - Crunchy Bite",
    description: "Complete your order from Crunchy Bite",
  },
};

export default function Cart() {
  return <CartClient />;
}
