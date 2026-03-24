import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'

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

  &.section-1    { top: 1064px;  left: 0;    width: 1920px; }
  &.section-2    { top: 2145px;  left: 0;    width: 1920px; }
  &.section-3    { top: 3220px;  left: 1px;  width: 1920px; }
  &.diesel-line  { top: 2022px;  left: 850px; width: 1070px; }
  &.mid-line     { top: 1723px;  left: 549px; width: 212px; }

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

const StyledDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  background: white;
  border: 1px solid #9c9e9d;
  border-radius: 50%;
  z-index: 150;
`

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
  left: 167px;
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

const StyledCategoryItem = styled.span`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;
  text-align: right;
  line-height: 1;
  height: 69px;
  display: flex;
  align-items: flex-start;
  white-space: nowrap;

  &.active { color: #000f46; }
`

// ─── Equipment Labels ─────────────────────────────────────────────────────────

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  color: #bcbcbc;
  text-align: right;

  &.main { top: 1060px; left: 928px; font-size: 110px; }
  &.sub  { top: 983px;  left: 931px; font-size: 60px;  }
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

// ─── Section 1: Diesel ────────────────────────────────────────────────────────

const StyledDieselTitle = styled.div`
  position: absolute;
  top: 1220px;
  left: 936px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 37px;
  color: #000f46;
  text-align: right;
`

const StyledDieselDesc = styled.p`
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

// ─── Section 2: Electric ──────────────────────────────────────────────────────

const StyledElectricTitle = styled.div`
  position: absolute;
  top: 2084px;
  left: 848px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 39px;
  color: #000f46;
  text-align: right;
`

const StyledElectricDesc = styled.p`
  position: absolute;
  top: 2167px;
  left: 853px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;
`

// ─── Use Cases ────────────────────────────────────────────────────────────────

const StyledUseCaseTitle = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #000f46;
  text-align: right;

  &.case-1 { top: 1230px; left: 210px; }
  &.case-2 { top: 1561px; left: 103px; }
  &.case-3 { top: 1908px; left: 122px; font-size: 25px; white-space: nowrap; }
  &.case-4 { top: 2268px; left: 622px; font-size: 25px; white-space: nowrap; }
  &.case-5 { top: 2568px; left: 621px; font-size: 25px; white-space: nowrap; }
`

const StyledUseCaseDesc = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #575757;
  text-align: right;
  line-height: 1.6;
  margin: 0;

  &.desc-1 { top: 1312px; left: 76px; }
  &.desc-2 { top: 1653px; left: 90px; }
  &.desc-3 { top: 1970px; left: 90px; }
  &.desc-4 { top: 2327px; left: 622px; text-align: left; }
  &.desc-5 { top: 2629px; left: 621px; text-align: left; }
`

const StyledUseCaseLabel = styled.span`
  font-weight: 600;
  font-family: Inter, sans-serif;
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledProductImg = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: 100;

  &.portable-3  { top: 1158px; left: 670px;  width: 847px; height: 847px; }
  &.portable-2  { top: 1479px; left: 1591px; width: 260px; height: 260px; }
  &.portable-4  { top: 1669px; left: 1594px; width: 254px; height: 254px; }
  &.portable-5a { top: 1271px; left: 1589px; width: 263px; height: 263px; }
  &.electric-6  { top: 2350px; left: 975px;  width: 923px; height: 923px; }
  &.portable-5b { top: 2292px; left: 134px;  width: 322px; height: 322px; }
  &.electric-4  { top: 2764px; left: 161px;  width: 286px; height: 286px; }
  &.electric-2  { top: 2529px; left: 162px;  width: 293px; height: 293px; }
`

// ─── Side dots for image groups ───────────────────────────────────────────────


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
  font-weight: 700;
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
  { top: 11.5, left: 26.5  },
  { top: 86.5, left: 26.5  },
  { top: 11.5, left: 544.5 },
  { top: 86.5, left: 544.5 },
  { top: 11.5, left: 840.5 },
  { top: 86.5, left: 840.5 },
  { top: 11.5, left: 1114.5 },
  { top: 86.5, left: 1114.5 },
  { top: 11.5, left: 1314.5 },
  { top: 86.5, left: 1314.5 },
  { top: 11.5, left: 1884.5 },
  { top: 86.5, left: 1884.5 },
  { top: 562,  left: 545  },
  { top: 627,  left: 840  },
  { top: 697,  left: 1088 },
  { top: 767,  left: 1256 },
  { top: 991,  left: 545  },
  { top: 1060, left: 545  },
  { top: 991,  left: 840  },
  { top: 1060, left: 840  },
  /* section-1: боковые полосы (линия 1064px) */
  { top: 1061, left: 26.5   },
  { top: 1061, left: 1884.5 },
  /* section-2: как section-3 (линия 2145px) */
  { top: 2142, left: 26.5   },
  { top: 2142, left: 545    },
  { top: 2142, left: 1884.5 },
  /* section-3 × боковые полосы + вертикали 548 / 844 */
  { top: 3217, left: 26.5   },
  { top: 3217, left: 545    },
  { top: 3217, left: 1884.5 },
  /* right-group: центры трёх изображений на правой полосе */
  { top: 1398.5, left: 1884.5 },
  { top: 1605,   left: 1884.5 },
  { top: 1792,   left: 1884.5 },
  /* left-group: центры трёх изображений на левой полосе */
  { top: 2449,   left: 26.5 },
  { top: 2671.5, left: 26.5 },
  { top: 2903,   left: 26.5 },
  /* bottom line (4199px): боковые полосы */
  { top: 4195.5, left: 26.5   },
  { top: 4195.5, left: 1884.5 },
]

