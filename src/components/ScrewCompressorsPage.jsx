import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 5388

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
  bottom: 0;
  width: 1px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  bottom: 0;
  width: 1px;
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
  height: 4495px;
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
  top: 1690px;
  left: 1748px;
  width: 1px;
  height: 1910px;
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

  &.section-1 { top: 1064px; left: 0;   width: 1920px; }
  &.section-2 { top: 2145px; left: 0;   width: 1920px; }
  &.section-3 { top: 3220px; left: 1px; width: 1920px; }
  &.section-4 { top: 4307px; left: 1px; width: 1920px; }
  &.section-5 { top: 5269px; left: 0;   width: 1920px; }

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

// ─── Hero Section ─────────────────────────────────────────────────────────────

const StyledHeroTitle = styled(motion.h1)`
  position: absolute;
  top: 302px;
  left: 589px;
  margin: 0;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #03043c;
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

  &.active { color: #03043c; }
`

// ─── СВЯЗАТЬСЯ box ────────────────────────────────────────────────────────────

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
  color: #030d28;
  text-align: right;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 11;
  text-decoration: none;
  box-sizing: border-box;

  &:hover { color: #575757; }
`

// ─── Section labels ───────────────────────────────────────────────────────────

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  color: #bcbcbc;
  text-align: right;

  &.main { top: 1060px; left: 928px; font-size: 110px; }
  &.sub  { top: 975px;  left: 927px; font-size: 70px;  }
`

// ─── VSD Section (Привод с регулируемой скоростью) ────────────────────────────

const StyledSectionTitle = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  color: #0f152d;
  text-align: right;

  &.vsd-title   { top: 1220px; left: 936px;  font-size: 37px; }
  &.fixed-title { top: 2220px; left: 588px;  font-size: 39px; }
  &.laser-title { top: 3303px; left: 588px;  font-size: 39px; }
  &.low-title   { top: 3909px; left: 1030px; font-size: 35px; white-space: nowrap; }
`

const StyledSectionDesc = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #575757;
  line-height: 1.6;
  margin: 0;

  &.vsd-desc   { top: 1280px; left: 936px; }
  &.fixed-desc { top: 2287px; left: 590px; }
  &.laser-desc { top: 3387px; left: 588px; }
  &.low-desc   { top: 3970px; left: 1030px; }
`

// ─── Product Images ───────────────────────────────────────────────────────────

const StyledProductImg = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: 100;

  &.th-pm      { top: 1340px; left: 130px;  width: 580px; height: 580px; }
  &.blt-s-pm   { top: 1280px; left: 1120px; width: 700px; height: 700px; }
  &.blt-opm    { top: 1330px; left: 600px;  width: 570px; height: 570px; }
  &.th11       { top: 2420px; left: 1280px; width: 520px; height: 520px; }
  &.lbt        { top: 2260px; left: 550px;  width: 840px; height: 840px; }
  &.blt-s      { top: 2330px; left: 0;      width: 660px; height: 660px; }
  &.laser      { top: 3450px; left: 136px;  width: 800px; height: 800px; }
  &.blt-vfc    { top: 3260px; left: 925px;  width: 930px; height: 930px; }
`

// ─── Product Labels ───────────────────────────────────────────────────────────

const StyledProductLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #575757;

  &.label-1 { top: 2440px; left: 348px;  }
  &.label-2 { top: 2440px; left: 908px;  }
  &.label-3 { top: 2440px; left: 1482px; }
`

// ─── Spec Block ───────────────────────────────────────────────────────────────

const StyledSpecBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0;
`

const StyledSpecLabel = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #a5a5a5;
  white-space: nowrap;
`

const StyledSpecValue = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #d2d2d2;
  white-space: nowrap;
  margin-top: 6px;
`

const StyledSpecGap = styled.div`
  height: 16px;
`

const SpecBlock = ({ top, left }) => (
  <StyledSpecBlock style={{ top, left }}>
    <StyledSpecLabel>Макс рабочее давление:</StyledSpecLabel>
    <StyledSpecValue>8-10 бар</StyledSpecValue>
    <StyledSpecGap />
    <StyledSpecLabel>Мощность FAD*</StyledSpecLabel>
    <StyledSpecValue>0,25-13 м3/мин</StyledSpecValue>
    <StyledSpecGap />
    <StyledSpecLabel>Мощность двигателя*</StyledSpecLabel>
    <StyledSpecValue>7,5-25 кВт</StyledSpecValue>
  </StyledSpecBlock>
)

// ─── Form (как на /parts и CatalogPage) ───────────────────────────────────────

const StyledFormTitle = styled.h2`
  position: absolute;
  top: 4510px;
  left: 450px;
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
`

const StyledFormSubtitle = styled.p`
  position: absolute;
  top: 4603px;
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
  top: 4893px;
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
  top: 5073px;
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

const StyledFooterAddress = styled.address`
  position: absolute;
  top: 5293px;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  text-align: center;
  font-style: normal;
`

/** Оставлено для совместимости, если в разметке ещё есть обёртка секции формы */
const StyledFormSection = styled.section`
  position: absolute;
  top: 4307px;
  left: 0;
  width: 1920px;
`

// ─── Dot positions ────────────────────────────────────────────────────────────

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
  { top: 1061, left: 27   },
  { top: 1061, left: 1885 },
  /* section-2: как section-3 (линия 2145px) */
  { top: 2142, left: 27   },
  { top: 2142, left: 545  },
  { top: 2142, left: 1745 },
  { top: 2142, left: 1885 },
  /* section-3: боковые + VDivider 548 + VDivider3 1748 (VDivider2 844 не доходит до 3220) */
  { top: 3217, left: 27   },
  { top: 3217, left: 545  },
  { top: 3217, left: 1745 },
  { top: 3217, left: 1885 },
  /* section-4 / section-5 × боковые полосы (центр 8px-точки на пересечении) */
  { top: 4304, left: 27   },
  { top: 4304, left: 1885 },
  { top: 5266, left: 27   },
  { top: 5266, left: 1885 },
]

