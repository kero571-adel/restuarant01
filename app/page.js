import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import WhyChooseUs from "@/components/WhyChooseUs";
import SpecialOffer from "@/components/SpecialOffer";
import CustomerReviews from "@/components/CustomerReviews";
import CallToAction from "@/components/CallToAction";

export const metadata = {
  title: "Crunchy Bite - Premium Fried Chicken Restaurant",
  description:
    "Welcome to Crunchy Bite! Enjoy the crispiest fried chicken made fresh daily with our secret recipe. Fast delivery available.",
  openGraph: {
    title: "Crunchy Bite - The Crispiest Chicken In Town",
    description:
      "Fresh, crispy, and delicious fried chicken. Order online now!",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <WhyChooseUs />
      <SpecialOffer />
      <CustomerReviews />
      <CallToAction />
    </>
  );
}
