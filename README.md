# Web Builder

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### How SubDomain Work

If user try to access subdomain like `www.subdoamin.example.com` website rewrite it to `www.example.com/subdomain/`.We create dynamite rotuing for this `/[domain]/[path]`.
