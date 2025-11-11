# Dutch CRM - Customer Relationship Management

This project is a Customer Relationship Management (CRM) application built with Next.js, React, and Tailwind CSS. It is designed to manage customers, deals, bookings, and more.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm, pnpm, or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    ```
2.  Navigate to the project directory:
    ```sh
    cd trr-dutch-crm
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
    Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Database Setup

This application is designed to work with a MySQL database but comes with mock data for frontend development. To connect to your own database, follow these steps:

1.  **Create a `.env.local` file** in the root of your project.
2.  **Add your database credentials** to the file. This file will be ignored by Git to keep your credentials secure.
    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    DB_DATABASE=your_database_name
    DB_PORT=3306
    ```
3.  **Set up the database schema.** You can use the provided `schema.sql` file to create the necessary tables in your database.
4.  **Implement the backend API.** You will need to create API routes within the `app/api/` directory to connect to your database and handle data operations (CRUD). This part is not implemented by the AI assistant.

## How To Make It Live (Deployment)

The recommended way to deploy this Next.js application is with [Vercel](https://vercel.com).

### Vercel Deployment Steps

1.  **Push to a Git Repository:** Ensure your project is on GitHub, GitLab, or Bitbucket.
2.  **Import to Vercel:** Create a new project on Vercel and import your repository. Vercel will automatically detect the Next.js framework.
3.  **Set up a Production Database:** Use a cloud database provider like PlanetScale, AWS RDS, or DigitalOcean to host your MySQL database.
4.  **Configure Environment Variables:** In your Vercel project settings, add the environment variables from your `.env.local` file. **Do not commit your `.env.local` file to Git.**
5.  **Deploy:** Vercel will build and deploy your application. Any new push to your connected branch (e.g., `main`) will trigger a new deployment automatically.
