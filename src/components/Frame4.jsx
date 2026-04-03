import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Header from './Header'
import { useLocation, Link } from 'react-router-dom'

import { heroImageProps, lazyImageProps } from '../utils/imagePerf'

const IMG4 = (name) => `/images/frame4/${name}`

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4315

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`

const ScrollSpacer = styled.div`
  width: 1px;
  visibility: hidden;
  pointer-events: none;
  height: ${({ $scale }) => DESIGN_HEIGHT * $scale}px;
`

const ScalableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  transform-origin: top left;
  transform: scale(${({ $scale }) => $scale});
`

const StyledFrame4 = styled.div`
  width: ${DESIGN_WIDTH}px;
  height: ${DESIGN_HEIGHT}px;
  position: relative;
  background: white;
`

const StyledInnerHorizontalPul = styled.div`
  position: absolute;
  left: 79px;
  top: 1860px;
  width: 1761px;
  height: 1px;
  background: #9c9e9d;
  z-index: 15;
  pointer-events: none;
`

const StyledInnerHorizontalPul2 = styled.div`
  position: absolute;
  left: 0px;
  top: 2158px;
  width: 1951px;
  height: 1px;
  background: #9c9e9d;
  z-index: 15;
  pointer-events: none;
`
const StyledInnerHorizontalSec = styled.div`
  position: absolute;
  left: 32px;
  top: 2230px;
  width: 1858px;
  height: 1px;
  background: #9c9e9d;
  z-index: 20;
  pointer-events: none;
`

const StyledInnerHorizontalSec2 = styled.div`
  position: absolute;
  left: 32px;
  top: 2310px;
  width: 1858px;
  height: 1px;
  background: #9c9e9d;
  z-index: 20;
  pointer-events: none;
`
const StyledInnerHorizontalSec3 = styled.div`
  position: absolute;
  left: -15px;
  top: 3230px;
  width: 1951px;
  height: 1px;
  background: #9c9e9d;
  z-index: 20;
  pointer-events: none;
`
const StyledInnerHorizontalSec4 = styled.div`
  position: absolute;
  left: -15px;
  top: 4206px;
  width: 1951px;
  height: 1px;
  background: #9c9e9d;
  z-index: 20;
  pointer-events: none;
`

const StyledTopLine = styled.div`
  position: absolute;
  left: 0;
  top: 15px;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledBottomHeaderLine = styled.div`
  position: absolute;
  left: 0;
  top: 90px;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledInnerVerticalLine = styled.div`
  position: absolute;
  left: 80px;
  top: 1070px;
  width: 1px;
  height: 2160px;
  background: #9c9e9d;
`

const StyledInnerVerticalLine2 = styled.div`
  position: absolute;
  left: 1840px;
  top: 1070px;
  width: 1px;
  height: 2160px;
  background: #9c9e9d;
`

const StyledInnerHorizontal = styled.div`
  position: absolute;
  left: 0;
  top: 1070px;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 10;
`

const StyledVerticalMargin = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1px;
  height: 4315px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`

const StyledRightMargin = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1px;
  height: 4315px;
  background: #9c9e9d;
  z-index: 50;
  pointer-events: none;
`
const StyledDot = styled.svg`
  position: absolute;
  width: 6px !important;
  height: 6px !important;
  min-width: 6px !important;
  min-height: 6px !important;
  z-index: 150;
  pointer-events: none;
  /* Центрируем точку, чтобы она сидела СЕРЕДИНОЙ на линии */
  transform: translate(-50%, -50%); 
  overflow: visible;
`;

const StyledVerticalHead = styled.div`
  position: absolute;
  top: 16px;
  left: 548px;
  width: 1px;
  height: 75px;
  background: #9c9e9d;
  z-index: 10;
`

const StyledVerticalHead2 = styled.div`
  position: absolute;
  top: 16px;
  left: 844px;
  width: 1px;
  height: 1055px;
  background: #9c9e9d;
  z-index: 10;
`

