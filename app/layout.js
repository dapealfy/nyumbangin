import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider, AuthContext } from '../context/authContext';
import { ContractProvider } from '../context/contractContext';
import App from './app';

const fonts = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Nyumbangin',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>      
      <ContractProvider>
        <html lang="en">
          <body className={fonts.className} style={{'backgroundColor': '#232323', 'color': '#FFF'}}>
            <App>
              {children}
            </App>
          </body>
        </html>
      </ContractProvider>
    </AuthProvider>
  )
}
