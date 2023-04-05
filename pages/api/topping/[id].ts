import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { id } = req.query
  const { name } = req.body

  if (req.method === 'PATCH') {
    const existingTopping = await prisma.topping.findFirst({
      where: {
        name,
      },
    })

    try {
      if (!!existingTopping) {
        throw new Error(
          'Topping already exists. Cannot create duplicate toppings'
        )
      }

      const topping = await prisma.topping.update({
        where: { id },
        data: { name },
      })

      res.status(200).json(topping)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    const topping = await prisma.topping.delete({
      where: { id },
    })

    res.json(topping)
  }
}
