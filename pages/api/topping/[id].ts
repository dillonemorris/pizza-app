import { deleteTopping, isExistingTopping, updateTopping } from './db-functions'

// PATCH /api/topping/:id
// DELETE /api/topping/:id
export default async function handle(req, res) {
  const { id } = req.query
  const { name } = req.body

  if (req.method === 'PATCH') {
    const toppingExists = await isExistingTopping(name)

    try {
      if (!!toppingExists) {
        throw new Error(
          'Topping already exists. Cannot create duplicate toppings'
        )
      }

      const topping = await updateTopping({ id, name })

      res.status(200).json(topping)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
  }

  if (req.method === 'DELETE') {
    const topping = await deleteTopping(id)

    res.json(topping)
  }
}
