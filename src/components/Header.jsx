import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeaderBackground = styled.div`
  width: 100%;
  height: 96px;
  left: 0;
  top: 0;
  position: absolute;
  background: white;
  z-index: 5;
`

const StyledLogoLink = styled(Link)`
  position: absolute;
  left: 60px;
  top: 36px;
  height: 52px;
  z-index: 10;
  display: block;
`

const StyledLogo = styled.img`
  height: 52px;
  width: auto;
  object-fit: contain;
  display: block;
`

const StyledNavText = styled.span`
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  .nav-item:hover &::after,
  .nav-item.active &::after {
    transform: scaleX(1);
  }
`

const StyledNavItem = styled.a`
  position: absolute;
  color: #545454;
  font-size: 24px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
  text-align: center;
  z-index: 10;
  box-sizing: border-box;

  &:hover {
    color: #272B37;
  }

  &.active {
    color: #272B37;
  }

  &.nav-1 { width: 150px; height: 17px; left: 335px; top: 40px; }
  &.nav-2 { width: 163px; height: 17px; left: 616px; top: 40px; }
  &.nav-3 { width: 155px; height: 17px; left: 905px; top: 40px; }
  &.nav-4 { width: 102px; height: 17px; left: 1168px; top: 40px; }
  &.nav-5 { width: 146px; height: 17px; left: 1402px; top: 40px; }
`

const StyledContactInfo = styled.div`
  position: absolute;
  color: #545454;
  font-size: 20px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  z-index: 10;

  &.email { left: 1630px; top: 31px; }
  &.phone { left: 1626px; top: 55px; }
`

const pathToNav = { '/': 'nav-1', '/products': 'nav-2', '/parts': 'nav-3', '/about': 'nav-4', '/contacts': 'nav-5' }

const Header = () => {
  const { pathname } = useLocation()
  const activeNav = pathToNav[pathname] || null

  return (
    <>
      <StyledHeaderBackground />
      <StyledLogoLink to="/">
        <StyledLogo
          src="/images/aboutus/14 - 6 1.png"
          alt="Новая техника — знак НТ"
          width={120}
          height={52}
          loading="eager"
          fetchpriority="low"
          decoding="async"
        />
      </StyledLogoLink>
      <StyledNavItem href="/" className={`nav-1 nav-item ${activeNav === 'nav-1' ? 'active' : ''}`}><StyledNavText>ГЛАВНАЯ</StyledNavText></StyledNavItem>
      <StyledNavItem href="/products" className={`nav-2 nav-item ${activeNav === 'nav-2' ? 'active' : ''}`}><StyledNavText>ПРОДУКЦИЯ</StyledNavText></StyledNavItem>
      <StyledNavItem href="/parts" className={`nav-3 nav-item ${activeNav === 'nav-3' ? 'active' : ''}`}><StyledNavText>ЗАПЧАСТИ</StyledNavText></StyledNavItem>
      <StyledNavItem href="/about" className={`nav-4 nav-item ${activeNav === 'nav-4' ? 'active' : ''}`}><StyledNavText>О НАС</StyledNavText></StyledNavItem>
      <StyledNavItem href="/contacts" className={`nav-5 nav-item ${activeNav === 'nav-5' ? 'active' : ''}`}><StyledNavText>КОНТАКТЫ</StyledNavText></StyledNavItem>
      <StyledContactInfo className="email">Office@ntechnics.ru</StyledContactInfo>
      <StyledContactInfo className="phone">+7 (395) 297-90-37</StyledContactInfo>
    </>
  )
}

export default Header
