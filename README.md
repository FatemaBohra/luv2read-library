# Luv2Read — Library Management System

A full-stack library management application built with React, Spring Boot, MySQL, Stripe, and Auth0.

**Live Demo:** [luv2read-library.vercel.app](https://luv2read-library.vercel.app)

> **Test credentials:**
> - Login with any email via Auth0
> - Test card: `4242 4242 4242 4242` · Expiry: `12/27` · CVC: `123`
> - To test late fees: insert a row into the `payment` table with your email and an amount

---

## Tech Stack

### Frontend
- React 19 + TypeScript
- React Router v5 — client-side routing
- Auth0 React SDK — authentication
- Stripe React Elements — payment UI
- Bootstrap — styling
- Deployed on Vercel

### Backend
- Java 21 + Spring Boot 4
- Spring Data JPA + Spring Data REST
- Spring Security + OAuth2 Resource Server — JWT validation
- MySQL (TiDB Serverless in production)
- Stripe Java SDK — payment processing
- Deployed on Render via Docker

### Infrastructure
- TiDB Serverless — hosted MySQL-compatible database
- Auth0 — authentication and authorization
- Stripe — payment processing (late fee collection)
- Docker — containerized backend deployment

---

## Features

### User Features
- Browse and search books by title and category
- View book details, ratings, and reviews
- Checkout and return books
- View current loans and borrowing history
- Leave star ratings and written reviews
- Ask the librarian questions via messaging
- Pay late fees via Stripe

### Admin Features
- Add new books to the library
- Adjust book quantities
- Respond to patron messages
- Manage library inventory

### Technical Features
- JWT authentication via Auth0
- Role-based access control (admin / user)
- Secure API endpoints via Spring Security
- CORS configured for cross-origin requests
- Spring Data REST for automatic repository exposure
- HikariCP connection pooling configured for TiDB

---

## Architecture

```
User's Browser
      |
      v
Vercel (React Frontend)
      |
      | HTTPS API calls
      v
Render (Spring Boot Backend — Docker)
      |
      |-- TiDB Serverless (MySQL)   <- stores books, users, loans, reviews
      |-- Auth0                     <- validates JWT tokens
      |-- Stripe                    <- processes late fee payments
```

---

## Project Structure

```
luv2read-library/
|-- 02-backend/spring-boot-library/     Spring Boot API
|   |-- src/main/java/com/luv2code/
|   |   |-- config/                     CORS, Security, Data REST config
|   |   |-- controller/                 REST endpoints
|   |   |-- dao/                        JPA repositories
|   |   |-- entity/                     Book, Review, Checkout, Message, Payment
|   |   |-- requestmodels/              Request DTOs
|   |   |-- responsemodels/             Response DTOs
|   |   |-- service/                    Business logic
|   |   |-- utils/                      Helper utilities
|   |-- src/main/resources/
|   |   |-- application.properties      Local config
|   |   |-- application-prod.properties Production config
|   |-- Dockerfile                      Docker deployment
|-- 03-frontend/react-library/          React app
|   |-- src/
|   |   |-- Auth/                       Auth0 callback handling
|   |   |-- images/                     Static assets
|   |   |-- layouts/                    Page components
|   |   |   |-- BookCheckoutPage/       Book detail and checkout
|   |   |   |-- HomePage/               Landing page
|   |   |   |-- ManageLibraryPage/      Admin panel
|   |   |   |-- MessagesPage/           Patron messaging
|   |   |   |-- NavbarAndFooter/        Navigation
|   |   |   |-- PaymentPage/            Stripe fee payment
|   |   |   |-- SearchBooksPage/        Book search and browse
|   |   |   |-- ShelfPage/              User loans and history
|   |   |-- lib/                        Auth0 config
|   |   |-- models/                     TypeScript interfaces
|   |   |-- App.tsx                     Routes
|-- database/
|   |-- seed-scripts/                   SQL scripts for initial data
```

---

## API Endpoints

### Books (Spring Data REST — auto-generated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books (paginated) |
| GET | `/api/books/{id}` | Get single book |
| GET | `/api/books/search/findByTitleContaining` | Search by title |
| GET | `/api/books/search/findByCategory` | Filter by category |

### Secure Endpoints (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books/secure/currentloans` | Get current loans |
| GET | `/api/books/secure/currentloans/count` | Get loan count |
| GET | `/api/books/secure/ischeckedout/byuser` | Check if book is checked out |
| PUT | `/api/books/secure/checkout` | Checkout a book |
| PUT | `/api/books/secure/return` | Return a book |
| PUT | `/api/books/secure/renew/loan` | Renew a loan |
| POST | `/api/reviews/secure` | Submit a review |
| GET | `/api/reviews/secure/user/book` | Check if user reviewed book |
| GET | `/api/messages/search/findByUserEmail` | Get user messages |
| POST | `/api/messages/secure/add/message` | Send message to librarian |
| GET | `/api/payment/search/findByUserEmail` | Get payment info |
| POST | `/api/payment/secure/payment-intent` | Create Stripe payment intent |
| PUT | `/api/payment/secure/payment-complete` | Complete payment |
| GET | `/api/histories/search/findBooksByUserEmail` | Get borrowing history |

### Admin Endpoints (Admin role required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/secure/add/book` | Add a new book |
| PUT | `/api/admin/secure/increase/book/quantity` | Increase book quantity |
| PUT | `/api/admin/secure/decrease/book/quantity` | Decrease book quantity |
| DELETE | `/api/admin/secure/delete/book` | Delete a book |
| GET | `/api/messages/search/findByClosed` | Get open messages |
| PUT | `/api/admin/secure/messages/close` | Close/answer a message |

---

## Database Schema

### Tables
| Table | Description |
|-------|-------------|
| `book` | Book catalog with title, author, category, quantity |
| `checkout` | Active book loans per user |
| `history` | Completed loan history |
| `review` | User ratings and written reviews |
| `messages` | Patron questions and librarian responses |
| `payment` | Outstanding late fee amounts per user |

---

## Local Development Setup

### Prerequisites
- Java 21
- Node.js 18+
- MySQL 8+
- Maven

### 1. Clone the repo
```bash
git clone https://github.com/FatemaBohra/luv2read-library.git
cd luv2read-library
```

### 2. Set up local MySQL database
```bash
mysql -u root

CREATE DATABASE reactlibrarydatabase;
exit;

mysql -u root reactlibrarydatabase < database/seed-scripts/React-Springboot-Add-Tables-Script-1.sql
mysql -u root reactlibrarydatabase < database/seed-scripts/React-SpringBoot-Add-Books-Script-2.sql
mysql -u root reactlibrarydatabase < database/seed-scripts/React-SpringBoot-Add-Books-Script-3.sql
mysql -u root reactlibrarydatabase < database/seed-scripts/React-SpringBoot-Add-Books-Script-4.sql
mysql -u root reactlibrarydatabase < database/seed-scripts/React-SpringBoot-Add-Books-Script-5.sql
```

### 3. Set environment variable
```bash
export STRIPE_SECRET_KEY=sk_test_your-stripe-key
```

### 4. Start Spring Boot
```bash
cd 02-backend/spring-boot-library
./mvnw spring-boot:run
```

Backend runs on `https://localhost:8443` (self-signed certificate for local HTTPS).

### 5. Set up frontend environment
The `03-frontend/react-library/.env` file should contain:
```
SSL_CRT_FILE=ssl-localhost/localhost.crt
SSL_KEY_FILE=ssl-localhost/localhost.key
REACT_APP_API=https://localhost:8443/api
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=https://luv2read-api
```

### 6. Start React
```bash
cd 03-frontend/react-library
npm install
HTTPS=true npm start
```

Open `https://localhost:3000`

---

## Deployment

### Backend (Render)
- Runtime: Docker
- Root Directory: `02-backend/spring-boot-library`
- Build: auto via Dockerfile
- Environment variables required:
  - `DB_URL` — TiDB JDBC connection string
  - `DB_USERNAME` — TiDB username
  - `DB_PASSWORD` — TiDB password
  - `AUTH0_ISSUER_URI` — Auth0 issuer URL
  - `AUTH0_AUDIENCE` — Auth0 API audience
  - `STRIPE_SECRET_KEY` — Stripe secret key
  - `SPRING_PROFILES_ACTIVE=prod`

### Frontend (Vercel)
- Framework: Create React App
- Root Directory: `03-frontend/react-library`
- Output Directory: `build`
- Environment variables required:
  - `REACT_APP_API` — backend API URL
  - `REACT_APP_AUTH0_DOMAIN` — Auth0 domain
  - `REACT_APP_AUTH0_CLIENT_ID` — Auth0 client ID
  - `REACT_APP_AUTH0_AUDIENCE` — Auth0 audience
  - `DISABLE_ESLINT_PLUGIN=true`

---

## Testing Late Fee Payment

To test the Stripe payment flow without waiting 7 days for a book to become overdue, insert a test fee directly into the database:

```sql
INSERT INTO payment (user_email, amount) VALUES ('your-email@example.com', 3.99);
```

Then visit the Payment page — you will see the outstanding fee and can pay using the Stripe test card `4242 4242 4242 4242`.

---

## Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0002` | Payment declined |

Use any future expiry date and any 3-digit CVC.

---

## Note on Free Tier

The backend runs on Render's free tier and the database on TiDB Serverless free tier. UptimeRobot is configured to ping the backend every 5 minutes to prevent both services from sleeping. First load after extended inactivity may still take up to 30 seconds.

---

## Author

Fatema Bohra
- GitHub: [@FatemaBohra](https://github.com/FatemaBohra)