// ─── Image base path ──────────────────────────────────────────────────────────

const IMG = (name) => `/images/frame8/${name}`

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

const ScrewCompressorsPage = () => {
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
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail
        }),
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
          <StyledHeaderBottomLine />
          <StyledVDivider />
          <StyledVDivider2 />
          <StyledVDivider3 />
          <StyledHeaderVLine className="vl-1" />
          <StyledHeaderVLine className="vl-2" />

          <StyledHLine className="section-1" />
          <StyledHLine className="section-2" />
          <StyledHLine className="section-3" />
          <StyledHLine className="section-4" />
          <StyledHLine className="section-5" />
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

          <StyledEquipmentLabel className="sub">ВИНТОВЫЕ ВОЗДУШНЫЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="main">КОМПРЕССОРЫ</StyledEquipmentLabel>

          <StyledContactBox href="#request-form">СВЯЗАТЬСЯ</StyledContactBox>

          {/* ── VSD Section ── */}
          <StyledSectionTitle className="vsd-title">Привод с регулируемой скоростью</StyledSectionTitle>
          <StyledSectionDesc className="vsd-desc">
            Отрегулируйте скорость двигателя<br />
            в соответствии с вашими потребностями в воздухе
          </StyledSectionDesc>

          <StyledProductImg
            className="th-pm"
            src={IMG('TH-PM-800-800-2.jpg 1.png')}
            alt="Винтовой компрессор Bolaite TH PM — купить в Иркутске, Новая Техника"
            width={580}
            height={580}
            {...heroImageProps}
          />
          <StyledProductImg
            className="blt-s-pm"
            src={IMG('Bolaite_BLT-150A_S 1.png')}
            alt="Промышленный винтовой компрессор Bolaite BLT S PM в Иркутске"
            {...lazyImageProps(700, 700)}
          />
          <StyledProductImg
            className="blt-opm"
            src={IMG('Bolaite_BLT-150A_-OPM_改-800.jpg (1) 1.png')}
            alt="Винтовой компрессор Bolaite BLT OPM — цена и наличие Иркутск"
            {...lazyImageProps(570, 570)}
          />

          <SpecBlock top={1880} left={340} />
          <SpecBlock top={1880} left={900} />
          <SpecBlock top={1880} left={1199} />

          {/* ── Fixed Speed Section ── */}
          <StyledSectionTitle className="fixed-title">Привод с фиксированной скоростью</StyledSectionTitle>
          <StyledSectionDesc className="fixed-desc">
            Простая и прочная конструкция,<br />
            подходящая для ваших рабочих процессов<br />
            с постоянным потреблением воздуха
          </StyledSectionDesc>

          <StyledProductImg
            className="th11"
            src={IMG('th11-800-800.png 1.png')}
            alt="Винтовой компрессор Bolaite TH11 — промышленные воздушные компрессоры Иркутск"
            {...lazyImageProps(520, 520)}
          />
          <StyledProductImg
            className="lbt"
            src={IMG('lbt-350a-800-800.png 1.png')}
            alt="Винтовой компрессор LBT 350A — купить в Иркутске, Новая Техника"
            {...lazyImageProps(840, 840)}
          />
          <StyledProductImg
            className="blt-s"
            src={IMG('blt-150a-s-800-800.png 1.png')}
            alt="Винтовой компрессор Bolaite BLT 150A S — дилер Иркутск"
            {...lazyImageProps(660, 660)}
          />

          <StyledProductLabel className="label-1">BLT S 40-475 л.с.</StyledProductLabel>
          <StyledProductLabel className="label-2">BLT S 40-750 л.с.</StyledProductLabel>
          <StyledProductLabel className="label-3">TH S-100 л.с.</StyledProductLabel>

          <SpecBlock top={2930} left={340} />
          <SpecBlock top={2930} left={681} />
          <SpecBlock top={2930} left={1390} />

          {/* ── Laser Section ── */}
          <StyledSectionTitle className="laser-title">Компрессоры для лазерной резки</StyledSectionTitle>
          <StyledSectionDesc className="laser-desc">
            Textxtxttx txtxttx txtxxttx<br />
            textxet txtxet txettx<br />
            txtxt txtxt txttx
          </StyledSectionDesc>

          <StyledProductImg
            className="laser"
            src={IMG('laser-cutting-1-800-800.jpg 1.png')}
            alt="Промышленный компрессор для лазерной резки — Иркутск, Новая Техника"
            {...lazyImageProps(800, 800)}
          />
          <StyledProductImg
            className="blt-vfc"
            src={IMG('BLT-250A-L-VFC-800-800 1.png')}
            alt="Винтовой компрессор Bolaite BLT 250A VFC — купить в Иркутске"
            {...lazyImageProps(930, 930)}
          />

          <SpecBlock top={3310} left={330} />

          {/* ── Low Pressure Section ── */}
          <StyledSectionTitle className="low-title">Компрессоры низкого давления</StyledSectionTitle>
          <StyledSectionDesc className="low-desc">
            Textxtxttx txtxttx txtxxttx<br />
            textxet txtxet txettx<br />
            txtxt txtxt txttx
          </StyledSectionDesc>

          <SpecBlock top={4050} left={1031} />

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

            <StyledFormLabel htmlFor="sc-name-input" $left={0} $top={10}>
              ИМЯ
            </StyledFormLabel>
            <StyledFormInput
              id="sc-name-input"
              type="text"
              value={formName}
              onChange={(e) => {
                setFormName(capitalizeFirst(e.target.value))
                setFormFieldErrors((prev) => ({ ...prev, name: false }))
              }}
              aria-label="Имя"
              $left={0}
            />

            <StyledFormLabel htmlFor="sc-phone-input" $left={520} $top={10}>
              НОМЕР ТЕЛЕФОНА
            </StyledFormLabel>
            <StyledFormInput
              id="sc-phone-input"
              type="tel"
              value={formPhone}
              onChange={handlePhoneChange}
              aria-label="Номер телефона"
              $left={520}
            />

            <StyledFormLabel htmlFor="sc-email-input" $left={1030} $top={10}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </StyledFormLabel>
            <StyledFormInput
              id="sc-email-input"
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
            <div
              style={{
                position: 'absolute',
                top: 5153,
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
                top: 5153,
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

        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export default ScrewCompressorsPage