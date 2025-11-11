# 📘 Link Shortner

This project is a smart URL shortening service designed to simplify long links while providing valuable insights. Each shortened link not only redirects users to the intended destination but also collects metadata about the visitor — such as device type, location, browser, and time of access. This enables detailed analytics and user behavior tracking for marketing, research, or security purposes. The system is lightweight, fast, and easy to integrate into existing platforms. It supports custom aliases, expiration settings, and real-time statistics. Ideal for businesses, content creators, and developers who want more than just a short link.

## ✨ Features

- Shortening links to **base58** format.
- Geolocation getting by external API.
- **External geolocation api provider:** [geo.ipify.org](https://geo.ipify.org) (authenticated with `API_GEOLOCATION_KEY`).
- User preferences management (stored in Supabase/Postgres).
- JWT Cookie authorization **Token**. Token is valid for 24 hours.

## 🚀 Tech Stack

- Node.js (LTS)
- Express.js
- Redux.js/toolkit
- Zod Validation
- React Hook Form
- TypeScript
- Supabase (application data storage)
- **geo.ipify.org** (geolocation api provider)

## 📂 Endpoints

### Users

**GET /users/me** - returns user's data.

### Links

**GET /links** - returns one page of links. Query params:

- page - number of current page.
- limit - number of elements capacity in page. Basic size = 5.
- searchQuery - search string (search by title).

**GET /links/:shortLinkId** - returns link data by shortLinkId

**GET /links/:shortLinkId/audience** - returns one page of users visits. Query params:

- page - number of current page.
- limit - number of elements capacity in page. Basic size = 15.

**POST /links** - endpoint to create link.
Body example:

```js
{
	"title": "Cool title",
	"url": "https://excalidraw.com/"
}
```

**POST /links/:shortLinkId** (not implemented) - endpoint to edit your links by shortLinkId.
Body example:

```js
{
	"title": "Cool title"
}
```

**DELETE /links/:shortLinkId** - endpoint to delete your links by shortLinkId

### Authentication

**POST /auth/login** - path to log in.

**POST /auth/register** - path to sign up.

**POST /auth/password** - password to change password.

**POST /auth/logout** - path to log out.

## 🗄️ Data Structures (Supabase)

Data views like ts type. Comments views show db structure.

### Visitor

```js
{
  id: string; // UUID PRIMARY KEY DEFAULT RANDOM
  shortLinkId: string; // VARCHAR(10) NOT NULL
  ip: string; //VARCHAR(45) NOT NULL
  region: string; // VARCHAR(255) NOT NULL
  browser: string; // VARCHAR(255) NOT NULL
  os: string; // VARCHAR(255) NOT NULL
  followedAt: string; // TIMESTAMP DEFAULT NOW NOT NULL
}
```

### Link

```js
{
  id: string; // UUID PRIMARY KEY DEFAULT RANDOM
  title: string; // UUID NOT NULL
  shortLinkId: string; // VARCHAR(10) UNIQUE NOT NULL
  url: string; // VARCHAR(255) NOT NULL
  createdAt: string; // TIMESTAMP DEFAULT NOW NOT NULL
}
```

### User

```js
{
  id: string; // UUID PRIMARY KEY DEFAULT RANDOM
  email: string; // VARCHAR(255) UNIQUE NOT NULL
  hashedPassword: string; // VARCHAR(255) NOT NULL
  createdAt: string; // TIMESTAMP DEFAULT NOW NOT NULL
  updatedAt: string; // TIMESTAMP DEFAULT NOW NOT NULL
}
```

## ⚙️ Setup & Run

### 1. Clone the repo

```bash
git clone https://gitlab.12devs.com/training/internship/2025-interns/gnunko/link-shortner
cd link-shortner
```

### 2. Install dependencies

```bash
npm install
```

For production also:

```bash
npm -g i serve
```

### 3. Create .env files

See examples below for: `.env`. Environment files must be in frontend and backend folders.

### 4. Start the app

```bash
npm run dev
```

For production:

```bash

npm run build
npm run start:prod
```

## 🔑 Environment Variables

Create the following files at the project root.

### Backend `.env`

```env
# Server options

APP_PORT="<app_port>"
APP_HOST="<app_host>"

# Client options

CLIENT_PORT="<app_port>"
CLIENT_HOST="<app_host>"

# Database must be here to use it in npx prisma generate

DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>"

# Your geolocation api key

API_GEOLOCATION_KEY="<Your geolocation api key>"

JWT_SECRET="<your jwt secret key>"
JWT_COOKIE_NAME="<your jwt cookie name>"
JWT_EXPIRES_IN="86400000" # 24h

# Cookie settings

COOKIE_HTTP_ONLY="true"
COOKIE_SECURE="false" # true recommended if production
COOKIE_SAME_SITE="lax" # strict recommended if production
COOKIE_MAX_AGE="86400000" # 24h
COOKIE_PATH="/"
```

### Frontend `.env`

```env
# Server options

REACT_APP_SERVER_PORT="<server_port>"
REACT_APP_SERVER_HOST="<server_host>"
```
