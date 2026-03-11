import type { Metadata } from 'next';
import './globals.css';

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'API Health Monitor';

export const metadata: Metadata = {
  title: appName,
  description: 'Self-hosted API health monitoring dashboard with endpoint pinging and status visualization.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
