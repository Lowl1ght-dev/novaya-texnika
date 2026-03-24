import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 4320

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

// ─── Background gradient (starts at 890px) ───────────────────────────────────

const StyledGradientBg = styled.div`
  position: absolute;
  top: 890px;
  left: 0;
  width: 1920px;
  height: 3430px;
  background: linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(151,151,156,1) 47%, rgba(96,96,104,1) 62%, rgba(51,51,61,1) 96%);
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
  height: 75px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1px;
  height: 75px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider3 = styled.div`
  position: absolute;
  top: 16px;
  left: 1118px;
  width: 1px;
  height: 1049px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider4 = styled.div`
  position: absolute;
  top: 16px;
  left: 1318px;
  width: 1px;
  height: 2130px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledHLine = styled.div`
  position: absolute;
  height: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.top         { top: 15px;   left: 0;      width: 1920px; }
  &.section-1   { top: 1070px; left: 0;      width: 1920px; }
  &.section-2   { top: 2145px; left: 0;      width: 1920px; }
  &.section-3   { top: 3220px; left: 1px;    width: 1920px; }
  &.bottom      { top: 4199px; left: 0;      width: 1920px; }
  &.contact-top { top: 1004px; left: 1120px; width: 200px;  }
  &.contact-bot { top: 1070px; left: 1119px; width: 201px;  }
`

const aboutLineLeftTaperMask =
  'linear-gradient(to right, transparent 0%, black 6%, black 100%)'

const StyledAboutLine = styled.div`
  position: absolute;
  top: 1004px;
  left: 196px;
  width: 1006px;
  height: 1px;
  background: #9c9e9d;
  z-index: 100;
  mask-image: ${aboutLineLeftTaperMask};
  -webkit-mask-image: ${aboutLineLeftTaperMask};
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
`

const taperedMask = 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'

const StyledTaperedLine = styled.div`
  position: absolute;
  height: 1px;
  background: #9C9E9D;
  z-index: 100;
  mask-image: ${taperedMask};
  -webkit-mask-image: ${taperedMask};
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;

  &.hero-line   { top: 784px;  left: 470px;  width: 650px; }
  &.stat-line-1 { top: 1390px; left: 1463px; width: 300px; }
  &.stat-line-2 { top: 1610px; left: 1463px; width: 300px; }
  &.stat-line-3 { top: 1830px; left: 1463px; width: 300px; }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 1004px; left: 1118px; height: 66px; }
  &.right { top: 1004px; left: 1318px; height: 67px; }
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

// ─── Hero / Intro ─────────────────────────────────────────────────────────────

const StyledBolaiteBrand = styled.div`
  position: absolute;
  top: 818px;
  left: 826px;
  width: 264px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #98989a;
  text-align: right;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2em;
  box-sizing: border-box;
`

/* Одна полоса ≈ 2.5× ширина дефиса «-» при том же font-size (≈0.26em на знак в Inter 600) */
const StyledBolaiteDash = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: calc(2.5 * 0.26em);
  height: 0.07em;
  min-height: 2px;
  background: currentColor;
  vertical-align: middle;
`

const StyledHeroText = styled.p`
  position: absolute;
  top: 893px;
  left: -50px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 25px;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledHeroTextGray = styled.span`
  color: #9c9e9d;
`

const StyledHeroTextBlue = styled.span`
  color: #000f46;
  font-weight: 700;
`

const StyledServiceDesc = styled.div`
  position: absolute;
  top: 609px;
  left: 1336px;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #9c9e9d;
  line-height: 1.4;
`

// ─── СВЯЗАТЬСЯ ────────────────────────────────────────────────────────────────

const StyledContactBox = styled.a`
  position: absolute;
  top: 1004px;
  left: 1118px;
  width: 200px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #000f46;
  text-align: center;
  white-space: nowrap;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;
  text-decoration: none;
  box-sizing: border-box;

  &:hover { color: #575757; }
`

// ─── About / Manufacturer ─────────────────────────────────────────────────────

const StyledAboutLabel = styled.div`
  position: absolute;
  top: 1126px;
  left: 118px;
  width: 556px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: #cbcbd2;
  letter-spacing: 0.5px;
  white-space: nowrap;
`

const StyledAboutTitle = styled.h1`
  position: absolute;
  top: 1210px;
  left: 118px;
  margin: 0;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 52px;
  color: #000f46;
  text-align: right;
`

const StyledAboutDesc = styled.p`
  position: absolute;
  top: 1277px;
  left: 118px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: #9c9e9d;
  line-height: 1.5;
  margin: 0;
`

// ─── Stats ────────────────────────────────────────────────────────────────────

