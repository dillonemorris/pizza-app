## Deployed app
https://pizza-app-sooty-beta.vercel.app/

### Testing the requirements
1. The link above should redirect you to the `/toppings` route. There should be some toppings pre-populated, feel free to delete or edit these.
1. Create a new topping, it should populate in the list.
1. At the `/pizzas` route, you should find a pre-popuated pizza or 2. Again, feel free to edit or delete these.
1. Upon clicking the Create new pizza button, the create pizza modal should appear. Here, you'll see the list of toppings that were created on the toppings page. 
1. Choose a name for your pizza and select the toppings you'd like it to include. Once you save, you should see your new pizza appear in the list.
1. When you edit a pizza, it's toppings should be pre-selected. Change the name and/or toppings and save your changes.

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
