## Collaborative presentations frontend

### Steps to run the project

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create .env file based on .env.template in the root directory and add the following variables, replacing the URL with the backend URL:
    ```
    VITE_API_BACKEND_URL=http://localhost:3001/api/v1
    VITE_SOCKET_URLhttp://localhost:3001
    ```
4. Run `npm run dev` to start the development server

Bakend respository can be found [here](https://github.com/gerashdo/collaborative-presentations-back)