# DynaMech

DynaMech is a small vehicle-assistance app. Customers can create an account, submit a repair request, view their requests, browse spare parts, and place orders.

## Run the project

You need Node.js and MongoDB running on your computer.

1. Copy the backend settings file and set your local values:

   ```powershell
   Copy-Item backend\.env.example backend\.env
   ```

   Open `backend\.env`. Set `MONGO_URI` to your MongoDB connection string and `JWT_SECRET` to a private value with at least 32 characters.
2. In a terminal, start the backend:

   ```powershell
   cd backend
   npm install
   npm start
   ```

3. In a second terminal, start the website:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

4. Open the local address printed by Vite. The frontend uses `http://localhost:5000` for the backend by default. To use another backend address, set `VITE_API_URL` in `frontend/.env`.

The spare-parts inventory is added to MongoDB automatically the first time the catalog is opened. Create a customer account from the website to submit service requests and place orders.

## Checks

Run these commands from their respective folders:

```powershell
# frontend
npm run lint
npm run build

# backend
npm test
```
