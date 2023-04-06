import prisma from '../../../lib/prisma'

export const createTopping = async (toppingName) => {
  return await prisma.topping.create({
    data: { name: toppingName },
    select: {
      id: true,
      name: true,
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

export const isExistingTopping = async (toppingName) => {
  const existingTopping = await prisma.topping.findFirst({
    where: {
      name: toppingName,
    },
  })

  return !!existingTopping
}

export const getAllToppings = async () => {
  return await prisma.topping.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}
