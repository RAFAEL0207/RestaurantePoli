import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '../modules/shared/components/Providers';
import { bodyFont } from '@/config/fonts';


export const metadata: Metadata = {
  title: 'Control de inventario',
  description: 'Gestiona y controla el inventario de tu negocio 1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={bodyFont.className}>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}
