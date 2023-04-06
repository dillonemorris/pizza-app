import prisma from '../../../lib/prisma'

// GET /api/topping
// POST /api/topping
export default async function handle(req, res) {
  const { name } = req.body

  if (req.method === 'GET') {
    const toppings = await prisma.topping.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    res.json({ toppings })
  }

  const existingTopping = await prisma.topping.findFirst({
    where: {
      name,
    },
  })

  if (req.method === 'POST') {
    try {
      if (!!existingTopping) {
        throw new Error(
          `Topping "${name}" already exists. Cannot create duplicate toppings`
        )
      }

      const result = await prisma.topping.create({
        data: { name },
        select: {
          id: true,
          name: true,
        },
      })

      res.status(200).json(result)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }
}
