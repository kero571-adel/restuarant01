import MenuClient from "@/components/MenuClient";

export const metadata = {
  title: "Menu - Crunchy Bite",
  description:
    "Browse our delicious menu featuring crispy fried chicken, burgers, wraps, sides, and drinks. Fresh ingredients and authentic flavors.",
  openGraph: {
    title: "Menu - Crunchy Bite",
    description: "Explore our premium fried chicken menu and order now!",
  },
};

export default function Menu() {
  return <MenuClient />;
}
