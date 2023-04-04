import Head from 'next/head'
import prisma from '../../lib/prisma'
import { GetStaticProps } from 'next'
import { PlusIcon } from '@heroicons/react/20/solid'

// TODO:
// Render toppings from db (pass through to <List />)
// Wire up new toppings input (possibly separate into component)

export default function Toppings({ toppings }) {
  return (
    <div>
      <Head>
        <title>Hi Owner!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12">
        <label
          htmlFor="topping"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          New topping
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              name="topping"
              id="topping"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none"
              placeholder="Pepperoni"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon
              className="-ml-0.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Add
          </button>
        </div>
      </div>

      <List />
    </div>
  )
}

const toppings = [
  {
    id: 1,
    name: 'Pepperoni',
  },
  {
    id: 2,
    name: 'Sausage',
  },
  {
    id: 3,
    name: 'Cheese',
  },
  {
    id: 4,
    name: 'Garlic',
  },
]

const List = () => {
  return (
    <div className="mt-12 px-1">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {toppings.map((topping) => (
          <li key={topping.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {topping.name}
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
  const toppings = await prisma.topping.findMany({
    select: {
      name: true,
    },
  })

  return {
    props: { toppings },
    revalidate: 10,
  }
}
