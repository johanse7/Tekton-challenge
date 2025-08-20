# Tekton Challenge

This project is a React application built with Vite, showcasing several key features and modern development practices.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Relevant Technologies](#relevant-technologies)
- [Getting Started](#getting-started)
- [User Login](#user-login)

## 🚀 Features

- 🔐 **Authentication** with fake users (see credentials below)
- ⚡ **Infinite scroll with virtualization** using [TanStack Virtual](https://tanstack.com/virtual/latest)
- ⭐ **Favorites system** persisted with [Zustand](https://github.com/pmndrs/zustand)
- 🎨 **Responsive UI** powered by [Tailwind CSS](https://tailwindcss.com/)
- 📂 **Data fetching & caching** with [TanStack React Query](https://tanstack.com/query/latest)
- 🧪 **Unit & integration tests** with Vitest + React Testing Library
- 🗂️ **Feature-based folder structure** for scalability

## Project Overview

This is a web application that interacts with a character list, likely from the Rick and Morty API, and provides a user profile view. The application includes a login screen and a dashboard with a character list that features infinite scrolling and filtering.

## Key Features

- **Authentication:** A simple login system with predefined user credentials.
  <img width="1014" height="550" alt="image" src="https://github.com/user-attachments/assets/3fd7b5de-a500-445c-86c9-3fb69fd56db3" />

- **Infinite Scroll:** Efficiently loads character data as the user scrolls, improving performance.
  <img width="1854" height="924" alt="image" src="https://github.com/user-attachments/assets/2c7d50c6-cb9b-42c1-b577-83546994a574" />

- **Character Filtering:** Allows users to filter the character list by status, species, and gender.
  <img width="1854" height="924" alt="image" src="https://github.com/user-attachments/assets/1980b34c-8876-4d5c-aa01-72d50614fbfd" />

- **User Profile:** A dedicated page to view user details.
  <img width="1854" height="924" alt="image" src="https://github.com/user-attachments/assets/1e410ed9-3593-4606-af0c-ec044949d2fe" />

## Relevant Technologies

This project uses a modern web development stack. The most relevant libraries for its functionality are:

- **Vite:** A fast build tool that provides a rapid development environment.
- **React:** The core JavaScript library for building the user interface.
- **Zustand:** A small, fast, and scalable state-management solution. It's used to manage the application's global state, such as user authentication and data.
- **React Query (`@tanstack/react-query`):** A powerful library for fetching, caching, and updating asynchronous data in React. It's crucial for managing the state of your API calls efficiently.
- **React Virtual (`@tanstack/react-virtual`):** A headless utility for virtualizing large lists and tabular data. This library is key to the performance improvement you mentioned for the infinite scroll feature.
- **Tailwind CSS:** A utility-first CSS framework used for styling the application with a focus on rapid development and responsive design.
- **Axios:** A promise-based HTTP client for making API requests.
- **Playwright:** An end-to-end testing framework for web applications. It allows you to automate browsers and write reliable UI tests to ensure your app works correctly

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

You need to have Node.js and npm (or yarn) installed.

- Node.js v22+
- pnpm (10.14.0) or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd tekton-challenge
    ```
3.  Install the dependencies:
    ```bash
    pnpm  install
    ```
4.  Run dev:
    ```bash
    pnpm  run dev
    ```
5.  Run unit tests:

    ```bash
    pnpm run test

    ```

6.  Run e2e tests:
    ```bash
    pnpm run test:e2e
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev

## Live Demo 🌐

You can view the live demo at: [Live Demo 🌐](https://tekton-challenge.vercel.app/auth)



👤 Test Users

Use the following credentials to log in:

Rick Sanchez
Email: rick@rick.com
Password: rick

Morty Smith
Email: morty@morty.com
Password: morty
```
