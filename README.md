# RecipeMaster Web

[![Deployed on Azure](https://img.shields.io/badge/azure-deployed-blue)](https://recipemasterdevui-azdjewfuh4h0h2e4.australiacentral-01.azurewebsites.net/)

🚀 **Live Demo**  
Skip setup and try RecipeMaster in your browser:  
👉 [Click here to launch the app](https://recipemasterdevui-azdjewfuh4h0h2e4.australiacentral-01.azurewebsites.net/)

This is the frontend client for **RecipeMaster** — a meal planning app built with React, MUI, GraphQL, and Apollo Client.

---

## ✨ Features

- Calendar-based meal planner (using FullCalendar)
- Create, update, and delete meal events

## 🧱 Tech Stack

- React + TypeScript
- Apollo Client (GraphQL)
- Material UI
- FullCalendar
- Vite
- React Hook Form

## ⚙️ Environment Setup

### Prerequisites

- Node.js (v18+ recommended)
- Vite (`npm install` will handle it)

### Environment Variable Setup

Create a `.env` file and add the following:

```
VITE_API_URL=http://localhost:8080
```

## 💻 Run Locally

```
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## 🌐 Deployment

This repo is deployed to Azure App Service via GitHub Actions using the dev_recipemasterdevui.yml workflow.

```
on:
  push:
    branches:
      - dev
```

## 🔗 Related Projects

👉 [RecipeMaster API (Backend)](https://github.com/XuSibo99/RecipeMasterServices)
Spring Boot + GraphQL server powering the RecipeMaster app.