const StyledStatItem = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 32px;
  line-height: 1.3;
  color: #9c9e9d;
  text-align: center;
  z-index: 100;

  &.stat-1 { top: 1283px; left: 1405px; width: 416px; }
  &.stat-2 { top: 1503px; left: 1405px; width: 416px; }
  &.stat-3 { top: 1723px; left: 1405px; width: 416px; }
`

// ─── Circle decoration ───────────────────────────────────────────────────────

const StyledCircle = styled.div`
  position: absolute;
  top: 1510px;
  left: 600px;
  width: 461px;
  height: 458px;
  border-radius: 50%;
  border: 2px solid #757575;
  z-index: 1;
`

// ─── Certificates Section ─────────────────────────────────────────────────────

const StyledCertTitle = styled.h2`
  position: absolute;
  top: 2194px;
  left: 330px;
  margin: 0;
  font-family: Inter, sans-serif;
  font-weight: 200;
  font-size: 130px;
  color: white;
  letter-spacing: 1.3px;
`

const StyledCertDesc = styled.p`
  position: absolute;
  top: 2348px;
  left: 162px;
  width: 1140px;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 23.5px;
  color: white;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledCertLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: white;
  text-align: center;
  line-height: 1.5;

  &.c1  { top: 2809px; left: 1487px; width: 243px; }
  &.c2  { top: 3140px; left: 1052px; width: 155px; }
  &.c3  { top: 3140px; left: 813px;  width: 155px; }
  &.c4  { top: 2482px; left: 1532px; width: 155px; }
  &.c5  { top: 3140px; left: 581px;  width: 155px; }
  &.c6  { top: 3140px; left: 349px;  width: 155px; }
  &.c7  { top: 3140px; left: 117px;  width: 155px; }
  &.c8  { top: 2818px; left: 349px;  width: 155px; }
  &.c9  { top: 2809px; left: 580px;  width: 155px; }
  &.c10 { top: 2809px; left: 766px;  width: 247px; }
  &.c11 { top: 2809px; left: 1073px; width: 247px; }
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledImg = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: 100;

  &.logo-badge  { top: 355px;  left: 177px;  width: 819px;  height: 197px; object-fit: contain; }
  &.compressor  { top: 1353px; left: 330px;  width: 622px;  height: 728px; object-fit: contain; }
  &.detail-1    { top: 1457px; left: 844px;  width: 138px;  height: 136px; }
  &.detail-4    { top: 1599px; left: 967px;  width: 138px;  height: 139px; }
  &.detail-10   { top: 1800px; left: 943px;  width: 140px;  height: 139px; }
  &.detail-11   { top: 1889px; left: 780px;  width: 142px;  height: 139px; }
  /* сертификаты — координаты точно из автогена */
  &.cert-iso1   { top: 2870px; left: 797px;  width: 186px; height: 262px; }
  &.cert-007    { top: 2870px; left: 1030px; width: 193px; height: 266px; }
  &.cert-snip   { top: 2868px; left: 568px;  width: 182px; height: 264px; }
  &.cert-ce     { top: 2538px; left: 564px;  width: 189px; height: 267px; }
  &.cert-0504   { top: 2210px; left: 1422px; width: 375px; height: 265px; }
  &.cert-5651   { top: 2538px; left: 796px;  width: 187px; height: 265px; }
  &.cert-2360   { top: 2538px; left: 1422px; width: 375px; height: 266px; }
  &.cert-8913   { top: 2538px; left: 1030px; width: 345px; height: 267px; }
  &.cert-7810   { top: 2868px; left: 333px;  width: 187px; height: 264px; }
  &.cert-4051   { top: 2868px; left: 103px;  width: 187px; height: 264px; }
  &.cert-3887   { top: 2538px; left: 333px;  width: 187px; height: 265px; }
`

// ─── Form (структура как на продуктовых страницах; тёмный фон секции) ─────────

const StyledFormTitle = styled.h2`
  position: absolute;
  top: 3440px;
  left: 450px;
  color: white;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
`

const StyledFormSubtitle = styled.p`
  position: absolute;
  top: 3533px;
  left: 870px;
  color: #d9d9d9;
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
  color: white;
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
  color: white;
`

const StyledFieldError = styled(motion.div)`
  position: absolute;
  width: 366px;
  text-align: center;
  color: #ffcdd2;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  background: rgba(244, 67, 54, 0.15);
  border-radius: 8px;
  border-left: 4px solid #ef5350;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
  background: white;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
`

const StyledSubmitInner = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: #272b37;
  border: 1px solid #9c9e9d;
  border-radius: 0 8px 8px 8px;
  color: white;
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
    background: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    z-index: 0;
    border-radius: 0 8px 8px 8px;
  }

  &:hover::after { transform: scaleX(1); }
  &:hover { color: #272b37; }

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
  font-weight: 200;
  font-size: 16px;
  color: white;
  line-height: 1.6;
  margin: 0 auto;
`

