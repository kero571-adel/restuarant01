import GalleryClient from "@/components/GalleryClient";

export const metadata = {
  title: "Photo Gallery - Crunchy Bite",
  description:
    "Browse our photo gallery showcasing our delicious fried chicken dishes, professional kitchen, and welcoming restaurant interior.",
  openGraph: {
    title: "Photo Gallery - Crunchy Bite",
    description: "See our premium fried chicken and restaurant experience",
  },
};

export default function Gallery() {
  return <GalleryClient />;
}
