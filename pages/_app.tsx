import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-white">Fazz Bank</Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
