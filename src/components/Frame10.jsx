import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Header from './Header'
import { heroImageProps, lazyImageProps } from '../utils/imagePerf'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 6465

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
  height: ${({ $scale }) => 6465 * $scale}px;
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

const StyledFrame10 = styled.div`
  width: 1920px;
  height: 6465px;
  position: relative;
  background: white;
  overflow: hidden;
`

const CopyrightLink = styled.a`
  display: block;
  margin-top: 6440px;
  margin-left: 1600px;
  /* Используем тот же цвет и размер, что у адреса, но чуть прозрачнее */
  font-size: 12px; 
  color: #8c8c8c; /* подбери под цвет своего текста на скрине */
  opacity: 0.6;
  text-decoration: none;
  text-align: center; /* если адрес по центру */
  font-family: inherit;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const StyledRectangle16 = styled.div`
  width: 100%;
  height: 1193px;
  left: 0px;
  top: 4307px;
  position: absolute;
  background: linear-gradient(180deg, #030C1B 0%, #8F9197 42%, white 95%);
`

const StyledRectangle9 = styled.div`
  width: 100%;
  height: 1080px;
  left: 0px;
  top: 2148px;
  position: absolute;
  background: #272B37;
  border: none;
  outline: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #9C9E9D;
  }
`

/* Герой: <img> для LCP — fetchpriority=high + явные размеры (меньше CLS) */
const StyledHeroBannerWrap = styled.div`
  position: absolute;
  left: 0;
  top: 91px;
  width: 1920px;
  height: 716px;
  z-index: 6;
  overflow: hidden;
`

const StyledHeroBannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
`

/* Как на /products/oil-injected: верх/низ 15–90px, палки 548 / 844 / 1118 / 1318 */
const StyledTopLine = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
`

const StyledHeaderBottomLine = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  width: 1920px;
  height: 1px;
  background: #9c9e9d;
  z-index: 50;
`

const StyledHeaderVLine = styled.div`
  position: absolute;
  width: 1px;
  background: #9c9e9d;
  z-index: 100;

  &.vl-1 { top: 16px; left: 548px; height: 75px; }
  &.vl-2 { top: 16px; left: 844px; height: 75px; }
  &.vl-3 { top: 16px; left: 1118px; height: 75px; }
  &.vl-4 { top: 16px; left: 1318px; height: 75px; }
`

const DotWrapper = styled.svg`
  position: absolute;
  width: 6px !important;
  height: 6px !important;
  z-index: 150;
  pointer-events: none;
  overflow: visible;

  /* Твои координаты */
  &.v3-top { left: 546px; top: 12px; }
  &.v3-bottom { left: 545px; top: 87px; }
  &.l1-top { left: 842px; top: 12px; }
  &.l1-bottom { left: 842px; top: 87px; }
  &.l2-top { left: 1115px; top: 12px; }
  &.l2-bottom { left: 1115px; top: 87px; }
  &.l3-top { left: 1315px; top: 12px; }
  &.l3-bottom { left: 1315px; top: 87px; }
  &.left-top { left: 28px; top: 12px; }
  &.left-bottom { left: 28px; top: 87px; }
  &.right-top { left: 1885px; top: 12px; }
  &.right-bottom { left: 1885px; top: 87px; }
  /* СВЕРХУ ТОЧКИ ХЕДЕРА */
  
  &.rect9-left { left: 27px; top: 2144px; }
  &.rect9-right { left: 1885px; top: 2145px; }

  &.rect9-bottom-left { left: 28px; top: 3224px; }
  &.rect9-bottom-right { left: 1885px; top: 3224px; }
  
  &.atlas-line1-left { left: 28px; top: 4347px; }
  &.atlas-line1-right { left: 1885px; top: 4347px; }
  &.atlas-line2-left { left: 28px; top: 4437px; }
  &.atlas-line2-right { left: 1885px; top: 4437px; }

  &.atlas-line3-left { left: 28px; top: 5377px; }
  &.atlas-line3-right { left: 1885px; top: 5377px; }

  &.contact-line-bottom-left { left: 28px; top: 6357px; }
  &.contact-line-bottom-right { left: 1885px; top: 6358px; }
`;

// 2. Затем объявляем сам компонент (рисует круг)
const StyledLineEndDot = ({ className }) => (
  <DotWrapper className={className} viewBox="0 0 6 6">
    <circle cx="3" cy="3" r="2.5" fill="white" stroke="#9C9E9D" strokeWidth="1" />
  </DotWrapper>
);


const StyledRectangle = styled.div`
  position: absolute;
  background: #6a6c6f;
  z-index: 2;

  &.rect-25 { width: 60px; height: 60px; left: 60px; top: 851px; }
  &.rect-26 { width: 60px; height: 60px; left: 60px; top: 921px; }
  &.rect-27 { width: 60px; height: 60px; left: 60px; top: 991px; }
  &.rect-28 { width: 60px; height: 60px; left: 127px; top: 921px; }
  &.rect-29 { width: 60px; height: 60px; left: 194px; top: 921px; }
  &.rect-30 { width: 60px; height: 60px; left: 194px; top: 991px; }
  &.rect-31 { width: 211px; height: 60px; left: 194px; top: 851px; }
  &.rect-32 { width: 60px; height: 130px; left: 268px; top: 921px; }
`

/* Логотип; основной заголовок страницы — визуально скрыт (sr-only) */
const StyledHeroBrand = styled.div`
  position: absolute;
  left: 449px;
  top: 838px;
  width: 640px;
  margin: 0;
  padding: 0;
  border: none;
  font: inherit;
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const StyledHeroLine1 = styled(motion.span)`
  display: block;
  width: 100%;
  color: #6a6c6f;
  font-size: 150px;
  font-family: Jost, sans-serif;
  font-weight: 900;
  letter-spacing: 15px;
  text-align: center;
  line-height: 0.88;
