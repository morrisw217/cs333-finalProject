create a .env file in the root of the backend directory with this structure:

""""

JWT_SECRET=<your_secret_key>

PORT: 3001
NODE_ENV: development
DB_CONNECT: mongodb://localhost:27017/racingDB

"""

On your local Mongo instance, create a new database named 'racingDB'. 

run the following commands:

'npm init'

'npm install'

'node index.js'