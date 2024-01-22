## Markdown improvements for your README:

**1. Headers:**

- Add a `### Technologies Used` section before the `Contributing` section.

**2. Lists:**

- Convert the `Usage` scripts into a bulleted list for better readability.
- Make the `Technologies Used` list a bulleted list under the `### Technologies Used` section.

**3. Code blocks:**

- Wrap the `npm` commands in backticks for proper code formatting.

**4. Links:**

- Use link syntax for the `TodoList Backend: https://github.com/garconbenjamin/todo-list-backend` reference.

**5. Emphasis:**

- Consider using bold or italics for important keywords or phrases.

**Here's the revised README with the suggested changes:**

# TodoList Frontend

## Overview

This TodoList frontend is a task management application built using React, Vite, Apollo Client, TypeScript, and Redux. It allows users to create, update, and delete tasks, as well as mark them as completed.

## Getting Started

Before running the app, ensure that you have set up and deployed the TodoList Backend: [https://github.com/garconbenjamin/todo-list-backend](https://github.com/garconbenjamin/todo-list-backend). Follow the instructions in the backend repository to deploy the localhost database and backend.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/garconbenjamin/todo-list-frontend.git
```

2. Navigate to the project directory:

```bash
cd todo-list-frontend
```

3. Install dependencies:

```bash
npm install
```

## Configuration

Make sure to configure the app to connect to your deployed backend. Open the `src/apollo.ts` file and update the `uri` field with the appropriate URL:

## Usage

- Start the development server:

```bash
npm run dev
```

- Access the TodoList app in your browser at http://localhost:5173.

- Build the app for production:

```bash
npm run build
```

- Lint the code:

```bash
npm run lint
```

- Preview the production build:

```bash
npm run preview
```

- Compile GraphQL codegen:

```bash
npm run compile
```

- Watch for GraphQL codegen changes:

```bash
npm run watch
```

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Vite: A fast build tool that supports modern web development workflows.
- Apollo Client: A fully-featured caching GraphQL client for React.
- TypeScript: A superset of JavaScript that adds static typing.
- Redux: A predictable state container for JavaScript applications.

## Contributing

Feel free to contribute to the development of this TodoList app. Create a pull request with your changes, and we'll review it.

## License

This TodoList app is open-source and available under the MIT License.
