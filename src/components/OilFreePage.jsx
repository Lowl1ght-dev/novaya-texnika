import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'
import { useLocation, Link } from 'react-router-dom'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4319

// ─── Layout Shell ────────────────────────────────────────────────────────────

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
  border: none;
`

const StyledFrame = styled.div`
  width: 1920px;
  height: ${DESIGN_HEIGHT}px;
  position: relative;
  background: white;
  overflow: hidden;
`

// ─── Grid Lines ───────────────────────────────────────────────────────────────

const StyledLeftMarginStrip = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1px;
  height: ${DESIGN_HEIGHT}px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledTopLine = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledBottomLine = styled.div`
  position: absolute;
  top: 4199px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9C9E9D;
  z-index: 100;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider = styled.div`
  position: absolute;
  top: 15px;
  left: 548px;
  width: 1px;
  height: 3425px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1px;
  height: 1400px;
  background: #9C9E9D;
  z-index: 10;
`

const StyledVDivider3 = styled.div`
  position: absolute;
  top: 1830px;
  left: 1686px;
  width: 1px;
  height: 1391px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledHeaderVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.vl-1 { top: 16px; left: 1118px; height: 75px; }
  &.vl-2 { top: 16px; left: 1318px; height: 75px; }
`

const StyledHLine = styled.div`
  position: absolute;
  height: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.section-1  { top: 1064px; left: 0;   width: 1920px; }
  &.section-2  { top: 2145px; left: 0;   width: 1920px; }
  &.section-3  { top: 3220px; left: 1px; width: 1920px; }

  &.compressor-1 { top: 565px;  left: 550px;  width: 880px; }
  &.compressor-2 { top: 630px;  left: 845px;  width: 585px; }
  &.compressor-3 { top: 700px;  left: 1090px; width: 340px; }
  &.compressor-4 { top: 770px;  left: 1260px; width: 170px; }
  &.compressor-5 { top: 994px;  left: 550px;  width: 295px; }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 995px; left: 548px; height: 70px; }
  &.right { top: 995px; left: 844px; height: 70px; }
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

const StyledHeroTitle = styled(motion.h1)`
  position: absolute;
  top: 302px;
  left: 589px;
  margin: 0;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #000f46;
  z-index: 11;
`

const StyledHeroSubtext = styled.p`
  position: absolute;
  top: 392px;
  left: 1213px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #a9a9a9;
  text-align: right;
  line-height: 1.6;
  margin: 0;
  z-index: 11;
`

const StyledDescriptionLeft = styled.p`
  position: absolute;
  top: 802px;
  left: 166px;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 20px;
  color: black;
  text-align: right;
  line-height: 1.5;
  margin: 0;
  z-index: 11;
`

// ─── Category Nav ─────────────────────────────────────────────────────────────

const StyledCategoryList = styled.div`
  position: absolute;
  top: 554px;
  left: 1440px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 11;
`

const StyledCategoryItem = styled(Link)`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #575757;
  text-align: right;
  line-height: 1;
  height: 69px;
  display: flex;
  align-items: flex-start;
  white-space: nowrap;
  
  /* Убираем оформление стандартной ссылки */
  text-decoration: none; 
  cursor: pointer;
  z-index: 100;
  position: relative;

  /* Эффект при наведении */
  &:hover {
    color: #03043c;
    opacity: 0.8;
  }

  &.active { 
    color: #03043c; 
    font-weight: 500; /* Делаем активный пункт еще жирнее */
  }
`;

// ─── Equipment Labels ─────────────────────────────────────────────────────────

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  color: #bcbcbc;
  text-align: right;

  &.main { top: 1060px; left: 928px; font-size: 110px; }
  &.sub  { top: 983px;  left: 935px; font-size: 55px;  }
`

// ─── СВЯЗАТЬСЯ ────────────────────────────────────────────────────────────────

const StyledContactBox = styled.a`
  position: absolute;
  top: 995px;
  left: 570px;
  width: 232px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: #000f46;
  text-align: right;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;
  text-decoration: none;
  box-sizing: border-box;

  &:hover { color: #575757; }
`

// ─── Section 1: Spiral ────────────────────────────────────────────────────────

const StyledSpiralTitle = styled.div`
  position: absolute;
  top: 1220px;
  left: 931px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 37px;
  color: #000f46;
  text-align: right;
`

const StyledSpiralDesc = styled.p`
  position: absolute;
  top: 1280px;
  left: 936px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;
`

