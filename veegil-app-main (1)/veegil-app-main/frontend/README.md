# React Frontend

## Setup
1. Provide environment variables in `.env.development`:

    ```bash
    # copy the example/defaults
    cp .env.example .env.development
    ```

    You can change the values in the `.env.development` file to match your environment. The default MONGO_URI targets a typical locally running MongoDB server instance (`127.0.0.1:27017`).

2. Install the project dependencies:

    ```bash
    npm install
    ```

## Running the app
Development mode (with hot-reload):

```bash
npm run dev
```

After running the app, you can access it at http://localhost:8118

