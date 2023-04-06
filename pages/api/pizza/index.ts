import prisma from '../../../lib/prisma'
import { createPizza, getAllPizzas, isExistingPizza } from './db-functions'

// GET /api/pizza
// POST /api/pizza
export default async function handle(req, res) {
  const { name, toppings } = req.body

  if (req.method === 'GET') {
    const pizzas = await getAllPizzas()

    res.json({ pizzas })
  }

  const pizzaExists = await isExistingPizza(name)

  if (req.method === 'POST') {
    try {
      if (!!pizzaExists) {
        throw new Error(
          `Pizza "${name}" already exists. Please input a unique pizza name.`
        )
      }

      const result = await createPizza({ name, toppings })

      res.status(200).json(result)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }
}
