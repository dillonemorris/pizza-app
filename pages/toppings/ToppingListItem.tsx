import { useSWRConfig } from 'swr'
import { Modal } from '../../components'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const ToppingListItem = ({ topping }) => {
  return (
    <li key={topping.id} className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {topping.name}
          </p>
        </div>
        <EditButton topping={topping} />
        <DeleteButton topping={topping} />
      </div>
    </li>
  )
}

const DeleteButton = ({ topping }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
      >
        Delete
      </button>
      <DeleteToppingModal
        topping={topping}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

type DeleteToppingModalProps = {
  isOpen: boolean
  onClose: () => void
  topping: { name: string; id: string }
}

const DeleteToppingModal = ({
  isOpen,
  onClose,
  topping,
}: DeleteToppingModalProps) => {
  const { mutate } = useSWRConfig()

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      await fetch(`/api/topping/${topping.id}`, {
        method: 'DELETE',
      })

      await mutate('/api/topping')
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
            Delete Topping
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the {topping.name} topping? This
              action cannot be undone.
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

const EditButton = ({ topping }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Edit
      </button>
      <EditToppingModal
        topping={topping}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

type EditToppingModalProps = {
  isOpen: boolean
  onClose: () => void
  topping: { name: string; id: string }
}

const EditToppingModal = ({
  isOpen,
  onClose,
  topping,
}: EditToppingModalProps) => {
  const [error, setError] = useState('')
  const [name, setName] = useState(topping.name)
  const { mutate } = useSWRConfig()

  const handleEditToppingSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (!name) {
      setError('Input cannot be blank')
      return
    }

    try {
      const body = { name, id: topping.id }

      const response = await fetch(`/api/topping/${topping.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.status === 409) {
        throw new Error(`A topping named "${name}" already exists.`)
      }

      await mutate('/api/topping')
      onClose()
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Edit topping
          </Dialog.Title>
        </div>
        <div className="my-8 flex-col">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              value={name}
              name="topping"
              id="topping"
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 outline-none"
              onChange={(event) => {
                setError('')
                setName(event.target.value)
              }}
            />
          </div>
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={handleEditToppingSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
