import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name } = req.body

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
          name: true,
          id: true,
        },
      })

      res.status(200).json(result)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }

  if (req.method === 'GET') {
    const toppings = await prisma.topping.findMany({
      select: {
        name: true,
        id: true,
      },
    })

    res.json({ toppings })
  }
}
