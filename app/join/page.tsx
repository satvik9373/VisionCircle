import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Join VisionCircle — Apply",
  description: "Apply to join a handpicked community of creators and entrepreneurs.",
};

export default function JoinPage() {
  return <JoinForm />;
}