`

const StyledHeroLine2 = styled(motion.span)`
  display: block;
  width: 100%;
  margin-top: -14px;
  color: #6a6c6f;
  font-size: 115px;
  font-family: Jost, sans-serif;
  font-weight: 900;
  letter-spacing: 5.75px;
  text-align: center;
  line-height: 0.88;
`

const StyledRightPanel = styled.div`
  position: absolute;
  width: 787px;
  height: 90px;
  left: 1133px;
  top: 720px;
  background: white;
  clip-path: polygon(129.544px 0, 100% 0, 100% 100%, 0 100%, 0 90px);
  z-index: 7;
  border: none;
  outline: none;
  box-shadow: none;
`

const StyledCallToActionArea = styled.div`
  position: absolute;
  width: 787px;
  height: 1343.28px;
  left: 1133px;
  top: 810px;
  background: linear-gradient(180deg, white 12%, #272B37 100%);
  z-index: 7;
  border: none;
  outline: none;
  box-shadow: none;
`

const StyledCTATitle = styled.a`
  position: absolute;
  width: 449px;
  height: 68px;
  left: 1424px;
  top: 745px;
  color: #5c5e61;
  font-size: 45px;
  font-family: Inter;
  font-weight: 400;
  z-index: 8;
  margin: 0;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  display: block;

  &:hover {
    color: #3a3c3f;
  }
`

const StyledCTAButton = styled.a`
  position: absolute;
  width: 200px;
  height: 46px;
  left: 1662px;
  top: 3280px;
  background: #272B37;
  color: white;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 9;
  text-decoration: none;

  &:hover {
    background: #545454;
  }
`

const StyledCTAText = styled.div`
  position: absolute;
  color: #3a3d42;
  font-size: 20px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  z-index: 9;
  
  /* Эти три строки критически важны для выравнивания по правой стороне */
  width: auto;
  white-space: nowrap;
  text-align: right;

  /* Укажи одно и то же значение "right", чтобы правый край был идеально ровным */
  /* Например, 50px или 100px от правого края макета (1920px) */
  &.text1 { right: 90px; top: 850px; }
  &.text2 { right: 90px; top: 885px; }
  &.text3 { right: 90px; top: 920px; }
  &.info777 { right: 90px; top: 955px; }
`

const StyledCTALine = styled.div`
  position: absolute;
  /* Линия на грани белой панели и тёмного блока, от правого угла до начала буквы «О» */
  width: 496px;
  height: 1px;
  left: 1424px;
  top: 810px;
  background: #9C9E9D;
  z-index: 100;
  mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
`

const StyledCompressorTitle = styled.h2`
  position: absolute;
  left: 449px;
  width: 640px;
  min-height: 31px;
  top: 1060px;
  margin: 0;
  padding: 0;
  color: #656565;
  font-size: 24px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: right;
  line-height: 1.2;
`

const StyledProductsTitle = styled.div`
  position: absolute;
  width: 406px;
  height: 80px;
  left: 674px;
  top: 1270px;
  color: #5c5e61;
  font-size: 64px;
  font-family: Inter;
  font-weight: 400;
`

const StyledProductCard = styled.a`
  position: absolute;
  background: rgba(217, 217, 217, 0);
  border: 1px solid #CFCFCF;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.9; }

  &.card-1 { width: 266px; height: 260px; left: 70px; top: 1460px; }
  &.card-2 { width: 267px; height: 260px; left: 343px; top: 1460px; clip-path: none; }
  &.card-large { width: 500px; height: 490px; left: 617px; top: 1460px; }
`

const StyledProductCard2 = styled.a`
  position: absolute;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease;

  img {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  &:hover { opacity: 0.9; }
  &:hover img {
    transform: scale(1.08);
  }

  img {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  &:hover img {
    transform: scale(1.08);
  }

  &.card-bottom-1 {
    width: 305px;
    height: 296px;
    left: 1163px;
    top: 1645px;
  }
  &.card-bottom-2 {
    width: 290px;
    height: 296px;
    left: 1484px;
    top: 1645px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 45px), calc(100% - 45px) 100%, 0 100%);
    border: none;
    box-shadow: none;
  }
`

const StyledProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${StyledProductCard}:hover & {
    transform: scale(1.08);
  }

  &.large { max-width: 422px; max-height: 364px; width: auto; height: auto; }
  &.product2 { max-width: 248px; max-height: 248px; width: auto; height: auto; }
  &.product3 { max-width: 247px; max-height: 248px; width: auto; height: auto; }
`

const StyledProductDesc = styled.div`
  position: absolute;
  color: #E2E2E2;
  font-size: 20px;
  font-family: Inter;
  font-weight: 400;
  z-index: 9;

  &.desc1 { width: 668px; left: 1162px; top: 1372px; }
  &.desc2 { width: 600px; left: 1165px; top: 1404px; white-space: nowrap; }
  &.desc3 { width: 456px; left: 1165px; top: 1435px; }
  &.desc4 { width: 456px; left: 1162px; top: 1496px; }
`

const StyledProductSpec = styled.div`
  position: absolute;
  color: #626262;
  font-family: Inter;
  z-index: 9;

  &.title1 { left: 70px; top: 1734px; font-size: 24px; font-weight: 400; }
  &.brand1 { right: 1312px; top: 1731px; font-size: 24px; font-weight: 400; }
  &.text1 { left: 70px; top: 1786px; font-size: 15px; font-weight: 400; }
  &.text2 { right: 1312px; top: 1786px; font-size: 15px; font-weight: 400; }
  
  &.title2 { width: auto; right: 803px; top: 1964px; font-size: 24px; font-weight: 400; }
  &.text3 { width: auto; right: 803px; top: 2022px; font-size: 15px; font-weight: 400; }
  
  &.title3 { width: auto; height: 33px; left: 1163px; top: 1961px; font-size: 18px; font-weight: 300; color: #E2E2E2; }
  &.brand3 { width: auto; height: 30px; right: 150px; top: 1961px; font-size: 18px; font-weight: 300; color: #E2E2E2; }
  &.text4 { width: auto; height: 20px; left: 1163px; top: 2022px; font-size: 12px; font-weight: 300; color: #E2E2E2; }
  &.text5 { width: auto; height: 18px; right: 150px; top: 2025px; font-size: 12px; font-weight: 300; color: #E2E2E2; }
`

const StyledCatalogButton = styled.div`
  position: absolute;
  width: 310px;
  height: 37px;
  left: 70px;
  top: 2090px;
  color: #626262;
  font-size: 30px;
  font-family: Inter;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #272B37;
  }
`

const StyledWorkflowTitle = styled.div`
  position: absolute;
  left: 452px;
  top: 2324px;
  color: #FFF;
  font-size: 19px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  line-height: 1.2;
  z-index: 5;
  white-space: nowrap;
`

const StyledWorkflowTitleDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  /* Центр круга совпадает с линией prod-line-7 */
  left: 425px;
  top: 2331px;
  background: white;
  border-radius: 50%;
  z-index: 101;
`

const StyledWorkflowNode = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  z-index: 5;

  &.node-2 { width: 8px; height: 8px; left: 425px; top: 2557px; }
  &.node-3 { width: 8px; height: 8px; left: 920px; top: 2563px; }
  &.node-4 { width: 8px; height: 8px; left: 1170px; top: 2564px; }
  &.node-5 { width: 8px; height: 8px; left: 1421px; top: 2564px; }
  &.node-6 { width: 8px; height: 8px; left: 670px; top: 2808px; }
`

const StyledStepCard = styled(motion.div)`
  position: absolute;
  border-radius: 7px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;

  &.step-1 { width: 245px; height: 245px; left: 429px; top: 2561px; background: linear-gradient(180deg, #272B37 0%, #6C7284 100%); }
  &.step-2 { width: 244px; height: 245px; left: 924px; top: 2567px; background: linear-gradient(180deg, #6C7284 0%, #272B37 100%); }
  &.step-3 { width: 245px; height: 246px; left: 1174px; top: 2568px; background: linear-gradient(180deg, #6C7284 0%, #272B37 100%); }
  &.step-4 { width: 245px; height: 244px; left: 1425px; top: 2324px; background: linear-gradient(180deg, #6C7284 0%, #272B37 100%); }
  &.step-5 { width: 244px; height: 244px; left: 674px; top: 2812px; background: linear-gradient(180deg, #272B37 0%, #6C7284 100%); }
`

const StyledStepTitle = styled.div`
  color: white;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 1.3;
`

const StyledCompanyTitle = styled.div`
  position: absolute;
  color: #272B37;
  font-size: 128px;
  font-family: Inter;
  font-weight: 300;

  &.atlas { width: 841px; height: 166px; left: 901px; top: 3460px; }
  &.bolaite { left: 1122px; top: 3417px; color: #5f6164; font-size: 52px; font-weight: 500; }
  &.swedish { left: 396px; top: 3537px; color: #5f6164; font-size: 52px; font-weight: 500; }
`

const StyledAtlasTitle = styled.div`
  position: absolute;
  width: 940px;
  height: 90px;
  left: 344px;
  top: 4360px;
  color: white;
  font-size: 58px;
  font-family: Inter;
  font-weight: 500;
  letter-spacing: 0.58px;
`

const StyledAtlasSubtitle = styled.div`
  position: absolute;
  width: 659px;
  height: 60px;
  left: 467px;
  top: 4462px;
  color: #c4c8d4;
  font-size: 50px;
  font-family: Inter;
  font-weight: 500;
`

/* Карточка товара Atlas: как раньше — белая рамка, прозрачный верх, белый низ */
const StyledAtlasProductCard = styled.div`
  position: absolute;
  width: 360px;
  border: 1px solid white;
  background: rgba(217, 217, 217, 0);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.card-controller {
    left: 1400px;
    top: 4500px;
    height: 525px;
    clip-path: polygon(0 0, calc(100% - 45px) 0, 100% 45px, 100% 100%, 0 100%);
    border: none;
    box-shadow: none;
  }

  &.card-motor { left: 1400px; top: 5025px; height: 470px; }
`

/* SVG-рамка карточки card-bottom-2: полный полигон — без артефактов clip-path */
const StyledCardBottom2DiagonalBorder = styled.svg`
  position: absolute;
  left: 1484px;
  top: 1645px;
  width: 290px;
  height: 296px;
  pointer-events: none;
  z-index: 100;
  overflow: visible;
`

/* SVG-рамка card-controller: полный полигон без артефактов clip-path */
const StyledAtlasDiagonalBorder = styled.svg`
  position: absolute;
  left: 1400px;
  top: 4500px;
  width: 360px;
  height: 525px;
  pointer-events: none;
  z-index: 100;
  overflow: visible;
`

const StyledAtlasCardImageArea = styled.button`
  flex: 1;
  min-height: 280px;
  background: rgba(217, 217, 217, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus {
    outline: none;
  }
`

const StyledAtlasCardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${StyledAtlasCardImageArea}:hover & {
    transform: scale(1.08);
  }
`

const StyledAtlasCardText = styled.div`
  background: white;
  padding: 24px 16px;
  color: #4a4d55;
  font-size: 22px;
  font-family: Inter;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;

  .card-controller & { font-size: 23px; }
`

const StyledAtlasMotorGlow = styled.div`
  position: absolute;
  width: 404px;
  height: 370px;
  left: 1373px;
  top: 5020px;
  border-radius: 50%;
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 255, 255, 0.60) 46%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
`

const StyledAtlasLine = styled.div`
  position: absolute;
  height: 1px;
  background: #9C9E9D;
  z-index: 100;
  /* От левой полосы (30px) до правой (1888px), без rotate — иначе линия уезжала влево за макет */
  &.line-1 { left: 30px; width: 1858px; top: 4350px; }
  &.line-2 { left: 30px; width: 1858px; top: 4440px; }
  &.line-3 { left: 30px; width: 1858px; top: 5380px; }