const StyledVerticalHead3 = styled.div`
  position: absolute;
  top: 16px;
  left: 1118px;
  width: 1px;
  height: 235px;
  background: #9c9e9d;
  z-index: 5;
`
const StyledVerticalHead4 = styled.div`
  position: absolute;
  top: 16px;
  left: 1318px;
  width: 1px;
  height: 75px;
  background: #9c9e9d;
  z-index: 10;
`

const StyledVerticalTop = styled.div`
  position: absolute;
  top: 1160px;
  width: 1px;
  height: 700px;
  background: #9c9e9d;
  z-index: 10;

  &.vt-1 { left: 621px; }
  &.vt-2 { left: 721px; }
  &.vt-3 { left: 1221px; }
  &.vt-4 { left: 1295px; }
`

const StyledVerticalSec = styled.div`
  position: absolute;
  top: 2158px;
  left: 621px;
  width: 1px;
  height: 1072px;
  background: #9c9e9d;
  z-index: 10;
`
const StyledVerticalSec2 = styled.div`
  position: absolute;
  top: 2158px;
  left: 721px;
  width: 1px;
  height: 1302px;
  background: #9c9e9d;
  z-index: 10;
`
const StyledVerticalSec3 = styled.div`
  position: absolute;
  top: 2158px;
  left: 1221px;
  width: 1px;
  height: 1072px;
  background: #9c9e9d;
  z-index: 10;
`
const StyledVerticalSec4 = styled.div`
  position: absolute;
  top: 2158px;
  left: 1295px;
  width: 1px;
  height: 1072px;
  background: #9c9e9d;
  z-index: 10;
`

const StyledHeroCard = styled.div`
  position: absolute;
  left: 880px;
  top: 259px;
  width: 960px;
  height: 771px;
  overflow: hidden;
`

const StyledHeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledHeroTitle = styled.h1`
  position: absolute;
  left: 880px;
  top: 147px;
  color: #03043c;
  font-family: 'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-weight: 500;
  font-size: 36px;
  z-index: 10;
`

const StyledHeroSubtitle = styled.p`
  position: absolute;
  left: 885px;
  top: 206px;
  color: #000;
  font-family: 'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-weight: 500;
  font-size: 27px;
`

const StyledWideChoiceTitle = styled.div`
  position: absolute;
  left: 79px;
  top: 570px;
  color: #c2c2c2;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 73px;
`

const StyledWideChoiceText = styled.p`
  position: absolute;
  left: 85px;
  top: 680px;
  color: #545454;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1.35;
`

const StyledContactButtonDot = styled.div`
  position: absolute;
  left: -3px;
  top: -3px;
  width: 8px;
  height: 8px;
  background: white;
  border: 1px solid #9C9E9D;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
`

const StyledContactButtonWrapper = styled.a`
  position: absolute;
  left: 79px;
  top: 943px;
  width: 301px;
  height: 62px;
  background: white;
  color: #131939;
  font-size: 32px;
  font-family: Inter;
  font-weight: 700;
  border: 1px solid #868686;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  z-index: 5;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #272B37;
    color: white;
  }
`

const StyledCategoryTitle = styled.h2`
  position: absolute;
  top: 1173px;
  color: #585858;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 38px;
`

const StyledSectionDivider = styled.div`
  position: absolute;
  left: 32px;
  top: 1160px;
  width: 1858px;
  height: 1px;
  background: #9C9E9D;
  z-index: 10;
`
const StyledSectionDivider2 = styled.div`
  position: absolute;
  left: 32px;
  top: 1230px;
  width: 1858px;
  height: 1px;
  background: #9C9E9D;
  z-index: 10;
`

const StyledProductCell = styled.div`
  position: absolute;
  clip-path: inset(0);
  z-index: 1;
`

const StyledProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  outline: none;
  display: block;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.07);
  }
