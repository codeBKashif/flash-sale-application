# Flash Sale Application

A full-stack Flash Sale Application built with React, Node.js, PostgreSQL, and Redis (BullMQ).

---

## Prerequisites

1. PostgreSQL installed (locally or via Docker).
2. Redis installed locally OR run using Docker:
   docker run -p 6379:6379 redis
3. Node.js (>= 18) and npm (>= 9) installed.

---

## Installation

1. Clone the repository

   - git clone https://github.com/codeBKashif/flash-sale-application
   - cd flash-sale-application

2. Install dependencies:

   - `cd api`
   - `npm install`

   - `cd frontend`
   - `npm install`

---

## Running the Application

1. Start backend (API + workers):

   - `cd api`
   - Modify api/config/sale.json and set the sale start date, end date
   - `npm run dev` --> starts the Node server
   - Please run node server to PORT 3000, currently React app is set to PORT 3000, can be modified with dotenv package later
   - `node workers.js` --> starts BullMQ workers

2. Start frontend:
   - `cd frontend`
   - `npm start`

---

## Load Testing

1. Install Artillery globally:

   - `cd api`
   - `npm install -g artillery`

2. Run load test using the provided config file:

   - `artillery run loadTest.yml`

   (Ensure your API server is running before executing the test.)

---

## Test cases

1. Run unit and e2e test cases by running following
   - `npx jest test`

## Notes

- Ensure PostgreSQL and Redis are running before starting the API.
- The BullMQ workers must be running to process background jobs (e.g., order creation).
