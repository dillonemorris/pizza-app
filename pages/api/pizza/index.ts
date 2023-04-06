import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name, toppings } = req.body

  if (req.method === 'GET') {
    const pizzas = await prisma.pizza.findMany({
      select: {
        name: true,
        toppings: true,
        id: true,
      },
    })

    res.json({ pizzas })
  }

  const existingPizza = await prisma.pizza.findFirst({
    where: {
      name,
    },
  })

  if (req.method === 'POST') {
    if (!!existingPizza) {
      throw new Error(
        `Pizza "${name}" already exists. Please input a unique pizza name.`
      )
    }

    try {
      const result = await prisma.pizza.create({
        data: { name, toppings },
        select: {
          name: true,
          toppings: true,
          id: true,
        },
      })

      res.status(200).json(result)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }
}
