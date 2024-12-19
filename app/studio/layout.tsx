export const metadata = {
  title: "WinkWares Studio",
  description: "Used Sanity to Generated shop backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
