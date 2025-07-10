import './globals.css';

export const metadata = {
  title: 'Restaurant Platform',
  description: 'Manage your restaurants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
