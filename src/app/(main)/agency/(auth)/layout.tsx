export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      className="w-full mt-10 flex justify-center items-center"
    >
      {children}
    </div>
  );
}
