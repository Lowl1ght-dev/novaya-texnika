/**
 * Заглушка для Vercel: форма получает 200 + { success: true }.
 * Почту можно подключить позже (nodemailer / внешний сервис).
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  return res.status(200).json({ success: true })
}