const StyledProductLabel1 = styled.div`
  position: absolute;
  top: 1415px;
  left: 363px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

// ─── Section 2: Water Lubricated ──────────────────────────────────────────────

const StyledWaterTitle = styled.p`
  position: absolute;
  top: 2182px;
  left: 595px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 39px;
  color: #000f46;
  text-align: right;
  margin: 0;
`

const StyledWaterDesc = styled.p`
  position: absolute;
  top: 2245px;
  left: 595px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;
`

const StyledProductLabel2 = styled.div`
  position: absolute;
  top: 2260px;
  left: 439px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

// ─── Section 3: Bolaite Brand ─────────────────────────────────────────────────

const StyledBolaiteLabel = styled.div`
  position: absolute;
  top: 2659px;
  left: 275px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
`

const StyledBolaiteBrand = styled.div`
  position: absolute;
  top: 2679px;
  left: 266px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 80px;
  color: #000f46;
`

const StyledBolaiteDesc = styled.p`
  position: absolute;
  top: 2785px;
  left: 100px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  text-align: right;
  line-height: 1.6;
  margin: 0;
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledProductImg = styled.img`
  position: absolute;
  z-index:100;

  &.spiral    { top: 1330px; left: 788px;  width: 968px; height: 720px; }
  &.oil-free  { top: 1460px; left: 190px;  width: 520px; height: 440px; object-fit: contain; }
  &.image5    { top: 2410px; left: 972px;  width: 574px; height: 459px; }
  &.airend    { top: 2312px; left: 569px;  width: 1100px; height: 818px; }
  &.blw       { top: 2497px; left: 510px;  width: 717px; height: 717px; object-fit: cover; }
`

// ─── Spec Block (Finalized with Align) ────────────────────────────────────────

const StyledSpecBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  /* Прижимаем всё содержимое блока к правому краю (к линии) */
  align-items: flex-end; 
  text-align: right;
  z-index: 10;
`;

const StyledSpecLabel = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 500; /* Делаем заголовок чуть легче, как на макете */
  font-size: 16px;
  color: #a5a5a5;
  white-space: nowrap;
  line-height: 1.2;
`;

const StyledSpecValue = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600; /* Значения оставляем жирными (акцент) */
  font-size: 16px;
  color: #d2d2d2;
  white-space: nowrap;
  margin-top: 4px; /* Отступ от заголовка к числу */
  line-height: 1.2;
`;

const StyledSpecGap = styled.div`
  height: 16px; /* Расстояние между парами характеристик */
`;

const SpecBlock = ({ top, left, pressure, fad, power }) => (
  <StyledSpecBlock style={{ top, left }}>
    <StyledSpecLabel>Макс. рабочее давление:</StyledSpecLabel>
    <StyledSpecValue>{pressure || '8-10 бар'}</StyledSpecValue>
    
    <StyledSpecGap />
    
    <StyledSpecLabel>Мощность FAD*</StyledSpecLabel>
    <StyledSpecValue>{fad || '0,25-13 м3/мин'}</StyledSpecValue>
    
    <StyledSpecGap />
    
    <StyledSpecLabel>Мощность двигателя*</StyledSpecLabel>
    <StyledSpecValue>{power || '7,5-25 кВт'}</StyledSpecValue>
  </StyledSpecBlock>
);

// ─── Form ─────────────────────────────────────────────────────────────────────

const StyledFormTitle = styled.h2`
  position: absolute;
  top: 3440px;
  left: 450px;
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
`

const StyledFormSubtitle = styled.p`
  position: absolute;
  top: 3533px;
  left: 870px;
  color: #b5b6bb;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.3;
  margin: 0;
`

const StyledFormWrapper = styled.form`
  position: absolute;
  top: 3823px;
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
  top: 4003px;
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
  background: #272b37;
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
    background: #272b37;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: 0;
    border-radius: 0 8px 8px 8px;
  }

  &:hover::after { transform: scaleX(1); }
  &:hover { color: white; }

  span {
    position: relative;
    z-index: 1;
  }
`

// ─── Footer ──────────────────────────────────────────────────────────────────

const StyledFooter = styled.footer`
  position: absolute;
  top: 4223px;
  left: 0;
  width: 1920px;
  text-align: center;
`

const StyledFooterText = styled.p`
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  color: black;
  line-height: 1.6;
  margin: 0 auto;
`