const IMG = (name) => `/images/frame12/${name}`

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

const PortablePage = () => {
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
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="diesel-line" />
          <StyledHLine className="mid-line" />
          <StyledHLine className="compressor-1" />
          <StyledHLine className="compressor-2" />
          <StyledHLine className="compressor-3" />
          <StyledHLine className="compressor-4" />
          <StyledHLine className="compressor-5" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
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
            <StyledCategoryItem className={pathname === '/products/oil-injected' ? 'active' : ''}>
              ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/oil-free' ? 'active' : ''}>
              БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/portable' ? 'active' : ''}>
              ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
            </StyledCategoryItem>
            <StyledCategoryItem className={pathname === '/products/air-treatment' ? 'active' : ''}>
              ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА
            </StyledCategoryItem>
          </StyledCategoryList>

          <StyledEquipmentLabel className="sub">ПОРТАТИВНЫЕ ВОЗДУШНЫЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="main">КОМПРЕССОРЫ</StyledEquipmentLabel>

          <StyledContactBox href="#request-form">СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── Diesel Section ── */}
          <StyledDieselTitle>Дизельный портативный компрессор</StyledDieselTitle>
          <StyledDieselDesc>
            Оснащены дизельным двигателем<br />
            для буксировки и работы без электропитания
          </StyledDieselDesc>

          <StyledProductImg
            className="portable-3"
            src={IMG('liutech-portable-compressor-3-800-800.jpg 1.png')}
            alt="Дизельный передвижной компрессор цена — Liutech, Новая Техника Иркутск"
            width={847}
            height={847}
            {...heroImageProps}
          />
          <StyledProductImg
            className="portable-2"
            src={IMG('liutech-portable-compressor-2-800-800 1.png')}
            alt="Передвижной компрессор Liutech — купить в Иркутске"
            {...lazyImageProps(260, 260)}
          />
          <StyledProductImg
            className="portable-4"
            src={IMG('liutech-portable-compressor-4-800-800 1.png')}
            alt="Промышленный передвижной воздушный компрессор Иркутск"
            {...lazyImageProps(254, 254)}
          />
          <StyledProductImg
            className="portable-5a"
            src={IMG('liutech-portable-compressor-5-800-800.jpg 1.png')}
            alt="Дизельный передвижной компрессор в наличии — Иркутск"
            {...lazyImageProps(263, 263)}
          />


          {/* Use Case 1 */}
          <StyledUseCaseTitle className="case-1">
            БУРЕНИЕ НАЗЕМНЫХ<br />ИНЖЕНЕРНЫХ КВАЖИН
          </StyledUseCaseTitle>
          <StyledUseCaseDesc className="desc-1">
            <StyledUseCaseLabel>РЕКОМЕНДУЕМЫЕ МОДЕЛИ<br /></StyledUseCaseLabel>
            LUY120-7, LUY135D-13, LUY13CO-7, LUY13DD-10,<br />
            LUY120-14, LUY150-15, LUY160-17, LUY238D-14, LUY280D-8 5<br />
            <StyledUseCaseLabel>Номинальное рабочее давление</StyledUseCaseLabel>: от 7 до 17 бар<br />
            <StyledUseCaseLabel>Свободная подача воздуха:</StyledUseCaseLabel> от 12 до 28 м3/мин<br />
            <StyledUseCaseLabel>Максимальная температура окружающего воздуха:</StyledUseCaseLabel> 50 *С
          </StyledUseCaseDesc>

          {/* Use Case 2 */}
          <StyledUseCaseTitle className="case-2">
            КОММУНАЛЬНОЕ ХОЗЯЙСТВО<br />АБРАЗИВОСТРУЙНАЯ ОЧИСТКА
          </StyledUseCaseTitle>
          <StyledUseCaseDesc className="desc-2">
            <StyledUseCaseLabel>РЕКОМЕНДУЕМЫЕ МОДЕЛИ<br /></StyledUseCaseLabel>
            LUY100-10, LUY100-12, LUY120-7, LUY200-10, LUY220-8<br />
            <StyledUseCaseLabel>Номинальное рабочее давление</StyledUseCaseLabel>: от 7 до 10 бар<br />
            <StyledUseCaseLabel>Свободная подача воздуха:</StyledUseCaseLabel> от 10 до 22 м3/мин<br />
            <StyledUseCaseLabel>Максимальная температура окружающего воздуха:</StyledUseCaseLabel> 50 *С
          </StyledUseCaseDesc>

          {/* Use Case 3 */}
          <StyledUseCaseTitle className="case-3">БУРЕНИЕ ВЗРЫВНЫХ СКВАЖИН</StyledUseCaseTitle>
          <StyledUseCaseDesc className="desc-3">
            <StyledUseCaseLabel>РЕКОМЕНДУЕМЫЕ МОДЕЛИ<br /></StyledUseCaseLabel>
            LUY120-14, LUY160-17, LUY180-19, LUY220D-21,<br />
            LUY250D-21, LUY290D-21<br />
            <StyledUseCaseLabel>Номинальное рабочее давление</StyledUseCaseLabel>: от 14 до 21 бар<br />
            <StyledUseCaseLabel>Свободная подача воздуха:</StyledUseCaseLabel> от 12 до 29 м3/мин<br />
            <StyledUseCaseLabel>Максимальная температура окружающего воздуха:</StyledUseCaseLabel> 50 *С
          </StyledUseCaseDesc>

          {/* ── Electric Section ── */}
          <StyledElectricTitle>Электрический портативный компрессор</StyledElectricTitle>
          <StyledElectricDesc>
            Идеальный выбор для пунктов проката и клиентских площадок.<br />
            Сочтание мобильности и экологичных двигателей
          </StyledElectricDesc>

          <StyledProductImg
            className="electric-6"
            src={IMG('liutech-electical-portable-compressor-6-800-800.jpg 1.png')}
            alt="Электрический передвижной компрессор Liutech — цена Иркутск"
            {...lazyImageProps(923, 923)}
          />
          <StyledProductImg
            className="portable-5b"
            src={IMG('liutech-portable-compressor-5-800-800.jpg 2.png')}
            alt="Передвижной компрессор для стройки — Новая Техника Иркутск"
            {...lazyImageProps(322, 322)}
          />
          <StyledProductImg
            className="electric-4"
            src={IMG('liutech-electical-portable-compressor-4-800-800.jpg 1.png')}
            alt="Электрический промышленный компрессор передвижной — Иркутск"
            {...lazyImageProps(286, 286)}
          />
          <StyledProductImg
            className="electric-2"
            src={IMG('liutech-electical-portable-compressor-2-800-800.jpg 1.png')}
            alt="Передвижной компрессор Liutech электрический — купить в Иркутске"
            {...lazyImageProps(293, 293)}
          />


          {/* Use Case 4 */}
          <StyledUseCaseTitle className="case-4">БУРЕНИЕ ПОД ВЫСОКИМ ДАВЛЕНИЕМ</StyledUseCaseTitle>
          <StyledUseCaseDesc className="desc-4">
            <StyledUseCaseLabel>РЕКОМЕНДУЕМЫЕ МОДЕЛИ<br /></StyledUseCaseLabel>
            LUY180-19, LUY310-25, LUY390-25, LUY390-30, LUY340-34<br />
            <StyledUseCaseLabel>Номинальное рабочее давление</StyledUseCaseLabel>: от 19 до 34 бар<br />
            <StyledUseCaseLabel>Свободная подача воздуха:</StyledUseCaseLabel> от 18 до 39 м3/мин<br />
            <StyledUseCaseLabel>Максимальная температура окружающего воздуха:</StyledUseCaseLabel> 50 *С
          </StyledUseCaseDesc>

          {/* Use Case 5 */}
          <StyledUseCaseTitle className="case-5">СТРОИТЕЛЬСТВО</StyledUseCaseTitle>
          <StyledUseCaseDesc className="desc-5">
            <StyledUseCaseLabel>РЕКОМЕНДУЕМЫЕ МОДЕЛИ<br /></StyledUseCaseLabel>
            LUY050-7, LUY120-7, LUY085-14, LUY106-1D, LUY130D-7<br />
            <StyledUseCaseLabel>Номинальное рабочее давление</StyledUseCaseLabel>: 7-14 бар<br />
            <StyledUseCaseLabel>Свободная подача воздуха:</StyledUseCaseLabel> 5-13 м3/мин<br />
            <StyledUseCaseLabel>Максимальная температура окружающего воздуха:</StyledUseCaseLabel> 50 *С
          </StyledUseCaseDesc>

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

            <StyledFormLabel htmlFor="pp-name-input" $left={0} $top={10}>
              ИМЯ
            </StyledFormLabel>
            <StyledFormInput
              id="pp-name-input"
              type="text"
              value={formName}
              onChange={(e) => {
                setFormName(capitalizeFirst(e.target.value))
                setFormFieldErrors((prev) => ({ ...prev, name: false }))
              }}
              aria-label="Имя"
              $left={0}
            />

            <StyledFormLabel htmlFor="pp-phone-input" $left={520} $top={10}>
              НОМЕР ТЕЛЕФОНА
            </StyledFormLabel>
            <StyledFormInput
              id="pp-phone-input"
              type="tel"
              value={formPhone}
              onChange={handlePhoneChange}
              aria-label="Номер телефона"
              $left={520}
            />

            <StyledFormLabel htmlFor="pp-email-input" $left={1030} $top={10}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </StyledFormLabel>
            <StyledFormInput
              id="pp-email-input"
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

export { PortablePage as default }