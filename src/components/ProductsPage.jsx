import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Header from './Header'

const DESIGN_WIDTH = 1920

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background: white;
`

const ScalableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  min-height: 100vh;
  transform-origin: top left;
  transform: scale(${({ $scale }) => $scale});
`

const StyledFrame = styled.div`
  width: ${DESIGN_WIDTH}px;
  min-height: 100vh;
  position: relative;
  background: white;
`

/* Сетка хедера как на /products/oil-injected */
const StyledLeftMarginStrip = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1px;
  height: 100%;
  min-height: 1200px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1px;
  height: 100%;
  min-height: 1200px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledTopLine = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledHeaderVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9c9e9d;
  z-index: 100;
  pointer-events: none;

  &.vl-1 { top: 16px; left: 548px; height: 75px; }
  &.vl-2 { top: 16px; left: 844px; height: 75px; }
  &.vl-3 { top: 16px; left: 1118px; height: 75px; }
  &.vl-4 { top: 16px; left: 1318px; height: 75px; }
`

const StyledButtonsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 10;
`

const StyledHeaderDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  background: white;
  border: 1px solid #9c9e9d;
  border-radius: 50%;
  z-index: 150;
  pointer-events: none;
`

const VisuallyHiddenH1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`

const StyledProductButton = styled(Link)`
  display: block;
  width: 100%;
  max-width: 520px;
  padding: 18px 32px;
  background: white;
  border: 1px solid #9c9e9d;
  color: #272b37;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #272b37;
    color: white;
  }
`

const ProductsPage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const buttons = [
    { text: 'Винтовые воздушные компрессоры', to: '/products/oil-injected' },
    { text: 'Безмасляные воздушные компрессоры', to: '/products/oil-free' },
    { text: 'Портативный воздушный компрессор', to: '/products/portable' },
    { text: 'Оборудование для очистки воздуха', to: '/products/air-treatment' }
  ]

  return (
    <PageWrapper>
      <ScalableContent $scale={scale}>
        <StyledFrame>
          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledHeaderBottomLine />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />
          <StyledHeaderVLine className="vl-3" />
          <StyledHeaderVLine className="vl-4" />
          <StyledHeaderDot style={{ left: 27, top: 12 }} />
          <StyledHeaderDot style={{ left: 27, top: 86 }} />
          <StyledHeaderDot style={{ left: 545, top: 12 }} />
          <StyledHeaderDot style={{ left: 545, top: 86 }} />
          <StyledHeaderDot style={{ left: 840, top: 12 }} />
          <StyledHeaderDot style={{ left: 840, top: 86 }} />
          <StyledHeaderDot style={{ left: 1115, top: 12 }} />
          <StyledHeaderDot style={{ left: 1115, top: 86 }} />
          <StyledHeaderDot style={{ left: 1315, top: 12 }} />
          <StyledHeaderDot style={{ left: 1315, top: 86 }} />
          <StyledHeaderDot style={{ left: 1885, top: 12 }} />
          <StyledHeaderDot style={{ left: 1885, top: 86 }} />
          <Header />
          <VisuallyHiddenH1>
            Каталог компрессорного оборудования Bolaite — винтовые, безмасляные и портативные модели
          </VisuallyHiddenH1>
          <StyledButtonsWrapper>
            {buttons.map((btn, i) => (
              <StyledProductButton key={i} to={btn.to}>
                {btn.text}
              </StyledProductButton>
            ))}
          </StyledButtonsWrapper>
        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export { ProductsPage as default }
