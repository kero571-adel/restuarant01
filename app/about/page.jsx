import AboutClient from "@/components/AboutClient";

export const metadata = {
  title: "About Us - Crunchy Bite",
  description:
    "Learn about Crunchy Bite's story, mission, and the passionate team behind the crispiest fried chicken in town. Fresh ingredients, quality, and dedication.",
  openGraph: {
    title: "About Crunchy Bite",
    description: "Discover our story and what makes us special",
  },
};

export default function About() {
  return <AboutClient />;
}
