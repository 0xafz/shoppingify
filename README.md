# Shoppingify App

Shopping list management with purchase stats.

## How to run this program?

### Cloud/DevContainers (**Recommended**)
[![Edit af4oz/shoppingify/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/af4oz/shoppingify/main?embed=1)

### Local Setup
#### Requirements
1. Node.js v16.15.0 or higher for Next.js v13. (Prisma need Node.js v14.17.0 or higher)
2. For **styled-jsx**: Install VScode [ extension ](https://github.com/vercel/styled-jsx#syntax-highlighting-visual-studio-code-extension)
3. Add relevant `.env` variables using `.env.example` template
4. **Database**: This project uses `mysql` db(see [prisma schema](./prisma/schema.prisma)). Follow mysql [ docs ](https://dev.mysql.com/doc/refman/8.0/en/installing.html) to install. If you want to switch database, check [Prisma Provider switch docs](https://pris.ly/d/migrate-provider-switch).

```sh
# Install dependencies
yarn install

# Add environment variables (check env.example)

# Run Prisma setup (prisma migrate)
yarn p:mig dev

# Build App
yarn build

# Start development server
yarn dev
````

## TODO

- [x] Add E2E testing
- [x] Upgrade to Next.js v13
- [x] Upgrade to Prisma v4
- [ ] handle token expiry
- [ ] handle tab synchronisation
- [ ] show confirm access for sensitive info change
- [ ] add product home page
- [ ] make app more interactive
- [ ] provide functionality to pick/fork from existing lists

## Tech stack

- [cookie](https://www.npmjs.com/package/cookie)
- jsonwebtoken
- jest for testing
- material-ui
- Next.js (batteries(bundling, router, image optimizations etc) included)
- Prisma ORM
- planetscale(mysql) free iter
- recharts
- styled-jsx (for css)
- Typescript
- ts-node (run ts files)
- zustand (state management , first time user)


## Credits

1. [open source](https://gist.github.com/af4oz/d5cfdef2d1b7767e8df321f9fd56f79b)
2. Thanks to [@thunghiemdinh](https://twitter.com/thunghiemdinh) for design and checkout [devchallenges](https://devchallenges.io/).
