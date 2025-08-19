# Tekton Challenge

This project is a React application built with Vite, showcasing several key features and modern development practices.

## Table of Contents

* [Project Overview](#project-overview)
* [Key Features](#key-features)
* [Relevant Technologies](#relevant-technologies)
* [Getting Started](#getting-started)
* [User Login](#user-login)

## Project Overview

This is a web application that interacts with a character list, likely from the Rick and Morty API, and provides a user profile view. The application includes a login screen and a dashboard with a character list that features infinite scrolling and filtering.

## Key Features

* **Authentication:** A simple login system with predefined user credentials.
  !(uploaded:image_8c5627.png-42f865ea-65ed-4728-9ee2-8285717e4bdb)

* **Infinite Scroll:** Efficiently loads character data as the user scrolls, improving performance.
  !(uploaded:image_8c592a.jpg-7cec5daf-cff8-4541-bfeb-da6714bbad5f)

* **Character Filtering:** Allows users to filter the character list by status, species, and gender.
  ![Image showing a filter dropdown with options for status, species, and gender](uploaded:image_8c594c.png-4263484a-fd14-4441-974f-ccdfc583370d)

* **User Profile:** A dedicated page to view user details.
  !(uploaded:image_8c596b.png-ed17ca3d-4682-4dd4-876f-15e68f29965d)

## Relevant Technologies

This project uses a modern web development stack. The most relevant libraries for its functionality are:

* **Vite:** A fast build tool that provides a rapid development environment.
* **React:** The core JavaScript library for building the user interface.
* **Zustand:** A small, fast, and scalable state-management solution. It's used to manage the application's global state, such as user authentication and data.
* **React Query (`@tanstack/react-query`):** A powerful library for fetching, caching, and updating asynchronous data in React. It's crucial for managing the state of your API calls efficiently.
* **React Virtual (`@tanstack/react-virtual`):** A headless utility for virtualizing large lists and tabular data. This library is key to the performance improvement you mentioned for the infinite scroll feature.
* **Tailwind CSS:** A utility-first CSS framework used for styling the application with a focus on rapid development and responsive design.
* **Axios:** A promise-based HTTP client for making API requests.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

You need to have Node.js and npm (or yarn) installed.

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
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev