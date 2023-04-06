import { prismaMock } from './../singleton'
import {
  createPizza,
  createTopping,
  updateTopping,
  deleteTopping,
  updatePizza,
  deletePizza,
} from './mock-db-functions'

describe('Testing pizza and topping APIs', () => {
  test('create topping', async () => {
    const topping = {
      id: '1',
      name: 'Sausage',
    }

    prismaMock.topping.create.mockResolvedValue(topping)

    await expect(createTopping(topping.name)).resolves.toEqual({
      id: '1',
      name: 'Sausage',
    })
  })

  test('create pizza', async () => {
    const pizza = {
      id: '1',
      name: 'Meat Lovers',
      toppings: ['Sausage', 'Pepperoni', 'Cheese'],
    }

    prismaMock.pizza.create.mockResolvedValue(pizza)

    await expect(createPizza(pizza)).resolves.toEqual({
      id: '1',
      name: 'Meat Lovers',
      toppings: ['Sausage', 'Pepperoni', 'Cheese'],
    })
  })

  test('Update topping', async () => {
    const topping = {
      id: '1',
      name: 'Pepperoni',
    }

    prismaMock.topping.update.mockResolvedValue(topping)

    await expect(updateTopping(topping)).resolves.toEqual({
      id: '1',
      name: 'Pepperoni',
    })
  })

  test('Delete topping', async () => {
    const topping = {
      id: '1',
      name: 'Pepperoni',
    }

    prismaMock.topping.delete.mockResolvedValue(topping)

    await expect(deleteTopping(topping.id)).resolves.toEqual({
      id: '1',
      name: 'Pepperoni',
    })
  })

  test('Update pizza', async () => {
    const pizza = {
      id: '1',
      name: 'Meat Lovers',
      toppings: ['Sausage', 'Pepperoni', 'Cheese', 'Bacon'],
    }

    prismaMock.pizza.update.mockResolvedValue(pizza)

    await expect(updatePizza(pizza)).resolves.toEqual({
      id: '1',
      name: 'Meat Lovers',
      toppings: ['Sausage', 'Pepperoni', 'Cheese', 'Bacon'],
    })
  })

  test('Delete pizza', async () => {
    const pizza = {
      id: '1',
      name: 'Pepperoni',
      toppings: ['Sausage', 'Pepperoni', 'Cheese', 'Bacon'],
    }

    prismaMock.pizza.delete.mockResolvedValue(pizza)

    await expect(deletePizza(pizza.id)).resolves.toEqual({
      id: '1',
      name: 'Pepperoni',
      toppings: ['Sausage', 'Pepperoni', 'Cheese', 'Bacon'],
    })
  })
})
