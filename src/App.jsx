import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SeoHead from './components/SeoHead'
import Frame10 from './components/Frame10'
import Frame4 from './components/Frame4'
import CatalogPage from './components/CatalogPage'
import ProductsPage from './components/ProductsPage'
import ScrewCompressorsPage from './components/ScrewCompressorsPage'
import OilFreePage from './components/OilFreePage'
import PortablePage from './components/PortablePage'
import AboutPage from './components/AboutPage'
import './styles/responsive.css'

const GlobalStyle = createGlobalStyle`
  /* Палитра сайта */
  :root {
    --black: #000000;
    --black-70: rgba(0, 0, 0, 0.70);
    --black-60: rgba(0, 0, 0, 0.60);
    --dark-blue: #272B37;
    --gray-50: rgba(78, 78, 78, 0.50);
    --gray-626: #626262;
    --gray-6a: #6A6A6A;
    --gray-757: #757575;
    --gray-868: #868686;
    --gray-878: #878787;
    --gray-979: #979797;
    --gray-799: #979998;
    --gray-98: #98999B;
    --gray-9c: #9C9E9D;
    --gray-a1: #A1A7B6;
    --gray-a2: #A2A7B7;
    --gray-cf: #CFCFCF;
    --gray-d9: #D9D9D9;
    --gray-d9-transparent: rgba(217, 217, 217, 0);
    --gray-e1: #E1E1E1;
    --gray-e2: #E2E2E2;
    --gray-f0: #F0F1F0;
    --white: #FFFFFF;
    
    /* Gradients */
    --gradient-1: linear-gradient(180deg, #030C1B 0%, #8F9197 42%, white 95%);
    --gradient-2: linear-gradient(180deg, white 12%, #272B37 100%);
    --gradient-3: linear-gradient(180deg, #F9F9F9 0%, #868686 100%);
    --gradient-4: linear-gradient(180deg, #F9F9F9 0%, #888888 100%);
    --gradient-5: linear-gradient(180deg, #272B37 0%, #6C7284 100%);
    --gradient-6: linear-gradient(180deg, #6C7284 0%, #272B37 100%);
    --radial-gradient-1: radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(255, 255, 255, 0.60) 46%, rgba(255, 255, 255, 0) 100%);
    --radial-gradient-2: radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, white 46%, rgba(255, 255, 255, 0) 100%);
  }
`

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <SeoHead />
        <Routes>
          <Route path="/" element={<Frame10 />} />
          <Route path="/parts" element={<Frame4 />} />
          <Route path="/products/air-treatment" element={<CatalogPage />} />
          <Route path="/products/oil-injected" element={<ScrewCompressorsPage />} />
          <Route path="/products/oil-free" element={<OilFreePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/portable" element={<PortablePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App