import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'
import { Link } from 'react-router-dom';

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
  border: none;
`

const StyledFrame = styled.div`
  width: 1920px;
  height: ${DESIGN_HEIGHT}px;
  position: relative;
  background: white;
  overflow: hidden;
`

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
  top: ${DESIGN_HEIGHT - 1}px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #272B37;
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
  height: 3432px;
  background: #9C9E9D;
  z-index: 50;
`

const StyledVDivider2 = styled.div`
  position: absolute;
  top: 15px;
  left: 844px;
  width: 1px;
  height: 2143px;
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

  &.section-1 { top: 1071px; left: 0; width: 1920px; }
  &.section-2 { top: 2158px; left: 1px; width: 1920px; }
  &.section-3 { top: 3230px; left: 0; width: 1920px; }
  &.section-4 { top: 4206px; left: 0; width: 1920px; }

  &.compressor-1 { top: 565px; left: 550px; width: 880px; }
  &.compressor-2 { top: 630px; left: 845px; width: 585px; }
  &.compressor-3 { top: 700px; left: 1090px; width: 340px; }
  &.compressor-4 { top: 770px; left: 1260px; width: 170px; }
  &.compressor-5 { top: 994px; left: 550px; width: 295px; }

  &.dryer-1 { top: 1405px; left: 32px; width: 518px; }
  &.filter-1 { top: 2514px; left: 795px; width: 1095px; }
  &.filter-2 { top: 3084px; left: 550px; width: 165px; }
`

const StyledContactBoxVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9C9E9D;
  z-index: 100;

  &.left  { top: 995px; left: 548px; height: 76px; }
  &.right { top: 995px; left: 844px; height: 76px; }
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

const StyledHeroImage = styled.img`
  position: absolute;
  top: 1131px;
  left: 0;
  width: 1030px;
  height: 1030px;
  aspect-ratio: 1.38;
  object-fit: cover;
`

const StyledHeroTitle = styled(motion.h1)`
  position: absolute;
  top: 302px;
  left: 592px;
  font-family: 'Instrument Sans', 'Inter', sans-serif;
  font-weight: 600;
  font-size: 68px;
  color: #03043c;
  margin: 0;
  line-height: 1.1;
  z-index: 11;
`

const StyledHeroSubtext = styled.p`
  position: absolute;
  top: 392px;
  left: 1163px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #a9a9a9;
  text-align: right;
  line-height: 1.6;
  margin: 0;
  z-index: 11;
`

const StyledCategoryList = styled.div`
  position: absolute;
  top: 554px;
  left: 1440px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 11;
`

const StyledCategoryItem = styled(Link)` // Теперь это сразу ссылка!
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
  text-decoration: none; /* Убираем стандартное подчеркивание ссылки */
  
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10; /* Поднимаем выше линий, чтобы точно кликалось */

  &:hover {
    opacity: 0.7;
    color: #03043c;
  }

  &.active { 
    color: #03043c; 
    font-weight: bold;
  }
`;

const StyledEquipmentLabel = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 105px;
  color: #bcbcbc;
  text-align: right;

  &.main  { top: 935px;  left: 884px; }
  &.sub   { top: 1095px; left: 884px; font-size: 70px; }
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

const StyledContactBox = styled.a`
  position: absolute;
  top: 1010px;
  left: 570px;
  width: 232px;
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

  &:hover { color: #575757; }
`

const StyledDryerTitle = styled.h2`
  position: absolute;
  top: 1162px;
  left: 60px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 49px;
  color: #030a3e;
  text-align: center;
  margin: 0;
  line-height: 1.2;
`

const StyledDryerSubtext = styled.p`
  position: absolute;
  top: 1287px;
  left: 175px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #838383;
  text-align: right;
  line-height: 1.5;
  margin: 0;
`

const StyledDryerImage1 = styled.img`
  position: absolute;
  top: 1287px;
  left: 414px;
  width: 570px;
  height: 570px;
  object-fit: cover;
  z-index:100;
`

const StyledDryerImage2 = styled.img`
  position: absolute;
  top: 1627px;
  left: 984px;
  width: 510px;
  height: 510px;
  object-fit: cover;
`

const StyledDryerCardTitle = styled.div`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #0f152d;
  text-align: right;
  white-space: nowrap;

  &.bld { top: 1337px; left: 907px; }
  &.blr { top: 1568px; left: 1092px; }
`

const StyledDryerSpecs = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 20px;
  color: #a5a5a5;
  line-height: 1.6;
  margin: 0;

  &.specs-1 { top: 1411px; left: 946px; }
  &.specs-2 { top: 1650px; left: 1456px; }
`

const StyledFilterImage1 = styled.img`
  position: absolute;
  top: 2218px;
  left: 51px;
  width: 479px;
  height: 482px;
  object-fit: cover;
  z-index:100;
