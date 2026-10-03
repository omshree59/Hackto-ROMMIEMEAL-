import type { Metadata } from "next";
import "./globals.css";
import { HouseholdProvider } from "@/context/HouseholdContext";

export const metadata: Metadata = {
  title: "RoomieMeal — One kitchen. Everyone feels safe.",
  description: "Smart shared-household meal planner designed for roommates with allergies, intolerances, and distinct food boundaries. 100% offline-ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-app-bg text-stone-200 antialiased font-sans">
        <HouseholdProvider>
          {children}
        </HouseholdProvider>
      </body>
    </html>
  );
}
