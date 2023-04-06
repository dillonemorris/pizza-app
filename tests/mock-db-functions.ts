import prisma from '../clientMock'

export const createTopping = async (toppingName) => {
  return await prisma.topping.create({
    data: { name: toppingName },
    select: {
      id: true,
      name: true,
    },
  })
}

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

export const updateTopping = async ({ id, name }) => {
  return await prisma.topping.update({
    where: { id },
    data: { name },
  })
}

export const deleteTopping = async (toppingId) => {
  return await prisma.topping.delete({
    where: { id: toppingId },
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
