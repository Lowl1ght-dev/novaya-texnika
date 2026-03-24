import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './NotFound.css'

const NotFound = () => {
  const stamps = Array.from({ length: 20 })

  return (
    <>
      <Helmet>
        <title>Страница не найдена (404) — Новая Техника</title>
        <meta name="description" content="Запрошенный адрес не существует. Перейдите на главную страницу." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="not-found-container">
        <h1 className="not-found-hint">Ошибка 404</h1>
        <div className="rail">
          {stamps.map((_, i) => (
            <div key={i} className={`stamp ${i % 2 === 0 ? 'four' : 'zero'}`}>
              {i % 2 === 0 ? '4' : '0'}
            </div>
          ))}
        </div>
        <div className="world">
          <div className="forward">
            <div className="box">
              <div className="wall" />
              <div className="wall" />
              <div className="wall" />
              <div className="wall" />
              <div className="wall" />
              <div className="wall" />
            </div>
          </div>
        </div>

        <div className="not-found-actions">
          <Link to="/" className="back-home">
            ВЕРНУТЬСЯ НА ГЛАВНУЮ
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