`

const StyledProductGlow = styled.div`
  position: absolute;
  width: 900px;
  height: 720px;
  left: 320px;
  top: 4530px;
  background: radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, white 46%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
`

const StyledMainProductImage = styled.img`
  position: absolute;
  width: 884px;
  height: 885px;
  left: 344px;
  top: 4460px;
  object-fit: contain;
`

const StyledContactTitle = styled.div`
  position: absolute;
  width: 257px;
  height: 48px;
  left: 1454px;
  top: 5562px;
  color: #4a4a4a;
  font-size: 45px;
  font-family: Inter;
  font-weight: 400;
`

const StyledContactImage = styled.img`
  position: absolute;
  width: 669px;
  height: 657px;
  left: 584px;
  top: 5613px;
  object-fit: cover;
`

const StyledContactMap = styled.iframe`
  position: absolute;
  width: 669px;
  height: 657px;
  left: 584px;
  top: 5613px;
  border: none;

  /* Магия: делаем все серым, а потом "вытягиваем" синий только там, где есть контраст */
  filter: grayscale(0.9) hue-rotate(190deg) saturate(0) brightness(0.9) contrast(1.2);
  
  /* 
     - grayscale(0.9): оставляем 10% цвета (этого хватит для плашки, но карта будет казаться серой)
     - hue-rotate(190deg): перекрашивает оставшиеся цвета в синий спектр
     - saturate(5): экстремально усиливает этот синий на плашке
     - brightness(0.9) и contrast(1.2): сохраняют дороги видимыми на сером фоне
  */
