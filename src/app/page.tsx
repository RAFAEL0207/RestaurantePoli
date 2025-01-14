import { redirect } from "next/navigation";

export default function AppPage() {
    redirect("/auth/login")
}