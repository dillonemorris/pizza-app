import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'

export default function Home(props) {
  console.log(props)
  return (
    <div>
      <Head>
        <title>Pizza App</title>
        <meta name="description" content="Strongmind Fullstack exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
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
