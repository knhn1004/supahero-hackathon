import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '../providers/User.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SupaClient',
	description: 'Supercharge your client customer service with AI',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<UserProvider>
				<body className={inter.className}>{children}</body>
			</UserProvider>
		</html>
	);
}
