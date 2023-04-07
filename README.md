## Deployed app
https://pizza-app-sooty-beta.vercel.app/

## Running the app
To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the running app.

To run tests:
```bash
yarn test
```

## Tech stack

### Next.js
This app was built with [next.js](https://nextjs.org/), a React framework. I chose Next for this project because:
1. Easy to create routes. Notice that in the [pages directory](https://github.com/dillonemorris/pizza-app/tree/main/pages) there are `/toppings` and `/pizzas` sub-directories. These correspond to the actual routes in the app. Next auto-magically creates routes for each directory in `/pages` and the UI you see corresponds to the code at `pizzas/index.tsx` and `toppings/index.tsx`.
1. Full stack capabilities with [API routes](https://nextjs.org/docs/api-routes/introduction). Next is a fullstack JS framework. There is another sub-directory in `/pages` called [/api](https://github.com/dillonemorris/pizza-app/tree/main/pages/api). This is where all of the server (node.js) code resides. The pizza API is at [/api/pizza/index.ts](https://github.com/dillonemorris/pizza-app/blob/main/pages/api/pizza/index.ts) and topping API is at [/api/topping/index.ts](https://github.com/dillonemorris/pizza-app/blob/main/pages/api/topping/index.ts). `Next` allows you to hit these API routes at `/api/pizza` and `api/topping`. See example [here](https://github.com/dillonemorris/pizza-app/blob/main/pages/toppings/index.tsx#L42).

### Prisma / PostgreSQL DB
On the DB side, this app is built with [Prisma](https://www.prisma.io/). Prisma allows you to model data in a [schema.prisma](https://github.com/dillonemorris/pizza-app/blob/main/prisma/schema.prisma) file and then access it easily with something like:
```js
// get all toppings from db
const allToppings = await prisma.pizza.findMany()
```

Prisma works with many db's, this app is hooked into a PostgreSQL instance hosted at [supabase](https://supabase.com/), which is a Firebase alternative.
