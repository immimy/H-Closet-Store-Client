# H. Closet Store

H. Closet Store is a completed full-stack fashion storefront built to explore the complete e-commerce journey: browsing and filtering products, managing a cart, placing an order, paying securely, and reviewing purchases.

The project pairs a React client with an Express and MongoDB API. Its most distinctive workflow is a recoverable Stripe checkout that accounts for customers closing or leaving the payment page.

## Highlights

- Product browsing with filters, sorting, best-seller collections, and offset-based pagination.
- JWT authentication with role-based authorization and protected account routes.
- Cart, checkout, order history, and product review workflows.
- Stripe Payment Element integration for card payments.
- Cash-on-delivery and gift-service options.
- Responsive light and dark themes.
- Demo-user behavior for safely exploring the application.

## Resilient checkout flow

Creating a card-payment order reserves inventory and creates a Stripe Payment Intent. If the customer accidentally reloads or closes the checkout page, the pending order can be reopened for up to 24 hours.

The application handles the less-visible failure paths as well:

- Navigating away intentionally can cancel the Payment Intent and mark the order as failed.
- MongoDB expires abandoned pending orders through a TTL index.
- A MongoDB change stream detects an expired pending order, cancels its Stripe Payment Intent, and restores the reserved inventory.
- Successfully completed payments update the order before the customer reaches the completion screen.

This workflow keeps payment state, order state, and stock changes aligned even when checkout does not follow the happy path.

## Technical decisions

### Server state and client state

TanStack Query manages API data and cache invalidation, while Redux Toolkit owns client concerns such as the cart, current user, theme, and stored scroll position. Keeping these responsibilities separate avoids duplicating server data in the global store.

### Pagination

Products, orders, and reviews use page/limit queries backed by MongoDB `skip()` and `limit()`. The API returns pagination metadata so the React client can keep filters and page state in the URL.

### Client/server development

Vite proxies `/api` requests to the local Express server. This keeps browser requests same-origin during development without coupling the production client to a hard-coded API host.

### API protection

The Express API uses JWT authentication, permission checks, rate limiting, Helmet, input sanitization, and centralized error handling. Passwords are hashed with bcrypt.

## Stack

**Frontend**

- React 18 and React Router
- Vite
- TanStack Query
- Redux Toolkit and React Redux
- Tailwind CSS and DaisyUI
- Axios
- Stripe React SDK

**Backend**

- Node.js and Express
- MongoDB and Mongoose
- JSON Web Tokens and bcrypt
- Stripe
- Nodemailer

## Project structure

```text
client/
  src/
    components/    Reusable store and form UI
    features/      Redux Toolkit slices
    pages/         Route-level screens and data loaders
    utilities/     API client, formatting, cart, and countdown helpers
server/
  controllers/     Request handlers and business workflows
  middleware/      Authentication, authorization, and errors
  models/          Mongoose schemas
  routes/          Express routers
  utilities/       Payment, inventory, email, JWT, and validation helpers
```

## Run locally

The client and server run as separate processes.

```bash
cd server
npm install
npm start
```

```bash
cd client
npm install
npm run dev
```

The server requires local environment configuration for MongoDB, JWT secrets, Stripe, and email delivery. Do not commit real credentials.
