# WinkWares Ecommerce

WinkWares is an elegant, scalable e-commerce platform built using modern technologies. The project demonstrates a seamless integration of a customizable CMS, authentication system, and payment methods.

## Features

- **Framework**: [Next.js 15](https://nextjs.org/)
- **CMS**: [Sanity](https://www.sanity.io/) for content management and SSR/SSG capabilities
- **Authentication**: [Clerk](https://clerk.dev/) for secure user authentication
- **Payment**: [Stripe](https://stripe.com/) for handling payments
- **Responsive Design**: Fully responsive, optimized for all devices

![Project Screenshot](./public/images/WinkWares.png)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Sanity CLI](https://www.sanity.io/docs/cli) for managing CMS
- A Stripe account for payment integration
- A Clerk account for authentication

### Installation

Clone the repository:

```bash
git clone https://github.com/m00nLeo/WinkWaresEcommerce.git
cd WinkWaresEcommerce
```

Install dependencies using npm:

```bash
npm install
```

Or with Yarn:

```bash
yarn install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### CMS Setup

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```
   Or with Yarn:
   ```bash
   yarn global add @sanity/cli
   ```
2. Navigate to the `sanity` directory:
   ```bash
   cd sanity
   ```
3. Deploy the Sanity studio:
   ```bash
   sanity start
   ```

### Building for Production

Build the project for production:

```bash
npm run build
```

Or with Yarn:

```bash
yarn build
```

Start the production server:

```bash
npm run start
```

Or with Yarn:

```bash
yarn start
```

---

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

### Steps:

1. Push your code to a GitHub repository.
2. Connect the repository to your Vercel account.
3. Set up the necessary environment variables in the Vercel dashboard.

---

## License

This project is licensed under the [MIT License](LICENSE).
