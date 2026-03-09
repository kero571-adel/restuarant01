import ContactClient from "@/components/ContactClient";

export const metadata = {
  title: "Contact Us - Crunchy Bite",
  description:
    "Get in touch with Crunchy Bite. Find our location, hours, phone number, and send us a message. We'd love to hear from you!",
  openGraph: {
    title: "Contact Crunchy Bite",
    description: "Reach out to us for inquiries and feedback",
  },
};

export default function Contact() {
  return <ContactClient />;
}
