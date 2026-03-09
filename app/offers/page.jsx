import OffersClient from "@/components/OffersClient";

export const metadata = {
  title: "Special Offers - Crunchy Bite",
  description:
    "Check out Crunchy Bite's amazing exclusive offers and limited-time deals. Save big on your favorite fried chicken, combos, and more!",
  openGraph: {
    title: "Special Offers - Crunchy Bite",
    description: "Exclusive deals and limited-time offers",
  },
};

export default function Offers() {
  return <OffersClient />;
}
