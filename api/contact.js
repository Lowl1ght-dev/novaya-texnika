import nodemailer from 'nodemailer'

const MAIL_TO = process.env.MAIL_TO || 'dmvzlm12@mail.ru'
const SMTP_USER = process.env.SMTP_USER || 'ntechnics-robot@yandex.ru'
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.yandex.ru'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10)
const FROM_EMAIL = process.env.FROM_EMAIL || 'ntechnics-robot@yandex.ru'
const FROM_NAME = process.env.FROM_NAME || 'Сайт Новая техника'

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

async function readJsonBody(req) {
  if (req.body != null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }
  if (typeof req.body === 'string' && req.body) {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  const chunks = []
  try {
    for await (const chunk of req) {
      chunks.push(chunk)
    }
  } catch {
    return {}
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  setCors(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  const path = (req.url || '').split('?')[0]

  if (req.method === 'GET' && path.includes('health')) {
    return res.status(200).json({
      ok: true,
      mailTo: MAIL_TO,
      smtpConfigured: !!(SMTP_USER && SMTP_PASS),
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  let body
  try {
    body = await readJsonBody(req)
  } catch {
    return res.status(400).json({ success: false, error: 'Некорректный JSON' })
  }

  const { name, phone, email } = body || {}
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Имя и телефон обязательны' })
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('SMTP не настроен: задайте SMTP_USER и SMTP_PASS')
    return res.status(500).json({
      success: false,
      error: 'Сервер не настроен. Проверьте SMTP_USER и SMTP_PASS',
    })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: MAIL_TO,
    subject: 'Новая заявка с сайта',
    text: [`Имя: ${name}`, `Номер телефона: ${phone}`, `Почта: ${email || '—'}`].join('\n'),
    html: [
      '<h2>Новая заявка</h2>',
      `<p><strong>Имя:</strong> ${name}</p>`,
      `<p><strong>Номер телефона:</strong> ${phone}</p>`,
      `<p><strong>Почта:</strong> ${email || '—'}</p>`,
      '<hr>',
      '<p><small>Письмо отправлено с сайта ntechnics.ru</small></p>',
    ].join(''),
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Ошибка отправки:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
