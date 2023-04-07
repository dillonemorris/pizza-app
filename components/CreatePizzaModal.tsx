import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Dialog } from '@headlessui/react'
import { Modal } from './Modal'
import { Pizza } from './types'

type CreatePizzaModalProps = {
  isOpen: boolean
  onClose: () => void
  isEditing?: boolean
  initialPizza?: Pizza
}

export const CreatePizzaModal = ({
  isOpen,
  onClose,
  isEditing = false,
  initialPizza = {
    name: '',
    id: '',
    toppings: [],
  },
}: CreatePizzaModalProps) => {
  const pizza = {
    name: initialPizza?.name || '',
    toppings: initialPizza?.toppings || [],
    id: initialPizza?.id || '',
  }

  const { mutate } = useSWRConfig()
  const [name, setName] = useState(pizza.name)
  const [error, setError] = useState('')
  const { data, isLoading } = useSWR('/api/topping')
  const initToppingsMap = pizza.toppings.reduce(
    (acc, t) => ({ ...acc, [t]: true }),
    {}
  )
  const [toppingsMap, setToppingsMap] = useState(initToppingsMap)
  const toppings = Object.keys(toppingsMap).filter((t) => !!toppingsMap[t])

  const handleNewPizzaSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (!name) {
      setError('Input cannot be blank')
      return
    }

    try {
      const body = { name, toppings }
      const apiRoute = isEditing ? `/api/pizza/${pizza.id}` : '/api/pizza'

      const response = await fetch(apiRoute, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.status === 409) {
        throw new Error(`A pizza named "${name}" already exists.`)
      }

      await mutate(apiRoute)
      onClose()
    } catch (err) {
      setError(err.message)
      console.error(err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900"
        >
          Create new pizza
        </Dialog.Title>
      </div>
      <div className="my-8 flex-col">
        <label
          htmlFor="pizza"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Pizza name
        </label>
        <div className="mt-2 relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            placeholder="When the moon hits your eye..."
            value={name}
            name="pizza"
            id="pizza"
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

        {!isLoading && !!data ? (
          <fieldset className="mt-8 mb-12">
            <legend className="text-base font-semibold leading-6 text-gray-900">
              Toppings
            </legend>
            <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
              {data.toppings.map((topping) => (
                <div
                  key={topping.id}
                  className="relative flex items-start py-4"
                >
                  <div className="min-w-0 flex-1 text-sm leading-6">
                    <label
                      htmlFor={`topping-${topping.id}`}
                      className="select-none font-medium text-gray-900"
                    >
                      {topping.name}
                    </label>
                  </div>
                  <div className="ml-3 flex h-6 items-center">
                    <input
                      id={`topping-${topping.id}`}
                      defaultChecked={isEditing && !!toppingsMap[topping.name]}
                      name={topping.name}
                      type="checkbox"
                      onChange={(e) => {
                        setToppingsMap((toppings) => ({
                          ...toppings,
                          [e.target.name]: e.target.checked,
                        }))
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:col-start-2"
          onClick={handleNewPizzaSubmit}
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
