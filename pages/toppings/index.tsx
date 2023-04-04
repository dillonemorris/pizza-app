import Head from 'next/head'
import prisma from '../../lib/prisma'
import { GetStaticProps } from 'next'

export default function Toppings({ toppings }) {
  return (
    <div>
      <Head>
        <title>Hi Owner!</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {toppings.map((topping) => (
            <li>{topping.name}</li>
          ))}
        </ul>
      </main>
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
