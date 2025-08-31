import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { auth } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  );
}
