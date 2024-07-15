## How to Run the Application Locally

#### 1. Clone the Repository

Open your terminal and clone the repository using Git:

```bash
git clone <repository-url>
cd <repository-name>
```

#### 2. Install Dependencies

Make sure you have Node.js installed on your system. It's recommended to use the version specified in your project (Node.js v18.18.0 and npm v10.6.0).

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a .env file in the root directory of your project and add the necessary environment variables. Here's an example of what your .env file might look like:

```js
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database-name
```

#### 4. Build the Application (If Needed)

If your project is written in TypeScript or uses any build tools, you may need to build the project before running it. For TypeScript:

```bash
npm run build
```

Ensure your package.json has the appropriate build script defined:

```json
"scripts": {
  "build": "tsc"
}
```

#### 5. Run the Application

Start the application using the following command:

```bash
npm start
```

Make sure your package.json includes the start script:

```json
"scripts": {
  "start": "node dist/index.js"
}
```

#### 6. Access the Application

Open your browser and go to `http://localhost:3000` (or the port number you specified in your .env file) to access the application.