`

const StyledDustPreventionText = styled.p`
  position: absolute;
  /* Растягиваем на всю ширину, чтобы текст внутри мог центрироваться */
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  
  top: 1898px;
  
  /* Магия центровки текста */
  text-align: center !important;

  color: #b7bec8;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 85px;
  line-height: 1.1;
  
  margin: 0 auto !important;
  z-index: 5;
`;

const StyledBottomSectionTitle = styled.h2`
  position: absolute;
  top: 2250px;
  color: #585858;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 30px;
  white-space: nowrap;
`

const StyledBottomDescription = styled.div`
  position: absolute;
  top: 2915px;
  color: #b5b6bb;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  line-height: 1.25;
`

const StyledFormTitle = styled.h2`
  position: absolute;
  top: 3447px;
  left: 450px;
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
`

const StyledFormSubtitle = styled.p`
  position: absolute;
  top: 3540px;
  left: 870px;
  color: #b5b6bb;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.3;
`

const StyledFormWrapper = styled.form`
  position: absolute;
  top: 3830px;
  left: 262px;
  width: 1402px;
  min-height: 59px;
`

const StyledFormLine = styled.div`
  position: absolute;
  top: 0;
  left: ${({ $left }) => $left}px;
  width: 366px;
  height: 1px;
  background: #9c9e9d;
`

const StyledFormLabel = styled.label`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: 366px;
  text-align: center;
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
`

const StyledFormInput = styled.input`
  position: absolute;
  top: -35px;
  left: ${({ $left }) => $left !== undefined ? $left : 0}px;
  width: 366px;
  height: 30px;
  background: transparent;
  border: none;
  outline: none;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 24px;
  text-align: center;
`

const StyledFieldError = styled(motion.div)`
  position: absolute;
  width: 366px;
  text-align: center;
  color: #c62828;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  background: rgba(244, 67, 54, 0.08);
  border-radius: 8px;
  border-left: 4px solid #c62828;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

const StyledSubmitBlock = styled.div`
  position: absolute;
  top: 4010px;
  left: 807px;
  width: 301px;
  height: 62px;
`

const StyledSubmitDot = styled.div`
  position: absolute;
  left: -4px;
  top: -4px;
  width: 10px;
  height: 10px;
  background: #272B37;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
`

const StyledSubmitInner = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #878787;
  border-radius: 0 8px 8px 8px;
  color: black;
  font-family: Inter;
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 0.35s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #272B37;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: 0;
    border-radius: 0 8px 8px 8px;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:hover {
    color: white;
  }

  span {
    position: relative;
    z-index: 1;
  }
`

const StyledSubmitBorder = styled.div``

const StyledFooterAddress = styled.address`
  position: absolute;
  top: 4230px;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  text-align: center;
  font-style: normal;
`
//DOT_POSITIONS-----------------------------------------------------------
const DOT_POSITIONS = [
  { top: 15, left: 31  },
  { top: 90, left: 31  },
  { top: 15, left: 549 },
  { top: 90, left: 548 },
  { top: 15, left: 845 },
  { top: 90, left: 845 },
  { top: 15, left: 1118 },
  { top: 90, left: 1118 },
  { top: 15, left: 1318 },
  { top: 90, left: 1318 },
  { top: 15, left: 1888 },
  { top: 90, left: 1888 },
  //header


  { top: 630,  left: 845  },
  //decorative dot//
  
  /* section-1: боковые полосы (линия 1064px) */
  { top: 1070, left: 31   },
  { top: 1070, left: 1889 },

  /* section-2*/
  { top: 2158, left: 31   },
  { top: 2158, left: 1889 },

  /* section-3: боковые */
  { top: 3230, left: 31   },
  { top: 3230, left: 1889 },

  /* footer */
  { top: 4206, left: 31  },
  { top: 4206, left: 1889 },

]

const API_URL = import.meta.env.VITE_API_URL || ''

const capitalizeFirst = (str) => {
  if (!str || str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return '+7'
  let d = digits
  if (d[0] === '8') d = '7' + d.slice(1)
  else if (d[0] !== '7') d = '7' + d
  d = d.slice(0, 11)
  if (d.length <= 1) return '+' + d
  if (d.length <= 3) return `+7 (${d.slice(1)}`
  if (d.length <= 4) return `+7 (${d.slice(1, 4)})`
  if (d.length <= 7) return `+7 (${d.slice(1, 4)}) ${d.slice(4)}`
  if (d.length <= 9) return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`
}

