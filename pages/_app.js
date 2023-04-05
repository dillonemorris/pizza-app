import './globals.css'
import { SWRConfig } from 'swr'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

const Layout = ({ children }) => {
  return (
    <main className="max-w-sm mx-auto px-4 py-12">
      <Nav />
      {children}
    </main>
  )
}

const Nav = () => {
  return (
    <div className="relative flex h-16">
      <div className="flex flex-1">
        <div className="flex flex-shrink-0 items-center">
          <BuildingStorefrontIcon className="block h-8 w-auto fill-orange-500" />
        </div>
        <div className="ml-6 flex space-x-8">
          <ActiveLink href="/toppings">Toppings</ActiveLink>
          <ActiveLink href="/pizzas">Pizzas</ActiveLink>
        </div>
      </div>
    </div>
  )
}

const ActiveLink = ({ href, children }) => {
  const router = useRouter()
  const activeStyle = {
    borderColor: '#f97316',
    color: '#111827',
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      style={router.asPath === href ? activeStyle : null}
    >
      {children}
    </Link>
  )
}

export default MyApp
