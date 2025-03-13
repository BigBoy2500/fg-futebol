import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar' // Importa a Navbar separada

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Canais de Desporto',
  description: 'Transmissão de canais desportivos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar /> {/* Agora a Navbar é um componente separado */}
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
