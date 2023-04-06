import { useState } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Modal } from '../../components'
import { Pizza } from '../../components/types'
import { CreatePizzaModal } from './CreatePizzaModal'

export default function Pizzas() {
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
        <PizzaList />
      </div>
      <CreatePizzaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

const PizzaList = () => {
  const { data, isLoading } = useSWR('/api/pizza')

  if (isLoading) {
    return null
  }

  return (
    <div className="mt-12 px-1">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {data.pizzas.map((pizza) => (
          <li key={pizza.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {pizza.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {pizza.toppings.length} topping
                  {pizza.toppings.length !== 1 ? 's' : null}
                </p>
              </div>
              <EditPizzaButton pizza={pizza} />
              <DeletePizzaButton pizza={pizza} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

type EditPizzaButtonProps = {
  pizza: Pizza
}

const EditPizzaButton = ({ pizza }: EditPizzaButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Edit
      </button>
      <EditPizzaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pizza={pizza}
      />
    </>
  )
}

type EditPizzaModalProps = {
  pizza: Pizza
  isOpen: boolean
  onClose: () => void
}

const EditPizzaModal = ({ isOpen, onClose, pizza }: EditPizzaModalProps) => {
  return (
    <CreatePizzaModal
      isEditing
      isOpen={isOpen}
      onClose={onClose}
      initialPizza={pizza}
    />
  )
}

const DeletePizzaButton = ({ pizza }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
      >
        Delete
      </button>
      <DeletePizzaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pizza={pizza}
      />
    </>
  )
}

type DeletePizzaModalProps = {
  pizza: Pizza
  isOpen: boolean
  onClose: () => void
}

const DeletePizzaModal = ({
  isOpen,
  onClose,
  pizza,
}: DeletePizzaModalProps) => {
  const { mutate } = useSWRConfig()

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      await fetch(`/api/pizza/${pizza.id}`, {
        method: 'DELETE',
      })

      await mutate('/api/pizza')
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Pizza
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete {pizza.name}? This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
