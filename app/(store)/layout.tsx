import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wink Wares",
  description: "All the things you wanna buy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          {/* For Sanity Presentation mode */}
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              {/* VisualEditing is enable in draft-mode */}
              <VisualEditing />
            </>
          )}

          <main>
            <Header />
            {children}
            <Footer />
          </main>

          {/* Special component, sits at the top level of the App - Basically, it likes a connection between web and Saninty (server) */}
          {/* It helps automatic recorded and updated which is being changed at the server side */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