// ─── Dots ─────────────────────────────────────────────────────────────────────

const DOT_POSITIONS = [
  { top: 1067, left: 1316 },
  { top: 1067, left: 1116 },
  { top: 1001, left: 1316 },
  { top: 1001, left: 1116 },
  { top: 12,   left: 27   },
  { top: 86,   left: 27   },
  { top: 12,   left: 545  },
  { top: 86,   left: 545  },
  { top: 12,   left: 840  },
  { top: 86,   left: 840  },
  { top: 12,   left: 1115 },
  { top: 86,   left: 1115 },
  { top: 12,   left: 1315 },
  { top: 86,   left: 1315 },
  { top: 12,   left: 1885 },
  { top: 86,   left: 1885 },
  /* section-1: боковые полосы (линия 1070px) */
  { top: 1067, left: 27   },
  { top: 1067, left: 1885 },
  /* section-2: боковые + пересечение с VDivider4 1318px (линия 2145px) */
  { top: 2142, left: 27   },
  { top: 2142, left: 1315 },
  { top: 2142, left: 1885 },
  /* section-3: только боковые полосы (внутренние вертикали не доходят до 3220px) */
  { top: 3217, left: 27   },
  { top: 3217, left: 1885 },
  /* bottom line (4199px): боковые полосы */
  { top: 4195.5, left: 26.5   },
  { top: 4195.5, left: 1884.5 },
]

const IMG = (name) => `/src/frontend/images/aboutus/${name}`

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

