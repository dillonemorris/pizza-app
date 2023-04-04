import Head from 'next/head'
import prisma from '../../lib/prisma'
import { GetStaticProps } from 'next'

export default function Pizzas({ pizzas }) {
  return (
    <div>
      <Head>
        <title>Hello Chef!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {pizzas.map((pizzas) => (
            <div>
              <h2 className="text-3xl font-bold underline">{pizzas.name}</h2>
              <ul>
                {pizzas.toppings.map((topping) => (
                  <li>{topping}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
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