// ─── Dots ─────────────────────────────────────────────────────────────────────

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

  { top: 565,  left: 549  },
  { top: 630,  left: 845  },
  { top: 701,  left: 1088 },
  { top: 770,  left: 1256 },
  { top: 994,  left: 549  },
  { top: 1064, left: 549  },
  { top: 994,  left: 845  },
  { top: 1064, left: 845  },
  /* section-1: боковые полосы (линия 1064px) */
  { top: 1064, left: 31   },
  { top: 1064, left: 1889 },
  /* section-2: как section-3 (линия 2145px) */
  { top: 2145, left: 31   },
  { top: 2145, left: 549  },
  { top: 2145, left: 1749 },
  { top: 2145, left: 1889 },
  /* section-3: боковые + VDivider 548 + VDivider3 1748 (VDivider2 844 не доходит до 3220) */
  { top: 3220, left: 31   },
  { top: 3220, left: 549  },
  { top: 3220, left: 1749 },
  { top: 3220, left: 1889 },
  /* section-4 / section-5 × боковые полосы (центр 8px-точки на пересечении) */
  { top: 4307, left: 31  },
  { top: 4307, left: 1889 },
  { top: 5269, left: 31   },
  { top: 5269, left: 1889 },
]

const IMG = (name) => `/images/frame11/${name}`

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

// ─── Component ───────────────────────────────────────────────────────────────