const AboutPage = () => {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('+7')
  const [formEmail, setFormEmail] = useState('')
  const [formStatus, setFormStatus] = useState(null)
  const [formFieldErrors, setFormFieldErrors] = useState({ name: false, phone: false, email: false })

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

          {/* ── Background ── */}
          <StyledGradientBg />

          {/* ── Grid ── */}
          <StyledLeftMarginStrip />
          <StyledRightMarginStrip />
          <StyledTopLine />
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledVDivider4 />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="bottom" />
          <StyledTaperedLine className="hero-line" />
          <StyledHLine className="contact-top" />
          <StyledHLine className="contact-bot" />
          <StyledAboutLine />
          <StyledTaperedLine className="stat-line-1" />
          <StyledTaperedLine className="stat-line-2" />
          <StyledTaperedLine className="stat-line-3" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
          ))}

          {/* ── Header ── */}
          <Header />

          {/* ── Hero ── */}
          <StyledImg
            className="logo-badge"
            src={IMG('14 - 6 1.png')}
            alt="Bolaite"
            width={819}
            height={197}
            {...heroImageProps}
          />

          <StyledServiceDesc>
            Поставка и обслуживание<br />
            компрессорного<br />
            и воздухоразделительного<br />
            оборудования
          </StyledServiceDesc>

          <StyledBolaiteBrand>
            Bolaite
            <StyledBolaiteDash aria-hidden="true" />
          </StyledBolaiteBrand>

          <StyledHeroText>
            <StyledHeroTextGray>
              надежное решение для подачи сжатого воздуха<br />
            </StyledHeroTextGray>
            <StyledHeroTextBlue>Свяжитесь</StyledHeroTextBlue>
            <StyledHeroTextGray>
              {' '}с нами и получите качественные компрессоры для вашего бизнеса
            </StyledHeroTextGray>
          </StyledHeroText>

          <StyledContactBox href="#request-form">СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── About Section ── */}
          <StyledAboutLabel>О ПРОИЗВОДИТЕЛЕ:</StyledAboutLabel>

          <StyledAboutTitle>Дочерняя компания Atlas Copco,</StyledAboutTitle>

          <StyledAboutDesc>
            специализирующаяся<br />
            на предоставлении передовых решений для повышения эффективности производства,<br />
            является проверенным и зарекомендовавшим себя производителем.
          </StyledAboutDesc>

          {/* ── Main product image + details ── */}
          <StyledImg
            className="compressor"
            src={IMG('blt-s-pm-6-800-550-1 (1) 1.png')}
            alt="Компрессор Bolaite"
            {...lazyImageProps(622, 728)}
          />
          <StyledImg className="detail-1" src={IMG('detail1.jpg 1.png')} alt="Деталь 1" {...lazyImageProps(138, 136)} />
          <StyledImg className="detail-4" src={IMG('detail4.jpg 1.png')} alt="Деталь 4" {...lazyImageProps(138, 139)} />
          <StyledImg className="detail-10" src={IMG('detail10.jpg 1.png')} alt="Деталь 10" {...lazyImageProps(140, 139)} />
          <StyledImg className="detail-11" src={IMG('detail11.jpg 1.png')} alt="Деталь 11" {...lazyImageProps(142, 139)} />

          {/* ── Stats ── */}
          <StyledStatItem className="stat-1">
            1 КЛАСС<br />ЭНЕРГОЭФФЕКТИВНОСТИ
          </StyledStatItem>
          <StyledStatItem className="stat-2">
            20 ЛЕТ<br />НА РЫНКЕ
          </StyledStatItem>
          <StyledStatItem className="stat-3">
            150 ЛЕТ<br />ОПЫТА
          </StyledStatItem>

          <StyledCircle />

          {/* ── Certificates Section ── */}
          <StyledCertTitle>СЕРТИФИКАТЫ</StyledCertTitle>

          <StyledCertDesc>
            Bolaite имеет сертификаты LRQA (Liyd`s Register Quality Asserance, Великобритания)<br />
            по стандартам ISO9001, ISO14001 и OHSAS18001
          </StyledCertDesc>

          {/* картинки сертификатов — координаты точно из автогена */}
          <StyledImg className="cert-iso1" src={IMG('泛亚ISO-英文 1.png')} alt="ISO" {...lazyImageProps(186, 262)} />
          <StyledImg className="cert-007" src={IMG('照片-007 1.png')} alt="007" {...lazyImageProps(193, 266)} />
          <StyledImg className="cert-snip" src={IMG('Snipaste_2021-03-23_14-10-30 1.png')} alt="Snipaste" {...lazyImageProps(182, 264)} />
          <StyledImg className="cert-ce" src={IMG('CE认证-scaled 1.png')} alt="CE" {...lazyImageProps(189, 267)} />
          <StyledImg className="cert-0504" src={IMG('20170310190415_0504 1.png')} alt="0504" {...lazyImageProps(375, 265)} />
          <StyledImg className="cert-5651" src={IMG('20170310190340_5651 1.png')} alt="5651" {...lazyImageProps(187, 265)} />
          <StyledImg className="cert-2360" src={IMG('20170310190302_2360 1.png')} alt="2360" {...lazyImageProps(375, 266)} />
          <StyledImg className="cert-8913" src={IMG('20170310190224_8913 1.png')} alt="8913" {...lazyImageProps(345, 267)} />
          <StyledImg className="cert-7810" src={IMG('20170310190147_7810 1.png')} alt="7810" {...lazyImageProps(187, 264)} />
          <StyledImg className="cert-4051" src={IMG('20170310190114_4051 1.png')} alt="4051" {...lazyImageProps(187, 264)} />
          <StyledImg className="cert-3887" src={IMG('20170310190041_3887 1.png')} alt="3887" {...lazyImageProps(187, 265)} />

          {/* подписи — координаты точно из автогена */}
          <StyledCertLabel className="c1">Сертификат собрание<br />иностранных инвестиций Bolaite</StyledCertLabel>
          <StyledCertLabel className="c2">Письмо-рекларация<br />Atlas Copco</StyledCertLabel>
          <StyledCertLabel className="c3">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c4">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c5">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c6">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c7">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c8">Сертификат ISO</StyledCertLabel>
          <StyledCertLabel className="c9">Письмо-декларация<br />Atlas Copco</StyledCertLabel>
          <StyledCertLabel className="c10">Лицензия Atlas Copco<br />Bolaite Compressor Bushes</StyledCertLabel>
          <StyledCertLabel className="c11">Разрешение на производство<br />компрессора Bolaite</StyledCertLabel>

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

            <StyledFormLabel htmlFor="about-name-input" $left={0} $top={10}>
              ИМЯ
            </StyledFormLabel>
            <StyledFormInput
              id="about-name-input"
              type="text"
              value={formName}
              onChange={(e) => {
                setFormName(capitalizeFirst(e.target.value))
                setFormFieldErrors((prev) => ({ ...prev, name: false }))
              }}
              aria-label="Имя"
              $left={0}
            />

            <StyledFormLabel htmlFor="about-phone-input" $left={520} $top={10}>
              НОМЕР ТЕЛЕФОНА
            </StyledFormLabel>
            <StyledFormInput
              id="about-phone-input"
              type="tel"
              value={formPhone}
              onChange={handlePhoneChange}
              aria-label="Номер телефона"
              $left={520}
            />

            <StyledFormLabel htmlFor="about-email-input" $left={1030} $top={10}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </StyledFormLabel>
            <StyledFormInput
              id="about-email-input"
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
            <div style={{ position: 'absolute', top: 4083, left: 262, color: '#81c784', fontFamily: 'Inter, sans-serif', fontSize: 18 }}>
              Заявка отправлена!
            </div>
          )}
          {formStatus === 'error' && (
            <div style={{ position: 'absolute', top: 4083, left: 262, color: '#ff8a80', fontFamily: 'Inter, sans-serif', fontSize: 18 }}>
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

export default AboutPage