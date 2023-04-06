import {
  createTopping,
  getAllToppings,
  isExistingTopping,
} from './db-functions'

// GET /api/topping
// POST /api/topping
export default async function handle(req, res) {
  const { name } = req.body

  if (req.method === 'GET') {
    const toppings = await getAllToppings()

    res.json({ toppings })
  }

  const toppingExists = await isExistingTopping(name)

  if (req.method === 'POST') {
    try {
      if (toppingExists) {
        throw new Error(
          `Topping "${name}" already exists. Cannot create duplicate toppings`
        )
      }

      const result = await createTopping(name)

      res.status(200).json(result)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }
}
