**Project Overview**

This project is a React-based application built with TypeScript and Vite. It was created as an assignment for an interview and demonstrates a basic setup for a React application with TypeScript, Vite, and ESLint.

**Project Structure**

The project is organized into the following directories:

-   `src`: This directory contains the source code for the application.
    -   `components`: This directory contains reusable React components.
    -   `features`: This directory contains feature-specific code, such as API calls and data processing.
    -   `pages`: This directory contains page-level components.
    -   `routes`: This directory contains route configurations for the application.
    -   `store`: This directory contains state management code using Zustand.
    -   `types`: This directory contains type definitions for the application.
    -   `utils`: This directory contains utility functions.
-   `public`: This directory contains static assets, such as images and fonts.
-   `node_modules`: This directory contains dependencies installed by pnpm.

**Setup**

To set up the project, follow these steps:

1. Clone the repository: `git clone https://github.com/mehdad-hussain/itbee-assignment-two`
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm dev`

**Build**

To build the project, run the following command:

-   `pnpm build`

This will create a production-ready build of the application in the `dist` directory.

**Get Data from `package.json`**

To get data from `package.json`, you can use the following methods:

-   Using pnpm: `pnpm run get-data`
-   Using a script: `node scripts/get-data.js`

This will output the data from `package.json` to the console.

**Goal of the Project**

The goal of this project is to demonstrate a basic setup for a React application with TypeScript, Vite, and ESLint. It was created as an assignment for an interview and showcases the following features:

-   React components and routing
-   TypeScript type definitions and ESLint configuration
-   Vite setup and configuration
-   Basic state management using Zustand

**Tailwind CSS**

This project uses Tailwind CSS for styling. The Tailwind CSS configuration is located in the `tailwind.config.js` file. The project also uses the `src/index.css` file to include Tailwind CSS styles.

**Shadcn UI**

This project uses Shadcn UI for building UI components. The Shadcn UI configuration is located in the `components.json` file. The project also uses the Shadcn UI components in the `src/components` directory.

**Husky and Lint-Staged**

This project uses Husky to manage Git hooks and Lint-Staged to run ESLint and Prettier on staged files. This ensures that the code is formatted consistently and meets the project's coding standards.

**ESLint Configuration**

The project uses ESLint to enforce coding standards and catch errors. The ESLint configuration is located in the `.eslintrc.json` file.

**Prettier Configuration**

The project uses Prettier to format the code consistently. The Prettier configuration is located in the `.prettierrc.json` file.

**TypeScript Configuration**

The project uses TypeScript to add type safety to the code. The TypeScript configuration is located in the `tsconfig.json` file.