const Frame4 = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('+7')
  const [formEmail, setFormEmail] = useState('')
  const [formStatus, setFormStatus] = useState(null)
  const [formFieldErrors, setFormFieldErrors] = useState({ name: false, phone: false, email: false })

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormPhone(formatted)
    setFormFieldErrors((prev) => ({ ...prev, phone: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nameErr = !formName || formName.length < 2
    const phoneDigits = formPhone.replace(/\D/g, '')
    const phoneErr = phoneDigits.length < 11
    const emailErr = formEmail && !formEmail.includes('@')
    setFormFieldErrors({ name: nameErr, phone: phoneErr, email: emailErr })
    if (nameErr || phoneErr || emailErr) return
    setFormStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail
        })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.success !== false)) {
        setFormStatus('success')
        setFormName('')
        setFormPhone('+7')
        setFormEmail('')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <PageWrapper>
      <ScrollSpacer $scale={scale} />
      <ScalableContent $scale={scale}>
        <StyledFrame4>
          <Header />
          <StyledVerticalMargin />
          <StyledRightMargin />
          <StyledTopLine />
          <StyledBottomHeaderLine />
          <StyledInnerVerticalLine />
          <StyledInnerHorizontal />
          <StyledVerticalHead />
          <StyledVerticalHead2 />
          <StyledVerticalHead3 />
          <StyledVerticalHead4 />

        {DOT_POSITIONS.map((pos, i) => (
          <StyledDot 
            key={i} 
            /* Используем Math.round, чтобы убрать .5 и сделать точку четкой */
            style={{ 
              top: `${Math.round(pos.top)}px`, 
              left: `${Math.round(pos.left)}px` 
            }} 
            viewBox="0 0 6 6"
          >
            {/* Рисуем сам белый кружок внутри SVG-контейнера */}
            <circle 
              cx="3" 
              cy="3" 
              r="2.5" 
              fill="white" 
              stroke="#9C9E9D" 
              strokeWidth="1" 
            />
          </StyledDot>
        ))}
          <StyledSectionDivider2 />
          <StyledInnerVerticalLine2 />
          <StyledVerticalTop className="vt-1" />
          <StyledVerticalTop className="vt-2" />
          <StyledVerticalTop className="vt-3" />
          <StyledVerticalTop className="vt-4" />
          <StyledInnerHorizontalPul />
          <StyledInnerHorizontalPul2 />

          <StyledInnerHorizontalSec />
          <StyledInnerHorizontalSec2 />
          <StyledVerticalSec />
          <StyledVerticalSec2 />
          <StyledVerticalSec3 />
          <StyledVerticalSec4 />
          <StyledInnerHorizontalSec3 />

          <StyledInnerHorizontalSec4 />


          <StyledHeroTitle>Оригинальные запчасти Bolaite</StyledHeroTitle>
          <StyledHeroSubtitle>Первоклассные запчасти для воздушных компрессоров</StyledHeroSubtitle>

          <StyledHeroCard>
            <StyledHeroImage
              src={IMG4('image 3.png')}
              alt="Запчасти для компрессоров в наличии и сервис — Новая Техника Иркутск"
              width={960}
              height={771}
              {...heroImageProps}
            />
          </StyledHeroCard>

          <StyledWideChoiceTitle>ШИРОКИЙ ВЫБОР</StyledWideChoiceTitle>
          <StyledWideChoiceText>
            оригинальных запчастей и масел
            <br />
            для компрессоров Bolaite
            <br />
            позволяет не беспокоиться о поиске необходимых деталей
          </StyledWideChoiceText>

          <StyledContactButtonWrapper href="#request-form">
            <StyledContactButtonDot />
            СВЯЗАТЬСЯ
          </StyledContactButtonWrapper>

          <StyledCategoryTitle style={{ left: 147 }}>МАСЛЯНЫЕ ФИЛЬТРЫ</StyledCategoryTitle>
          <StyledCategoryTitle style={{ left: 745 }}>ВОЗДУШНЫЕ ФИЛЬТРЫ</StyledCategoryTitle>
          <StyledCategoryTitle style={{ left: 1370 }}>МАСЛООТДЕЛИТЕЛИ</StyledCategoryTitle>

         

          <StyledProductCell style={{ top: 1231, left: 82, width: 541, height: 629 }}>
            <StyledProductImage
              src={IMG4('compressor-air-filter-500x500-1-1.jpg 1.png')}
              alt="Воздушный фильтр для компрессора — запчасти в наличии Иркутск"
              {...lazyImageProps(541, 629)}
            />
          </StyledProductCell>
          <StyledProductCell style={{ top: 1231, left: 721, width: 500, height: 630 }}>
            <StyledProductImage
              src={IMG4('oil-filter.jpg 1.png')}
              alt="Масляный фильтр Bolaite — запчасти для компрессоров Иркутск"
              {...lazyImageProps(500, 630)}
            />
          </StyledProductCell>
          <StyledProductCell style={{ top: 1231, left: 1294, width: 545, height: 630 }}>
            <StyledProductImage
              src={IMG4('oil-separator.jpg 1.png')}
              alt="Маслоотделитель для компрессорного оборудования — в наличии Иркутск"
              {...lazyImageProps(545, 630)}
            />
          </StyledProductCell>

          <StyledDustPreventionText>
            Предотвращение попадания
            <br />
            пыли и грязи
          </StyledDustPreventionText>

          <StyledSectionDivider $top={1860} />
          <StyledSectionDivider $top={2158} />
          <StyledSectionDivider $top={2230} />
          <StyledSectionDivider $top={2310} />

          <StyledBottomSectionTitle style={{ left: 160 }}>
            СМАЗОЧНЫЕ МАТЕРИАЛЫ
          </StyledBottomSectionTitle>
          <StyledBottomSectionTitle style={{ left: 740, fontSize: 27 }}>
            КОМПЛЕКТ ДЛЯ ОБСЛУЖИВАНИЯ
          </StyledBottomSectionTitle>
          <StyledBottomSectionTitle style={{ left: 1453 }}>
            ВОЗДУХОВОДЫ
          </StyledBottomSectionTitle>

          <StyledProductCell style={{ top: 2340, left: 85, width: 531, height: 541 }}>
            <StyledProductImage
              src={IMG4('bolaite-oil.jpg 1.png')}
              alt="Масло для компрессора Bolaite — запчасти и расходники Иркутск"
              {...lazyImageProps(531, 541)}
            />
          </StyledProductCell>
          <StyledProductCell style={{ top: 2350, left: 721, width: 500, height: 530 }}>
            <StyledProductImage
              src={IMG4('Bolaite-service-kit.jpg 1.png')}
              alt="Сервисный комплект Bolaite — сервисное обслуживание компрессоров Иркутск"
              {...lazyImageProps(500, 530)}
            />
          </StyledProductCell>
          <StyledProductCell style={{ top: 2350, left: 1295, width: 545, height: 530 }}>
            <StyledProductImage
              src={IMG4('air-piping.jpg 1.png')}
              alt="Система воздуховодов для промышленного компрессора — Иркутск"
              {...lazyImageProps(545, 530)}
            />
          </StyledProductCell>

          <StyledBottomDescription style={{ left: 110 }}>
            Защита роторов,
            <br />
            теплорегуляция,
            <br />
            герметизация,
            <br />
            поглощение вредных веществ
          </StyledBottomDescription>

          <StyledBottomDescription style={{ left: 737 }}>
            Поставка в едином комплекте
            <br />
            с гарантией качества
          </StyledBottomDescription>

          <StyledBottomDescription style={{ left: 1327 }}>
            Система воздуховодов
            <br />
            Алюминий, нержавеющая сталь
          </StyledBottomDescription>

          <StyledFormTitle id="request-form">ОСТАВИТЬ ЗАЯВКУ</StyledFormTitle>

          <StyledFormSubtitle>
            Поможем подобрать компрессор,
            <br />
            соответствующий вашим запросам
          </StyledFormSubtitle>

          <StyledFormWrapper onSubmit={handleSubmit} aria-label="Форма заявки">
            <StyledFormLine $left={0} />
            <StyledFormLine $left={520} />
            <StyledFormLine $left={1030} />

            <StyledFormLabel htmlFor="name-input" $left={0} $top={10}>
              ИМЯ
            </StyledFormLabel>
            <StyledFormInput
              id="name-input"
              type="text"
              value={formName}
              onChange={(e) => { setFormName(capitalizeFirst(e.target.value)); setFormFieldErrors((prev) => ({ ...prev, name: false })) }}
              aria-label="Имя"
              $left={0}
            />

            <StyledFormLabel htmlFor="phone-input" $left={520} $top={10}>
              НОМЕР ТЕЛЕФОНА
            </StyledFormLabel>
            <StyledFormInput
              id="phone-input"
              type="tel"
              value={formPhone}
              onChange={handlePhoneChange}
              aria-label="Номер телефона"
              $left={520}
            />

            <StyledFormLabel htmlFor="email-input" $left={1030} $top={10}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </StyledFormLabel>
            <StyledFormInput
              id="email-input"
              type="email"
              value={formEmail}
              onChange={(e) => { setFormEmail(e.target.value); setFormFieldErrors((prev) => ({ ...prev, email: false })) }}
              aria-label="Электронная почта"
              $left={1030}
            />

            {formFieldErrors.name && (
              <StyledFieldError
                style={{ left: 0, top: 50 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                Введите имя
              </StyledFieldError>
            )}
            {formFieldErrors.phone && (
              <StyledFieldError
                style={{ left: 520, top: 50 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                Введите корректный номер телефона
              </StyledFieldError>
            )}
            {formFieldErrors.email && (
              <StyledFieldError
                style={{ left: 1030, top: 50 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                Некорректный адрес почты
              </StyledFieldError>
            )}
          </StyledFormWrapper>

          <StyledSubmitBlock>
            <StyledSubmitDot />
            <StyledSubmitInner type="submit" onClick={handleSubmit}>
              <span>ОТПРАВИТЬ</span>
            </StyledSubmitInner>
          </StyledSubmitBlock>

          {formStatus === 'success' && (
            <div
              style={{
                position: 'absolute',
                top: 4090,
                left: 262,
                color: '#4CAF50',
                fontFamily: 'Inter, sans-serif',
                fontSize: 18
              }}
            >
              Заявка отправлена!
            </div>
          )}
          {formStatus === 'error' && (
            <div
              style={{
                position: 'absolute',
                top: 4090,
                left: 262,
                color: '#f44336',
                fontFamily: 'Inter, sans-serif',
                fontSize: 18
              }}
            >
              Ошибка. Попробуйте позже.
            </div>
          )}

          <StyledFooterAddress>
            телефон +7 (395) 297-90-37
            <br />
            почта: Office@ntechnics.ru
            <br />
            адрес: Иркутск, Трилиссера 87
          </StyledFooterAddress>
        </StyledFrame4>
      </ScalableContent>
    </PageWrapper>
  )
}

export default Frame4