const OilFreePage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('+7')
  const [formEmail, setFormEmail] = useState('')
  const [formStatus, setFormStatus] = useState(null)
  const [formFieldErrors, setFormFieldErrors] = useState({ name: false, phone: false, email: false })
  const { pathname } = useLocation()

  const API_URL = import.meta.env.VITE_API_URL || ''

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
        body: JSON.stringify({ name: formName, phone: formPhone, email: formEmail }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success !== false) {
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
        <StyledFrame>

          {/* ── Grid ── */}
          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledBottomLine />
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="compressor-1" />
          <StyledHLine className="compressor-2" />
          <StyledHLine className="compressor-3" />
          <StyledHLine className="compressor-4" />
          <StyledHLine className="compressor-5" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

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

          {/* ── Header ── */}
          <Header />

          {/* ── Hero ── */}
          <StyledHeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Компрессорная продукция Bolaite
          </StyledHeroTitle>

          <StyledHeroSubtext>
            —символ надежности,<br />
            высокого качества<br />
            в превосходной производительности<br />
            в сфере промышленности
          </StyledHeroSubtext>

          <StyledDescriptionLeft>
            Компрессорное оборудование<br />
            инвестиция в будущее вашего бизнеса
          </StyledDescriptionLeft>

          {/* ── Category Nav ── */}
          <StyledCategoryList>
            <StyledCategoryItem 
              to="/products/oil-injected" 
              className={pathname === '/products/oil-injected' ? 'active' : ''}
            >
              ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>

            <StyledCategoryItem 
              to="/products/oil-free" 
              className={pathname === '/products/oil-free' ? 'active' : ''}
            >
              БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>

            <StyledCategoryItem 
              to="/products/portable" 
              className={pathname === '/products/portable' ? 'active' : ''}
            >
              ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>

            <StyledCategoryItem 
              to="/products/air-treatment" 
              className={pathname === '/products/air-treatment' ? 'active' : ''}
            >
              ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА
            </StyledCategoryItem>
          </StyledCategoryList>

          <StyledEquipmentLabel className="sub">БЕЗМАСЛЯННЫЕ ВОЗДУШНЫЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="main">КОМПРЕССОРЫ</StyledEquipmentLabel>

          <StyledContactBox href="#request-form">СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── Spiral Section ── */}
          <StyledSpiralTitle>Спиральный безмасляный компрессор</StyledSpiralTitle>
          <StyledSpiralDesc>
            Серия, объединившая обширный опыт и знания Atlas Copco<br />
            в прогрессивном решении
          </StyledSpiralDesc>

          <StyledProductImg
            className="spiral"
            src={IMG('Spiral_Air_OilFreeCompressor 1.png')}
            alt="Продажа безмасляного спирального компрессора цена — Иркутск, Новая Техника"
            width={968}
            height={720}
            {...heroImageProps}
          />
          <StyledProductImg
            className="oil-free"
            src={IMG('oil-free-800-800 1.png')}
            alt="Безмасляный компрессор Bolaite — купить в Иркутске, промышленное оборудование"
            {...lazyImageProps(520, 440)}
          />
          <StyledProductLabel1>TH PM 10-100 л.с.</StyledProductLabel1>

          <SpecBlock 
            top={1930}
            left={323} 
            pressure="8-10 бар" 
            fad="6,8-147 м3/ч" 
            power="1,5-4*5,5 кВт" 
          />

          {/* ── Water Lubricated Section ── */}
          <StyledWaterTitle>Безмасляный компрессор с водяной смазкой</StyledWaterTitle>
          <StyledWaterDesc>
            Ассортимент высоконадежных компрессоров,<br />
            обеспечивающих 100% безмасляный чистый воздух
          </StyledWaterDesc>

          <StyledProductImg
            className="airend"
            src={IMG('airend-2-800-800 1.png')}
            alt="Безмасляный компрессор с водяной смазкой — продажа и сервис Иркутск"
            {...lazyImageProps(1100, 818)}
          />
          <StyledProductImg
            className="image5"
            src={IMG('image 5.png')}
            alt="Промышленный безмасляный компрессор — Новая Техника Иркутск"
            {...lazyImageProps(574, 459)}
          />
          <StyledProductImg
            className="blw"
            src={IMG('blw-oil-free-800-800 1.png')}
            alt="Безмасляный компрессор Bolaite BLW — цена, наличие Иркутск"
            {...lazyImageProps(717, 717)}
          />

          <StyledProductLabel2>BLW-50A</StyledProductLabel2>  
          <SpecBlock 
            top={2312}
            left={323} 
            pressure="8-10 бар" 
            fad="6,8-147 м3/ч" 
            power="1,5-4*5,5 кВт" 
          />

          {/* ── Bolaite Brand Section ── */}
          <StyledBolaiteLabel>Безмаслянный компрессор</StyledBolaiteLabel>
          <StyledBolaiteBrand>Bolaite</StyledBolaiteBrand>
          <StyledBolaiteDesc>
            Подходит для крупных производственных площадок<br />
            Герметичный и высокоэффективный<br />
            Разработан Atlas Copco
          </StyledBolaiteDesc>

          {/* ── Form ── */}
          <StyledFormTitle id="request-form">ОСТАВИТЬ ЗАЯВКУ</StyledFormTitle>

          <StyledFormSubtitle>
            Поможем подобрать компрессор,
            <br />
            соответствующий вашим запросам
          </StyledFormSubtitle>

          <StyledFormWrapper id="contact-form" onSubmit={handleSubmit} aria-label="Форма заявки">
            <StyledFormLine $left={0} />
            <StyledFormLine $left={520} />
            <StyledFormLine $left={1030} />

            <StyledFormLabel htmlFor="of-name-input" $left={0} $top={10}>
              ИМЯ
            </StyledFormLabel>
            <StyledFormInput
              id="of-name-input"
              type="text"
              value={formName}
              onChange={(e) => {
                setFormName(capitalizeFirst(e.target.value))
                setFormFieldErrors((prev) => ({ ...prev, name: false }))
              }}
              aria-label="Имя"
              $left={0}
            />

            <StyledFormLabel htmlFor="of-phone-input" $left={520} $top={10}>
              НОМЕР ТЕЛЕФОНА
            </StyledFormLabel>
            <StyledFormInput
              id="of-phone-input"
              type="tel"
              value={formPhone}
              onChange={handlePhoneChange}
              aria-label="Номер телефона"
              $left={520}
            />

            <StyledFormLabel htmlFor="of-email-input" $left={1030} $top={10}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </StyledFormLabel>
            <StyledFormInput
              id="of-email-input"
              type="email"
              value={formEmail}
              onChange={(e) => {
                setFormEmail(e.target.value)
                setFormFieldErrors((prev) => ({ ...prev, email: false }))
              }}
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
            <StyledSubmitInner type="submit" form="contact-form">
              <span>ОТПРАВИТЬ</span>
            </StyledSubmitInner>
          </StyledSubmitBlock>

          {formStatus === 'success' && (
            <div style={{ position: 'absolute', top: 4083, left: 262, color: '#4CAF50', fontFamily: 'Inter, sans-serif', fontSize: 18 }}>
              Заявка отправлена!
            </div>
          )}
          {formStatus === 'error' && (
            <div style={{ position: 'absolute', top: 4083, left: 262, color: '#f44336', fontFamily: 'Inter, sans-serif', fontSize: 18 }}>
              Ошибка. Попробуйте позже.
            </div>
          )}

          {/* ── Footer ── */}
          <StyledFooter>
            <StyledFooterText>
              телефон +7 (395) 297-90-37<br />
              почта: Office@ntechnics.ru<br />
              адрес: Иркутск, Трилиссера 87
            </StyledFooterText>
          </StyledFooter>

        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export { OilFreePage as default }