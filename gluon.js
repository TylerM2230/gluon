const http = require("http");

function gluon() {
  //http server created using node module
  const server = http.createServer((req, res) => {
    /*
    Map that contains list of routes
    Key: pathString
    Value: array of Route objects (contains HTTP method type and handler) that indicate content for given URL
   */
    const routes = new Map();

    //check if request url is valid
    if (req.url === undefined) {
      throw new Error("URL invalid!");
    }

    //indicates ROUTE object array of given URL
    const pathRoutes = routes.get(req.url);

    //if there is no array of ROUTE objects
    if (!Array.isArray(pathRoutes)) {
      throw new Error("404");
    }

    //find the corresponding route from REQUEST in list of routes
    const route = pathRoutes.find(
      (pathRoute) => pathRoute.method === req.method.toLowerCase()
    );

    //when proper route is found
    if (route) {
      //pass
      route.handler(req, res);
    }
  });

  return {
    get(path, handler) {
      //get corresponding array to URL
      let pathRoutes = routes.get(path);

      //if no array, make empty one
      if (pathRoutes === undefined) {
        pathRoutes = [];
      }

      //Push Route object (HTTP method and handler) into array
      pathRoutes.push({
        method: "get",
        handler,
      });

      //add route to Map
      routes.set(path, pathRoutes);
    },
    listen(port, callback) {
      server.listen(port, callback);
    },
  };
}

module.exports = gluon;
