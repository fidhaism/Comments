// Importing json-server package
const JSONserver = require('json-server');

// Creating a server using the create() method from json-server
const Commentserver = JSONserver.create();

// Generating path/route to server resources
const router = JSONserver.router("db.json");

// Initializing json-server middleware
const middleware = JSONserver.defaults();

// Creating a PORT number for the server
const PORT = 3001 || process.env.PORT;

// Implementing route to resource to server
Commentserver.use(middleware);

// Implementing middleware to server
Commentserver.use(router);

// Run command for server
Commentserver.listen(PORT, () => {
    console.log(`Comment Server is running at: ${PORT}`);
});

// The script above sets up a server using the JSON server package. It imports the package,
// creates a server, generates a path to server resources, initializes the json-server
// middleware, sets up a PORT number, and implements a route to the server resources.
// The server then runs and listens to the specified PORT, which is either 3001 or the
// value set in the environment variable. The console logs the server's running status,
// with the PORT number.