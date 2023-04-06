import prisma from '../../../lib/prisma'

export const createPizza = async ({ name, toppings }) => {
  return await prisma.pizza.create({
    data: { name, toppings },
    select: {
      id: true,
      name: true,
      toppings: true,
    },
  })
}

export const updatePizza = async ({ id, name, toppings }) => {
  return prisma.pizza.update({
    where: { id },
    data: { name, toppings },
  })
}

export const deletePizza = async (pizzaId) => {
  return await prisma.pizza.delete({
    where: { id: pizzaId },
  })
}

export const getAllPizzas = async () => {
  return await prisma.pizza.findMany({
    select: {
      id: true,
      name: true,
      toppings: true,
    },
  })
}

export const isExistingPizza = async (pizzaName) => {
  const existingTopping = await prisma.pizza.findFirst({
    where: {
      name: pizzaName,
    },
  })

  return !!existingTopping
}