`

const StyledTankImage1 = styled.img`
  position: absolute;
  top: 2247px;
  left: 1266px;
  width: 383px;
  height: 913px;
  
`

const StyledTankImage2 = styled.img`
  position: absolute;
  top: 2075px;
  left: 1650px;
  width: 270px;
  height: 1110px;
`

const StyledTankImage3 = styled.img`
  position: absolute;
  top: 2460px;
  left: 1488px;
  width: 322px;
  height: 770px;
  z-index:100;
`

const StyledFilterTitle = styled.div`
  position: absolute;
  top: 2210px;
  left: 594px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #0f152d;
  text-align: right;
  white-space: nowrap;
`

const StyledFilterDesc = styled.p`
  position: absolute;
  font-family: Inter, sans-serif;
  font-weight: 600;
  color: #a1a1a1;
  line-height: 1.6;
  margin: 0;

  &.desc-1 { top: 2284px; left: 597px; font-size: 24px; }
  &.desc-2 { top: 2499px; left: 594px; font-size: 16px; }
  &.desc-3 { top: 2780px; left: 738px; font-size: 35px; color: #0f152d; text-align: right; white-space: nowrap; }
  &.desc-4 { top: 2854px; left: 738px; font-size: 24px; }
  &.desc-5 { top: 3070px; left: 729px; font-size: 16px; }
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
  font-weight: 700;
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

const DOT_POSITIONS = [
  { top: 86.5, left: 26.5  },
  { top: 11.5, left: 26.5  },
  { top: 11.5, left: 544.5 },
  { top: 11.5, left: 840.5 },
  { top: 86.5, left: 840.5 },
  { top: 86.5, left: 1114.5 },
  { top: 11.5, left: 1114.5 },
  { top: 11.5, left: 1314.5 },
  { top: 86.5, left: 1314.5 },
  { top: 86.5, left: 1884.5 },
  { top: 11.5, left: 1884.5 },
  { top: 86.5, left: 544.5  },
  { top: 627,  left: 840  },
  { top: 697,  left: 1088 },
  { top: 767,  left: 1256 },
  { top: 1068, left: 545  },
  { top: 1068, left: 841  },
  { top: 991,  left: 841  },
  { top: 1068, left: 27   },
  { top: 2155, left: 27   },
  { top: 2155, left: 545  },
  { top: 2155, left: 840  },
  { top: 3227, left: 27   },
  { top: 3227, left: 545  },
  { top: 4203, left: 27   },
  { top: 1068, left: 1885 },
  { top: 2155, left: 1885 },
  { top: 3227, left: 1885 },
  { top: 4203, left: 1885 },
  { top: 562,  left: 545  },
  { top: 991,  left: 545  },
  /* левый конец линии filter-1 (top 2514px, left 795px, width 1095px) */
  { top: 2510, left: 792 },
  /* правый конец линии filter-2 (top 3084px, left 550px, width 165px) */
  { top: 3081, left: 712 },
]

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

const CatalogPage = () => {
  const { pathname } = useLocation()
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
        <StyledFrame>

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
          <StyledHLine className="section-4" />
          <StyledHLine className="compressor-1" />
          <StyledHLine className="compressor-2" />
          <StyledHLine className="compressor-3" />
          <StyledHLine className="compressor-4" />
          <StyledHLine className="compressor-5" />
          <StyledHLine className="dryer-1" />
          <StyledHLine className="filter-1" />
          <StyledHLine className="filter-2" />

          <StyledContactBoxVLine className="left" />
          <StyledContactBoxVLine className="right" />

          {DOT_POSITIONS.map((pos, i) => (
            <StyledDot key={i} style={{ top: pos.top, left: pos.left }} />
          ))}

          <Header />

          <StyledHeroImage
            src="/images/frame6/blt-s-pm-6-800-550-1 1.png"
            alt="Промышленные воздушные компрессоры и подготовка воздуха Bolaite — Иркутск, Новая Техника"
            width={1030}
            height={1030}
            {...heroImageProps}
          />

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

          <StyledCategoryList>
            <Link to="/products/oil-injected" style={{ textDecoration: 'none' }}>
              <StyledCategoryItem className={pathname === '/products/oil-injected' ? 'active' : ''}>
                ВИНТОВЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
              </StyledCategoryItem>
            </Link>

            <Link to="/products/oil-free" style={{ textDecoration: 'none' }}>
              <StyledCategoryItem className={pathname === '/products/oil-free' ? 'active' : ''}>
                БЕЗМАСЛЯНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
              </StyledCategoryItem>
            </Link>

            <Link to="/products/portable" style={{ textDecoration: 'none' }}>
              <StyledCategoryItem className={pathname === '/products/portable' ? 'active' : ''}>
                ПОРТАТИВНЫЕ ВОЗДУШНЫЕ КОМПРЕССОРЫ
              </StyledCategoryItem>
            </Link>

            <Link to="/products/air-treatment" style={{ textDecoration: 'none' }}>
              <StyledCategoryItem className={pathname === '/products/air-treatment' ? 'active' : ''}>
                ОБОРУДОВАНИЕ ДЛЯ ОЧИСТКИ ВОЗДУХА
              </StyledCategoryItem>
            </Link>
            </StyledCategoryList>

          <StyledEquipmentLabel className="main">ОБОРУДОВАНИЕ</StyledEquipmentLabel>
          <StyledEquipmentLabel className="sub">ДЛЯ ОЧИСТКИ ВОЗДУХА</StyledEquipmentLabel>

          <StyledDescriptionLeft>
            Компрессорное оборудование<br />
            ивестиция в будущее вашего бизнеса
          </StyledDescriptionLeft>

          <StyledContactBox href="#request-form">СВЯЗАТЬСЯ</StyledContactBox>

          <StyledDryerTitle>
            Рефрижераторные<br />осушители Bolaite
          </StyledDryerTitle>

          <StyledDryerSubtext>
            надежное, экономичное, простое<br />в использовании решение
          </StyledDryerSubtext>

          <StyledDryerImage1
            src="/images/frame6/dryer-800.jpg 1.png"
            alt="Рефрижераторный осушитель Bolaite серии BLD — купить в Иркутске"
            {...lazyImageProps(570, 570)}
          />

          <StyledDryerImage2
            src="/images/frame6/BOLAITE-AIR-DYER-800.jpg 1.png"
            alt="Осушитель сжатого воздуха Bolaite BLR — промышленное оборудование Иркутск"
            {...lazyImageProps(510, 510)}
          />

          <StyledDryerCardTitle className="bld">
            Рефрижераторные осушители серии BLD
          </StyledDryerCardTitle>

          <StyledDryerCardTitle className="blr">
            Рефрижераторные осушители серии BLR
          </StyledDryerCardTitle>

          <StyledDryerSpecs className="specs-1">
            Точка росы 3-7 *C<br />
            1,5-105 м3/мин<br />
            Экологически чистый хладагент<br />
            Круглосуточная эксплуатация<br />
            Требуется минимальное обслуживание
          </StyledDryerSpecs>

          <StyledDryerSpecs className="specs-2">
            Точка росы 3-7 *C<br />
            1,5-105 м3/мин<br />
            Экологически чистый хладагент<br />
            Круглосуточная эксплуатация<br />
            Требуется минимальное обслуживание
          </StyledDryerSpecs>

          <StyledFilterImage1
            src="/images/frame6/blt-filter.png 1.png"
            alt="Фильтр сжатого воздуха Bolaite — запчасти и комплектующие в наличии Иркутск"
            {...lazyImageProps(479, 482)}
          />

          <StyledTankImage1
            src="/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 2.png"
            alt="Резервуар сжатого воздуха для промышленного компрессора — Иркутск"
            {...lazyImageProps(383, 913)}
          />

          <StyledTankImage2
            src="/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 3.png"
            alt="Ресивер сжатого воздуха Bolaite — продажа в Иркутске, Новая Техника"
            {...lazyImageProps(270, 1110)}
          />

          <StyledTankImage3
            src="/images/frame6/Compressed-Air-Storage-Tank-Gas-Tank-Air-Compressor-Parts.jpg 1.png"
            alt="Резервуар для компрессорной установки — сервис и поставка Иркутск"
            {...lazyImageProps(322, 770)}
          />

          <StyledFilterTitle>Фильтрация воздуха</StyledFilterTitle>

          <StyledFilterDesc className="desc-1">
            Фильтры оснащены импортными<br />
            многослойными фильтрующими элементами из стекловолокна,<br />
            которые обеспечивают превосходную фильтрацию<br />и низкие потери давления
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-2">
            Компактный размер<br />
            Высокая эффективность<br />
            Спроектирован для круглосуточной работы<br />
            Требуется минимальное обслуживание
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-3">
            Резервуар для хранения сжатого воздуха
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-4">
            Резервуар для сжатого воздуха — важная часть всей системы.<br />
            Компенсирует колебания давления,<br />
            обеспечивает стабильное давление в системе,<br />
            служит резервуаром и конденсирует воду
          </StyledFilterDesc>

          <StyledFilterDesc className="desc-5">
            Импортный многослойный фильтр из стекловолокна<br />
            Низкий перепад давления<br />
            Превосходный эффект фильтрации<br />
            Стабильная производительность
          </StyledFilterDesc>

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
            <StyledSubmitInner type="submit" form="contact-form">
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

        </StyledFrame>
      </ScalableContent>
    </PageWrapper>
  )
}

export { CatalogPage as default }