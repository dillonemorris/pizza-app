import prisma from '../../../lib/prisma'

// PATCH /api/pizza/:id
// DELETE /api/pizza/:id
export default async function handle(req, res) {
  const { id } = req.query
  const { name, toppings } = req.body

  if (req.method === 'PATCH') {
    try {
      const pizza = await prisma.pizza.update({
        where: { id },
        data: { name, toppings },
      })

      res.status(200).json(pizza)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    const pizza = await prisma.pizza.delete({
      where: { id },
    })

    res.json(pizza)
  }
}
