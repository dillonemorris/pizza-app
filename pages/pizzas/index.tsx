import Head from 'next/head'
import prisma from '../../lib/prisma'
import { GetStaticProps } from 'next'
import { Modal } from '../../components'
import { useState } from 'react'

export default function Pizzas({ pizzas }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Head>
        <title>Hello Chef!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-16">
        <button
          onClick={() => setIsOpen(true)}
          href="#"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Create new pizza
        </button>
        <List />
      </div>
      <CreatePizzaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

const CreatePizzaModal = ({ isOpen, onClose }) => {
  // TODO:
  // Add Simple list with heading from tailwind-ui
  // Add input for pizza name
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Create new pizza</h2>
    </Modal>
  )
}

const pizzas = [
  {
    id: 1,
    name: 'Italian',
    toppingsCount: 4,
  },
  {
    id: 2,
    name: 'The Greek',
    toppingsCount: 6,
  },
  {
    id: 3,
    name: 'Simple Cheese',
    toppingsCount: 2,
  },
  {
    id: 4,
    name: 'Another pizza',
    toppingsCount: 12,
  },
]

const List = () => {
  return (
    <div className="mt-12 px-1">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {pizzas.map((pizza) => (
          <li key={pizza.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {pizza.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {pizza.toppingsCount} toppings
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
              >
                Delete
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pizzas = await prisma.pizza.findMany({
    select: {
      name: true,
      toppings: true,
    },
  })

  return {
    props: { pizzas },
    revalidate: 10,
  }
}
