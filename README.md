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
  !(https://placehold.co/1000x500/000000/FFFFFF?text=Login%20Page)

* **Infinite Scroll:** Efficiently loads character data as the user scrolls, improving performance.
  !(https://placehold.co/1000x500/000000/FFFFFF?text=Character%20List)

* **Character Filtering:** Allows users to filter the character list by status, species, and gender.
  ![Image showing a filter dropdown with options for status, species, and gender](https://placehold.co/1000x500/000000/FFFFFF?text=Filter%20Options)

* **User Profile:** A dedicated page to view user details.
  !(https://placehold.co/1000x500/000000/FFFFFF?text=User%20Profile)

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

1. Clone the repository:
   ```bash
   git clone <your-repo-url>