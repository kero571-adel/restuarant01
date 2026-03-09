import CheckoutClient from "@/components/CheckoutClient";

export const metadata = {
  title: "Checkout - Crunchy Bite",
  description:
    "Complete your Crunchy Bite order. Enter your delivery details and choose your payment method for fast, fresh chicken delivery.",
  openGraph: {
    title: "Checkout - Crunchy Bite",
    description: "Finish your order and get your food delivered",
  },
};

export default function Checkout() {
  return <CheckoutClient />;
}
