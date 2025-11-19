let orders = {}
let counter = 1000

export default function handler(req, res){
  if (req.method === 'POST') {
    const { items, customer } = req.body || {}
    const id = 'ORD' + (counter++)
    orders[id] = { id, items, customer, status: 'placed', date: new Date().toISOString() }
    return res.status(201).json({ id })
  }
  if (req.method === 'GET') {
    const { id } = req.query
    if (id) {
      return res.status(200).json(orders[id] || null)
    }
    return res.status(200).json(Object.values(orders))
  }
  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end('Method Not Allowed')
}
