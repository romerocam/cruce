import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#FFFFFB',
    800: '#000505',
    700: '#00A8E8',
    600: '#0987A0'
  },
}


const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {


  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