`;

const StyledFormTitle = styled.h2`
  position: absolute;
  left: 160px;
  top: 5385px;
  color: #5a5a5a;
  font-size: 120px;
  font-family: Inter;
  font-weight: 100;
`

const StyledFormDescription = styled.div`
  position: absolute;
  width: 700px;
  left: 547px;
  top: 5520px;
  text-align: center;
  color: #5c5c5c;
  font-size: 20px;
  font-family: Inter;
  font-weight: 400;
`

const StyledContactDetail = styled.div`
  position: absolute;
  text-align: center;
  color: #454545;
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;

  &.detail1 { width: 200px; left: 1475px; top: 5710px; }
  &.detail2 { width: 212px; left: 1473px; top: 5875px; }
  &.detail3 { width: 207px; left: 1477px; top: 6012px; }
`

const StyledContactDot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #9C9E9D;
  border-radius: 50%;

  &.dot1 { left: 1396px; top: 5740px; }
  &.dot2 { left: 1396px; top: 5890px; }
  &.dot3 { left: 1396px; top: 6030px; }
`

const StyledFormInput = styled.input`
  position: absolute;
  width: 390px;
  left: 110px;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #6e7073;
  background: transparent;
  color: #1e2128;
  font-size: 20px;
  font-family: Inter;
  font-weight: 400;
  text-align: center;
  outline: none;
  z-index: 100;

  &::placeholder {
    color: transparent;
  }

  &.input1 { top: 5720px; }
  &.input2 { top: 5865px; }
  &.input3 { top: 6010px; }
`

const StyledFormLabel = styled.label`
  position: absolute;
  width: 390px;
  left: 110px;
  margin: 0;
  color: #5c5c5c;
  font-size: 20px;
  font-family: Inter;
  font-weight: 400;
  text-align: center;
  z-index: 100;
  cursor: inherit;

  &.label1 { top: 5780px; }
  &.label2 { top: 5925px; }
  &.label3 { top: 6070px; }
`

const StyledFormStatus = styled.div`
  position: absolute;
  left: 110px;
  top: 6250px;
  font-size: 18px;
  font-family: Inter;
  z-index: 100;
`

const StyledFieldError = styled(motion.div)`
  position: absolute;
  width: 390px;
  left: 110px;
  text-align: center;
  color: #c62828;
  font-family: Inter;
  font-size: 15px;
  font-weight: 500;
  z-index: 100;
  padding: 8px 16px;
  background: rgba(244, 67, 54, 0.08);
  border-radius: 8px;
  border-left: 4px solid #c62828;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

const StyledContactLine = styled.div`
  position: absolute;
  background: #9C9E9D;
  z-index: 100;

  &.line-bottom { width: 1921px; height: 1px; left: -1px; top: 6360px; }
  &.line-side1 { width: 338px; height: 1px; left: 1400px; top: 6063px; transform: rotate(-90deg); transform-origin: top left; }
  &.line-side2 { width: 190px; height: 1px; left: 1760px; top: 6010px; transform: rotate(-90deg); transform-origin: top left; }
`

const StyledSubmitButtonWrapper = styled.div`
  position: absolute;
  width: 301.45px;
  height: 62.33px;
  left: 153.55px;
  top: 6207.67px;
`

const StyledSubmitButtonDot = styled.div`
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

const StyledSubmitButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #878787;
  border-radius: 0 8px 8px 8px;
  color: black;
  font-size: 32px;
  font-family: Inter;
  font-weight: 700;
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

  &:hover:not(:disabled) {
    color: white;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  span {
    position: relative;
    z-index: 1;
  }
`

/* Полосы с gradual taper — постепенно утончаются к концам (ярко выраженная острота) */
const taperedMask = 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'

const StyledDecorativeLine = styled.div`
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

  &.h-line-1 { width: 1920px; left: 70px; top: 1245px; }
  &.h-line-2 { width: 1010px; left: 70px; top: 1370px; }
  &.bolaite-line-18 { width: 2320px; left: 1282px; top: 3947px; transform: rotate(90deg); transform-origin: top left; }
  
  &.prod-line-1 { width: 535px; left: 70px; top: 1765px; }
  &.prod-line-2 { width: 535px; left: 70px; top: 1816px; }
  &.prod-line-3 { width: 490px; left: 629px; top: 2000px; }
  &.prod-line-4 { width: 490px; left: 629px; top: 2050px; }
  &.prod-line-5 { width: 616px; left: 1165px; top: 1995px; }
  &.prod-line-6 { width: 245px; left: 1133px; top: 2049px; transform: rotate(90deg); transform-origin: top left; }
  &.prod-line-7 { width: 525px; left: 430px; top: 1990px; transform: rotate(90deg); transform-origin: top left; }
  &.rect9-line-top { width: 1920px; left: 0; top: 2148px; }
  &.rect9-line-bottom { width: 1920px; left: 0; top: 3228px; }
  &.bolaite-line-18 { width: 2320px; left: 1282px; top: 3947px; transform: rotate(90deg); transform-origin: top left; }
`

/* Как на страницах продуктов: левая полоса 30px, правая 1888px */
const StyledLeftMarginStrip = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: 1px;
  height: ${DESIGN_HEIGHT}px;
  background: #9c9e9d;
  z-index: 50;
`

const StyledRightMarginStrip = styled.div`
  position: absolute;
  left: 1888px;
  top: 0;
  width: 1px;
  height: ${DESIGN_HEIGHT}px;
  background: #9c9e9d;
  z-index: 50;
`

const StyledBottomStrip = styled.div`
  position: absolute;
  left: 0;
  top: ${DESIGN_HEIGHT - 1}px;
  width: 100%;
  height: 1px;
  background: #272B37;
  z-index: 100;
`

const StyledFooterAddress = styled.address`
  position: absolute;
  top: ${DESIGN_HEIGHT - 85}px;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  font-family: Inter, sans-serif;
  font-weight: 100;
  font-size: 16px;
  text-align: center;
  font-style: normal;
  z-index: 100;
`

const StyledBolaitePlaceholder = styled.div`
  position: absolute;
  left: 505px;
  top: 3640px;
  width: 700px;
  color: #5c5c5c;
  font-size: 24px;
  font-family: Inter;
  font-weight: 400;
  text-align: right;
  line-height: 1.5;
`

const StyledDetailsLink = styled.a`
  position: absolute;
  left: 1275px;
  top: 3920px;
  color: #545454;
  font-size: 32px;
  font-family: Inter;
  font-weight: 200;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  transition: color 0.3s ease;

  &:hover {
    color: #272B37;
  }
`

const StyledDetailsDot = styled.div`
  width: 13px;
  height: 13px;
  background: #E2E2E2;
  border-radius: 50%;
`

const capitalizeFirst = (str) => {
  if (!str || str.length === 0) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const API_URL = import.meta.env.VITE_API_URL || ''

const Frame10 = () => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect(); // Перестаем следить, когда карта загружена
        }
      },
      { rootMargin: '200px' } // Начнет грузить карту за 200px до того, как пользователь до нее доскроллит
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('+7')
  const [formStatus, setFormStatus] = useState(null)
  const [formFieldError, setFormFieldError] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = []
    if (!formName || formName.length < 2) errors.push('name')
    const phoneDigits = formPhone.replace(/\D/g, '')
    if (phoneDigits.length < 11) errors.push('phone')
    if (!formEmail || !formEmail.includes('@')) errors.push('email')
    if (errors.length > 0) {
      setFormFieldError(errors)
      return
    }
    setFormFieldError([])
    setFormStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone
        })
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.success !== false)) {
        setFormStatus('success')
        setFormName('')
        setFormEmail('')
        setFormPhone('+7')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const handleNameChange = (e) => {
    const val = e.target.value
    if (val.length === 0) setFormName('')
    else setFormName(capitalizeFirst(val))
    setFormFieldError([])
  }
  const handleEmailChange = (e) => {
    setFormEmail(e.target.value)
    setFormFieldError([])
  }

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return '+7'
    let d = digits
    if (d[0] === '8') d = '7' + d.slice(1)
    else if (d[0] !== '7') d = '7' + d
    d = d.slice(0, 11) // макс 11 цифр: 7 + 10 цифр номера
    if (d.length <= 1) return '+' + d
    if (d.length <= 3) return `+7 (${d.slice(1)}`
    if (d.length <= 4) return `+7 (${d.slice(1, 4)})`
    if (d.length <= 7) return `+7 (${d.slice(1, 4)}) ${d.slice(4)}`
    if (d.length <= 9) return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`
    return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormPhone(formatted)
    setFormFieldError([])
  }

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH)
    window.addEventListener('resize', updateScale)
    updateScale()
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <PageWrapper>
      <ScrollSpacer $scale={scale} />
      <ScalableContent $scale={scale}>
    <StyledFrame10>
      <Header />
      <StyledLeftMarginStrip />
      <StyledRightMarginStrip />
      <StyledTopLine />
      <StyledHeaderBottomLine />
      <StyledHeaderVLine className="vl-1" />
      <StyledHeaderVLine className="vl-2" />
      <StyledHeaderVLine className="vl-3" />
      <StyledHeaderVLine className="vl-4" />
      <StyledRectangle16 />
      <StyledRectangle9 />
      <StyledDecorativeLine className="rect9-line-top" />
      <StyledDecorativeLine className="rect9-line-bottom" />
      <StyledDecorativeLine className="bolaite-line-18" />
      <StyledHeroBannerWrap>
        <StyledHeroBannerImg
          src="/images/maxresdefault 1.webp"
          alt="Промышленные воздушные компрессоры Bolaite на производстве"
          width={1920}
          height={716}
          {...heroImageProps}
        />
      </StyledHeroBannerWrap>

      <StyledLineEndDot className="left-top" />
      <StyledLineEndDot className="left-bottom" />
      <StyledLineEndDot className="right-top" />
      <StyledLineEndDot className="right-bottom" />
      <StyledLineEndDot className="rect9-left" />
      <StyledLineEndDot className="rect9-right" />
      <StyledLineEndDot className="rect9-bottom-left" />
      <StyledLineEndDot className="rect9-bottom-right" />
      <StyledLineEndDot className="v3-top" />
      <StyledLineEndDot className="v3-bottom" />
      <StyledLineEndDot className="l1-top" />
      <StyledLineEndDot className="l1-bottom" />
      <StyledLineEndDot className="l2-top" />
      <StyledLineEndDot className="l2-bottom" />
      <StyledLineEndDot className="l3-top" />
      <StyledLineEndDot className="l3-bottom" />

      <h1 className="sr-only">
        Продажа и обслуживание воздушных компрессоров в Иркутске
      </h1>

 <StyledHeroBrand
  as={motion.div}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  style={{ 
    left: '50px',      /* Прижат к левой линии */
    top: '860px',      /* ОПУСТИЛИ ЕГО (было 780-800) */
    width: '1050px',    /* Размер для четкости */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    zIndex: 20
  }}
>
  <img 
    src="/images/aboutus/14 - 6 1.png" 
    alt="Логотип Новая Техника" 
    style={{ width: '100%', height: 'auto', display: 'block' }} 
  />
  
  {/* Подпись под ТЕХНИКА строчными буквами */}
<div style={{ 
  color: '#9C9E9D', 
  fontSize: '24px', 
  marginTop: '-30px', /* Твой подогнанный отступ */
  textAlign: 'right',
  width: '100%',
  /* Подбираем padding, чтобы край буквы 'ы' совпал с краем 'Я' */
  paddingRight: '5px', 
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.5px',
  lineHeight: '1'
}}>
  Воздушные компрессоры
</div>
</StyledHeroBrand>

      <StyledRightPanel />
      <StyledCallToActionArea />
      <StyledCTATitle href="#request-form">ОСТАВИТЬ ЗАЯВКУ</StyledCTATitle>
      <StyledCTALine />

      <StyledCTAText className="text1">Наша компания — надежный партнер в поставках продукции Bolaite.</StyledCTAText>
      <StyledCTAText className="text2">Производство, заслужившее доверие клиентов,</StyledCTAText>
      <StyledCTAText className="text3">широкое признание</StyledCTAText>
      <StyledCTAText className="info777">и высокие оценки на рынке.</StyledCTAText>

      <StyledDecorativeLine className="h-line-1" />
      <StyledDecorativeLine className="h-line-2" />
      <StyledDecorativeLine className="prod-line-1" />
      <StyledDecorativeLine className="prod-line-2" />
      <StyledDecorativeLine className="prod-line-3" />
      <StyledDecorativeLine className="prod-line-4" />
      <StyledDecorativeLine className="prod-line-5" />
      <StyledDecorativeLine className="prod-line-6" />
      <StyledDecorativeLine className="prod-line-7" />
      <StyledDecorativeLine className="bolaite-line-18" />

      <StyledProductsTitle>ПРОДУКЦИЯ</StyledProductsTitle>

      <StyledProductCard
        className="card-1"
        href="#"
        aria-label="Винтовой компрессор Новая Техника купить в Иркутске"
      >
        <StyledProductImage
          src="/images/bolaite-compressor-1.png"
          alt="Винтовой компрессор Новая Техника купить в Иркутске"
          {...lazyImageProps(266, 260)}
        />
      </StyledProductCard>

      <StyledProductCard
        className="card-2"
        href="#"
        aria-label="Дизельный передвижной компрессор цена Иркутск"
      >
        <StyledProductImage
          src="/images/liutech-portable-air-compressor-211-1.jpg 1.png"
          alt="Дизельный передвижной компрессор цена — Новая Техника Иркутск"
          {...lazyImageProps(267, 260)}
        />
      </StyledProductCard>

      <StyledProductCard
        className="card-large"
        href="#"
        aria-label="Продажа безмасляных компрессоров цена Иркутск"
      >
        <StyledProductImage
          className="large"
          src="/images/oil-free-800-800.jpg 1.png"
          alt="Продажа безмасляного компрессора цена — Новая Техника Иркутск"
          {...lazyImageProps(500, 490)}
        />
      </StyledProductCard>

      <StyledProductDesc className="desc1">Bolaite предлагает</StyledProductDesc>
      <StyledProductDesc className="desc2">широкий ассортимент воздушных компрессоров</StyledProductDesc>
      <StyledProductDesc className="desc3">для клиентов ценящих качество</StyledProductDesc>
      <StyledProductDesc className="desc4">Выберите свой компрессор</StyledProductDesc>

      <StyledProductSpec className="title1">Bltopm 10-175</StyledProductSpec>
      <StyledProductSpec className="brand1">Liutech LUY050-7</StyledProductSpec>
      <StyledProductSpec className="text1">Масляный компрессор</StyledProductSpec>
      <StyledProductSpec className="text2">Дизельный компрессор</StyledProductSpec>

      <StyledProductSpec className="title2">Bolaite SPR oil-free scroll</StyledProductSpec>
      <StyledProductSpec className="text3">Безмаслянный воздушный компрессор</StyledProductSpec>

      <StyledProductSpec className="title3">Oil free air compressors-BLW Series</StyledProductSpec>
      <StyledProductSpec className="brand3">Laser cutting-BLT 16bar Series</StyledProductSpec>
      <StyledProductSpec className="text4">Безмаслянный воздушный компрессор</StyledProductSpec>
      <StyledProductSpec className="text5">Воздушный компрессор для лазерной резки</StyledProductSpec>

      <StyledProductCard2
        className="card-bottom-1"
        href="#"
        aria-label="Промышленный винтовой компрессор Bolaite Иркутск"
      >
        <StyledProductImage
          className="product3"
          src="/images/bolaite-compressor-blt-150a.png"
          alt="Промышленный винтовой компрессор Bolaite — купить в Иркутске, Новая Техника"
          {...lazyImageProps(305, 296)}
        />
      </StyledProductCard2>

      <StyledProductCard2
        className="card-bottom-2"
        href="#"
        aria-label="Промышленный компрессор для лазерной резки Иркутск"
      >
        <StyledProductImage
          className="product2"
          src="/images/laser-cutting-3-800-800.jpg 1.png"
          alt="Промышленный воздушный компрессор для лазерной резки — Иркутск, Новая Техника"
          {...lazyImageProps(290, 296)}
        />
      </StyledProductCard2>
      <StyledCardBottom2DiagonalBorder viewBox="0 0 290 296">
        <polygon
          points="0.5,0.5 289.5,0.5 289.5,251 244.5,295.5 0.5,295.5"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </StyledCardBottom2DiagonalBorder>

      <StyledCatalogButton>ОТКРЫТЬ КАТАЛОГ</StyledCatalogButton>

      <StyledWorkflowTitleDot />
      <StyledWorkflowTitle>ЭТАПЫ РАБОТЫ</StyledWorkflowTitle>
      <StyledWorkflowNode className="node-2" />
      <StyledWorkflowNode className="node-3" />
      <StyledWorkflowNode className="node-4" />
      <StyledWorkflowNode className="node-5" />
      <StyledWorkflowNode className="node-6" />

      <StyledStepCard className="step-1">
        <StyledStepTitle>ЗАЯВКА</StyledStepTitle>
      </StyledStepCard>

      <StyledStepCard className="step-2">
        <StyledStepTitle>РАЗМЕЩЕНИЕ<br/>ЗАКАЗА</StyledStepTitle>
      </StyledStepCard>

      <StyledStepCard className="step-3">
        <StyledStepTitle>ОТГРУЗКА</StyledStepTitle>
      </StyledStepCard>

      <StyledStepCard className="step-4">
        <StyledStepTitle>ДОСТАВКА<br/>/ ЗАБРАТЬ<br/>СО СКЛАДА</StyledStepTitle>
      </StyledStepCard>

      <StyledStepCard className="step-5">
        <StyledStepTitle>ЗАКЛЮЧЕНИЕ ДОГОВОРА</StyledStepTitle>
      </StyledStepCard>

      <StyledCTAButton href="#request-form">СВЯЗАТЬСЯ</StyledCTAButton>

      <StyledCompanyTitle className="bolaite">Bolaite - компания</StyledCompanyTitle>
      <StyledCompanyTitle className="swedish">шведской группы</StyledCompanyTitle>
      <StyledCompanyTitle className="atlas">Atlas Copco</StyledCompanyTitle>
      <StyledBolaitePlaceholder>
        Специализируется на предоставлении клиентам
        инновационных решений для достижения
        устойчиво высокой производительности
      </StyledBolaitePlaceholder>
      <StyledDetailsLink href="/about">
        <StyledDetailsDot />
        ПОДРОБНЕЕ
      </StyledDetailsLink>

      <StyledAtlasTitle>КАЧЕСТВО ОТ ATLAS COPCO</StyledAtlasTitle>
      <StyledAtlasSubtitle>КОМПРЕССОРНЫЙ БЛОК</StyledAtlasSubtitle>

      <StyledLineEndDot className="atlas-line1-left" />
      <StyledLineEndDot className="atlas-line1-right" />
      <StyledLineEndDot className="atlas-line2-left" />
      <StyledLineEndDot className="atlas-line2-right" />
      <StyledLineEndDot className="atlas-line3-left" />
      <StyledLineEndDot className="atlas-line3-right" />
      <StyledAtlasLine className="line-1" />
      <StyledAtlasLine className="line-2" />
      <StyledAtlasLine className="line-3" />


      <StyledProductGlow />
      <StyledMainProductImage
        src="/images/atlas-copco-airend-800-800.png 2.png"
        alt="Промышленный компрессорный блок Atlas Copco — сервис в Иркутске, Новая Техника"
        {...lazyImageProps(884, 885)}
      />

      <StyledAtlasProductCard className="card-controller">
        <StyledAtlasCardImageArea className="controller" as="button" type="button" aria-label="Двигатель постоянного тока с масляным охлаждением">
          <StyledAtlasCardImage
            src="/images/mk5s-controller800-800-1.png 1.png"
            alt="Двигатель постоянного тока с масляным охлаждением для промышленного компрессора — Иркутск"
            {...lazyImageProps(800, 800)}
          />
        </StyledAtlasCardImageArea>
        <StyledAtlasCardText>Двигатель постоянного тока с масляным охлаждением</StyledAtlasCardText>
      </StyledAtlasProductCard>
      <StyledAtlasDiagonalBorder viewBox="0 0 360 525">
        <polygon
          points="0.5,0.5 315,0.5 359.5,45 359.5,524.5 0.5,524.5"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </StyledAtlasDiagonalBorder>

      <StyledAtlasMotorGlow />
      <StyledAtlasProductCard className="card-motor">
        <StyledAtlasCardImageArea as="button" type="button" aria-label="Контроллер Atlas Copco">
          <StyledAtlasCardImage
            src="/images/oil-cooled-motor-800-800.png 1.png"
            alt="Контроллер Atlas Copco для компрессорного оборудования — Новая Техника Иркутск"
            {...lazyImageProps(800, 800)}
          />
        </StyledAtlasCardImageArea>
        <StyledAtlasCardText>Контроллер Atlas Copco</StyledAtlasCardText>
      </StyledAtlasProductCard>

      <StyledFormTitle id="request-form">ОСТАВИТЬ ЗАЯВКУ</StyledFormTitle>
      <StyledFormDescription>
        Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами, заполнив форму ниже
      </StyledFormDescription>

      <form onSubmit={handleSubmit} noValidate style={{ position: 'relative' }} aria-label="Форма заявки">
        <StyledFormLabel className="label1" htmlFor="frame10-name-input">
          Имя
        </StyledFormLabel>
        <StyledFormInput
          id="frame10-name-input"
          className="input1"
          type="text"
          name="Имя"
          value={formName}
          onChange={handleNameChange}
          placeholder=""
          autoComplete="name"
        />

        <StyledFormLabel className="label2" htmlFor="frame10-email-input">
          Почта
        </StyledFormLabel>
        <StyledFormInput
          id="frame10-email-input"
          className="input2"
          type="email"
          name="Почта"
          value={formEmail}
          onChange={handleEmailChange}
          placeholder=""
          autoComplete="email"
        />

        <StyledFormLabel className="label3" htmlFor="frame10-phone-input">
          Номер телефона
        </StyledFormLabel>
        <StyledFormInput
          id="frame10-phone-input"
          className="input3"
          type="tel"
          name="Номер телефона"
          value={formPhone}
          onChange={handlePhoneChange}
          placeholder=""
          inputMode="numeric"
          maxLength={18}
          autoComplete="tel"
        />

        {formFieldError.includes('name') && (
          <StyledFieldError
            style={{ top: 5675 }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            Введите имя
          </StyledFieldError>
        )}
        {formFieldError.includes('phone') && (
          <StyledFieldError
            style={{ top: 5965 }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            Введите корректный номер телефона
          </StyledFieldError>
        )}
        {formFieldError.includes('email') && (
          <StyledFieldError
            style={{ top: 5820 }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            Некорректный адрес почты
          </StyledFieldError>
        )}

        <StyledBottomStrip />
        <StyledSubmitButtonWrapper>
          <StyledSubmitButtonDot />
          <StyledSubmitButton type="submit" disabled={formStatus === 'sending'}>
            <span>{formStatus === 'sending' ? 'ОТПРАВКА...' : formStatus === 'success' ? 'ОТПРАВЛЕНО' : 'ОТПРАВИТЬ'}</span>
          </StyledSubmitButton>
        </StyledSubmitButtonWrapper>
        {formStatus === 'error' && (
          <StyledFormStatus style={{ color: '#f44336' }}>Ошибка. Попробуйте позже.</StyledFormStatus>
        )}
      </form>

      <StyledContactTitle>КОНТАКТЫ</StyledContactTitle>
      <StyledContactMap
        ref={mapRef}
        src={showMap ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.2128541421534!2d104.31857829270075!3d52.27423208915822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da83b6ec3756c65%3A0x8609dae84f34f7b6!2z0YPQuy4g0KLRgNC40LvQuNGB0YHQtdGA0LAsIDg3LCDQmNGA0LrRg9GC0YHQuiwg0JjRgNC60YPRgtGB0LrQsNGPINC-0LHQuy4sIDY2NDA0Nw!5e0!3m2!1sru!2sru!4v1773172256239!5m2!1sru!2sru" : ""}
        title="Карта: Иркутск, ул. Трилиссера 87"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"/>

      <StyledContactDot className="dot1" />
      <StyledContactDetail className="detail1">Иркутск, Трилиссера 87</StyledContactDetail>

      <StyledContactDot className="dot2" />
      <StyledContactDetail className="detail2">+7 (395) 297-90-37</StyledContactDetail>

      <StyledContactDot className="dot3" />
      <StyledContactDetail className="detail3">Office@ntechnics.ru</StyledContactDetail>

      <StyledContactLine className="line-bottom" />
      <StyledLineEndDot className="contact-line-bottom-left" />
      <StyledLineEndDot className="contact-line-bottom-right" />
      <StyledContactLine className="line-side1" />
      <StyledContactLine className="line-side2" />

      <StyledFooterAddress>
        телефон +7 (395) 297-90-37
        <br />
        почта: Office@ntechnics.ru
        <br />
        адрес: Иркутск, Трилиссера 87
      </StyledFooterAddress>
      
      {/* Твоя вотермарка */}
      <CopyrightLink 
        href="https://khatagov-dev.ru" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        сделано Khatagov / Lowl1ght-dev
      </CopyrightLink>
    </StyledFrame10>
      </ScalableContent>
    </PageWrapper>
  )
}

export { Frame10 as default }
