import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'

const colors = {
  brand: {
    900: '#FFFFFB',
    800: '#000505',
    700: '#00A8E8',
    600: '#0987A0',
    500: '#808080'
  },
}


const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {


  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
