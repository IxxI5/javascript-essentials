// index.js
// Http Fetch API

// Function to log Fetch responses to the console
// This function processes the response data and logs important details to the console
function logResponse(response) {
  // Convert the response to JSON and log various details
  return response.json().then((data) => {
    console.log("Response Data:", data); // Outputs the data received from the response
    console.log("HTTP Status:", response.status); // Outputs the HTTP status code of the response
    console.log("Response Headers:", [...response.headers.entries()]); // Outputs the headers of the response
    return data;
  });
}

// GET Request: Fetching a list of items with a limit and custom timeout
function getTodos() {
  // Note: Fetch does not support direct timeout settings, so we use an AbortController for this purpose
  const controller = new AbortController(); // Create an AbortController instance
  const { signal } = controller; // Extract the signal from the controller

  fetch("https://jsonplaceholder.typicode.com/todos?_limit=5", {
    method: "GET",
    signal, // Attach the signal to the fetch request for cancellation purposes
  })
    .then((response) => logResponse(response))
    .catch((error) => console.error("Error in GET request:", error));
}

// POST Request: Adding a new item with a custom timeout
function addTodo() {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Indicate that the request body contains JSON data
      Authorization: "Bearer sometoken", // Example authorization token
    },
    body: JSON.stringify({
      title: "New Todo",
      completed: false,
    }),
  })
    .then((response) => logResponse(response))
    .catch((error) => console.error("Error in POST request:", error));
}

// PUT Request: Updating an existing item
function updateTodo() {
  fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Indicate that the request body contains JSON data
    },
    body: JSON.stringify({
      title: "Updated Todo",
      completed: true,
    }),
  })
    .then((response) => logResponse(response))
    .catch((error) => console.error("Error in PUT request:", error));
}

// DELETE Request: Removing an item
function removeTodo() {
  fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "DELETE", // Specify DELETE method
  })
    .then((response) => logResponse(response))
    .catch((error) => console.error("Error in DELETE request:", error));
}

// Simultaneous data requests: Fetching multiple resources
function getData() {
  // Perform multiple fetch requests and handle them concurrently
  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then((res) =>
      res.json()
    ), // Fetch todos with a limit of 10
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10").then((res) =>
      res.json()
    ), // Fetch posts with a limit of 10
  ])
    .then(([todos, posts]) => {
      console.log("Todos Data:", todos); // Log todos data
      console.log("Posts Data:", posts); // Log posts data
    })
    .catch((error) => console.error("Error in simultaneous requests:", error));
}

// Handling custom headers in requests
function customHeaders() {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer customToken", // Custom authorization token
    },
    body: JSON.stringify({
      title: "New Todo with Headers",
      completed: false,
    }),
  })
    .then((response) => logResponse(response))
    .catch((error) =>
      console.error("Error in POST request with custom headers:", error)
    );
}

// Transforming response data
function transformResponse() {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "Hello World" }),
  })
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => {
      // Transform the response data
      data.title = data.title.toUpperCase(); // Convert the title to uppercase
      console.log("Transformed Data:", data); // Log the transformed data
    })
    .catch((error) => console.error("Error in transforming response:", error));
}

// Error handling
function errorHandling() {
  fetch("https://jsonplaceholder.typicode.com/todoss") // Intentional typo in the URL to trigger an error
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is not OK
        throw new Error(`HTTP error! status: ${response.status}`); // Throw an error with the status code
      }
      return response.json(); // Parse JSON response if status is OK
    })
    .then((data) => console.log("Data:", data))
    .catch((error) => {
      console.error("Error:", error.message); // Log the error message
      if (error.message.includes("404")) {
        // Check if the error is a 404 error
        alert("Error: Page Not Found"); // Display an alert for 404 errors
      }
    });
}

// Canceling requests: Using AbortController
function cancelRequest() {
  const controller = new AbortController(); // Create an AbortController instance
  const { signal } = controller; // Extract the signal from the controller

  fetch("https://jsonplaceholder.typicode.com/todos", { signal })
    .then((response) => logResponse(response))
    .catch((error) => {
      if (error.name === "AbortError") {
        // Check if the error is due to request cancellation
        console.log("Request was canceled"); // Log cancellation message
      } else {
        console.error("Error in request cancellation:", error); // Log other errors
      }
    });

  // Cancel the request after 1 second
  setTimeout(() => {
    controller.abort(); // Abort the fetch request
  }, 1000);
}

// Example of using fetch with custom settings
function fetchWithSettings() {
  fetch("https://jsonplaceholder.typicode.com/comments?_limit=7", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => logResponse(response))
    .catch((error) => console.error("Error in fetch with settings:", error));
}

// Example function calls to demonstrate each type of request
getTodos(); // Perform GET request with a limit of 5
addTodo(); // Perform POST request to add a new todo
updateTodo(); // Perform PUT request to update an existing todo
removeTodo(); // Perform DELETE request to remove a todo
getData(); // Fetch multiple data types with limits
customHeaders(); // POST request with custom headers
transformResponse(); // Transform response data and log it
errorHandling(); // Handle errors and log specific messages
cancelRequest(); // Demonstrate request cancellation
fetchWithSettings(); // Fetch with custom settings and log results

/** Output:
 *  Todos Data: [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false
    },
    { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    {
        userId: 1,
        id: 5,
        title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false
    },
    {
        userId: 1,
        id: 6,
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false
    },
    {
        userId: 1,
        id: 7,
        title: 'illo expedita consequatur quia in',
        completed: false
    },
    {
        userId: 1,
        id: 8,
        title: 'quo adipisci enim quam ut ab',
        completed: true
    },
    {
        userId: 1,
        id: 9,
        title: 'molestiae perspiciatis ipsa',
        completed: false
    },
    {
        userId: 1,
        id: 10,
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true
    }
    ]
    Posts Data: [
    {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto'
    },
    {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\n' +
        'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
        'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
        'qui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\n' +
        'voluptatem occaecati omnis eligendi aut ad\n' +
        'voluptatem doloribus vel accusantium quis pariatur\n' +
        'molestiae porro eius odio et labore et velit aut'
    },
    {
        userId: 1,
        id: 4,
        title: 'eum et est occaecati',
        body: 'ullam et saepe reiciendis voluptatem adipisci\n' +
        'sit amet autem assumenda provident rerum culpa\n' +
        'quis hic commodi nesciunt rem tenetur doloremque ipsam iure\n' +
        'quis sunt voluptatem rerum illo velit'
    },
    {
        userId: 1,
        id: 5,
        title: 'nesciunt quas odio',
        body: 'repudiandae veniam quaerat sunt sed\n' +
        'alias aut fugiat sit autem sed est\n' +
        'voluptatem omnis possimus esse voluptatibus quis\n' +
        'est aut tenetur dolor neque'
    },
    {
        userId: 1,
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        body: 'ut aspernatur corporis harum nihil quis provident sequi\n' +
        'mollitia nobis aliquid molestiae\n' +
        'perspiciatis et ea nemo ab reprehenderit accusantium quas\n' +
        'voluptate dolores velit et doloremque molestiae'
    },
    {
        userId: 1,
        id: 7,
        title: 'magnam facilis autem',
        body: 'dolore placeat quibusdam ea quo vitae\n' +
        'magni quis enim qui quis quo nemo aut saepe\n' +
        'quidem repellat excepturi ut quia\n' +
        'sunt ut sequi eos ea sed quas'
    },
    {
        userId: 1,
        id: 8,
        title: 'dolorem dolore est ipsam',
        body: 'dignissimos aperiam dolorem qui eum\n' +
        'facilis quibusdam animi sint suscipit qui sint possimus cum\n' +
        'quaerat magni maiores excepturi\n' +
        'ipsam ut commodi dolor voluptatum modi aut vitae'
    },
    {
        userId: 1,
        id: 9,
        title: 'nesciunt iure omnis dolorem tempora et accusantium',
        body: 'consectetur animi nesciunt iure dolore\n' +
        'enim quia ad\n' +
        'veniam autem ut quam aut nobis\n' +
        'et est aut quod aut provident voluptas autem voluptas'
    },
    {
        userId: 1,
        id: 10,
        title: 'optio molestias id quia eum',
        body: 'quo et expedita modi cum officia vel magni\n' +
        'doloribus qui repudiandae\n' +
        'vero nisi sit\n' +
        'quos veniam quod sed accusamus veritatis error'
    }
    ]
    Response Data: [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false
    },
    { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    {
        userId: 1,
        id: 5,
        title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false
    },
    {
        userId: 1,
        id: 6,
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false
    },
    {
        userId: 1,
        id: 7,
        title: 'illo expedita consequatur quia in',
        completed: false
    },
    {
        userId: 1,
        id: 8,
        title: 'quo adipisci enim quam ut ab',
        completed: true
    },
    {
        userId: 1,
        id: 9,
        title: 'molestiae perspiciatis ipsa',
        completed: false
    },
    {
        userId: 1,
        id: 10,
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true
    },
    {
        userId: 1,
        id: 11,
        title: 'vero rerum temporibus dolor',
        completed: true
    },
    {
        userId: 1,
        id: 12,
        title: 'ipsa repellendus fugit nisi',
        completed: true
    },
    { userId: 1, id: 13, title: 'et doloremque nulla', completed: false },
    {
        userId: 1,
        id: 14,
        title: 'repellendus sunt dolores architecto voluptatum',
        completed: true
    },
    {
        userId: 1,
        id: 15,
        title: 'ab voluptatum amet voluptas',
        completed: true
    },
    {
        userId: 1,
        id: 16,
        title: 'accusamus eos facilis sint et aut voluptatem',
        completed: true
    },
    {
        userId: 1,
        id: 17,
        title: 'quo laboriosam deleniti aut qui',
        completed: true
    },
    {
        userId: 1,
        id: 18,
        title: 'dolorum est consequatur ea mollitia in culpa',
        completed: false
    },
    {
        userId: 1,
        id: 19,
        title: 'molestiae ipsa aut voluptatibus pariatur dolor nihil',
        completed: true
    },
    {
        userId: 1,
        id: 20,
        title: 'ullam nobis libero sapiente ad optio sint',
        completed: true
    },
    {
        userId: 2,
        id: 21,
        title: 'suscipit repellat esse quibusdam voluptatem incidunt',
        completed: false
    },
    {
        userId: 2,
        id: 22,
        title: 'distinctio vitae autem nihil ut molestias quo',
        completed: true
    },
    {
        userId: 2,
        id: 23,
        title: 'et itaque necessitatibus maxime molestiae qui quas velit',
        completed: false
    },
    {
        userId: 2,
        id: 24,
        title: 'adipisci non ad dicta qui amet quaerat doloribus ea',
        completed: false
    },
    {
        userId: 2,
        id: 25,
        title: 'voluptas quo tenetur perspiciatis explicabo natus',
        completed: true
    },
    { userId: 2, id: 26, title: 'aliquam aut quasi', completed: true },
    {
        userId: 2,
        id: 27,
        title: 'veritatis pariatur delectus',
        completed: true
    },
    {
        userId: 2,
        id: 28,
        title: 'nesciunt totam sit blanditiis sit',
        completed: false
    },
    { userId: 2, id: 29, title: 'laborum aut in quam', completed: false },
    {
        userId: 2,
        id: 30,
        title: 'nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis',
        completed: true
    },
    {
        userId: 2,
        id: 31,
        title: 'repudiandae totam in est sint facere fuga',
        completed: false
    },
    {
        userId: 2,
        id: 32,
        title: 'earum doloribus ea doloremque quis',
        completed: false
    },
    { userId: 2, id: 33, title: 'sint sit aut vero', completed: false },
    {
        userId: 2,
        id: 34,
        title: 'porro aut necessitatibus eaque distinctio',
        completed: false
    },
    {
        userId: 2,
        id: 35,
        title: 'repellendus veritatis molestias dicta incidunt',
        completed: true
    },
    {
        userId: 2,
        id: 36,
        title: 'excepturi deleniti adipisci voluptatem et neque optio illum ad',
        completed: true
    },
    { userId: 2, id: 37, title: 'sunt cum tempora', completed: false },
    { userId: 2, id: 38, title: 'totam quia non', completed: false },
    {
        userId: 2,
        id: 39,
        title: 'doloremque quibusdam asperiores libero corrupti illum qui omnis',
        completed: false
    },
    {
        userId: 2,
        id: 40,
        title: 'totam atque quo nesciunt',
        completed: true
    },
    {
        userId: 3,
        id: 41,
        title: 'aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit',
        completed: false
    },
    {
        userId: 3,
        id: 42,
        title: 'rerum perferendis error quia ut eveniet',
        completed: false
    },
    {
        userId: 3,
        id: 43,
        title: 'tempore ut sint quis recusandae',
        completed: true
    },
    {
        userId: 3,
        id: 44,
        title: 'cum debitis quis accusamus doloremque ipsa natus sapiente omnis',
        completed: true
    },
    {
        userId: 3,
        id: 45,
        title: 'velit soluta adipisci molestias reiciendis harum',
        completed: false
    },
    {
        userId: 3,
        id: 46,
        title: 'vel voluptatem repellat nihil placeat corporis',
        completed: false
    },
    {
        userId: 3,
        id: 47,
        title: 'nam qui rerum fugiat accusamus',
        completed: false
    },
    {
        userId: 3,
        id: 48,
        title: 'sit reprehenderit omnis quia',
        completed: false
    },
    {
        userId: 3,
        id: 49,
        title: 'ut necessitatibus aut maiores debitis officia blanditiis velit et',
        completed: false
    },
    {
        userId: 3,
        id: 50,
        title: 'cupiditate necessitatibus ullam aut quis dolor voluptate',
        completed: true
    },
    {
        userId: 3,
        id: 51,
        title: 'distinctio exercitationem ab doloribus',
        completed: false
    },
    {
        userId: 3,
        id: 52,
        title: 'nesciunt dolorum quis recusandae ad pariatur ratione',
        completed: false
    },
    {
        userId: 3,
        id: 53,
        title: 'qui labore est occaecati recusandae aliquid quam',
        completed: false
    },
    {
        userId: 3,
        id: 54,
        title: 'quis et est ut voluptate quam dolor',
        completed: true
    },
    {
        userId: 3,
        id: 55,
        title: 'voluptatum omnis minima qui occaecati provident nulla voluptatem ratione',
        completed: true
    },
    {
        userId: 3,
        id: 56,
        title: 'deleniti ea temporibus enim',
        completed: true
    },
    {
        userId: 3,
        id: 57,
        title: 'pariatur et magnam ea doloribus similique voluptatem rerum quia',
        completed: false
    },
    {
        userId: 3,
        id: 58,
        title: 'est dicta totam qui explicabo doloribus qui dignissimos',
        completed: false
    },
    {
        userId: 3,
        id: 59,
        title: 'perspiciatis velit id laborum placeat iusto et aliquam odio',
        completed: false
    },
    {
        userId: 3,
        id: 60,
        title: 'et sequi qui architecto ut adipisci',
        completed: true
    },
    {
        userId: 4,
        id: 61,
        title: 'odit optio omnis qui sunt',
        completed: true
    },
    {
        userId: 4,
        id: 62,
        title: 'et placeat et tempore aspernatur sint numquam',
        completed: false
    },
    {
        userId: 4,
        id: 63,
        title: 'doloremque aut dolores quidem fuga qui nulla',
        completed: true
    },
    {
        userId: 4,
        id: 64,
        title: 'voluptas consequatur qui ut quia magnam nemo esse',
        completed: false
    },
    {
        userId: 4,
        id: 65,
        title: 'fugiat pariatur ratione ut asperiores necessitatibus magni',
        completed: false
    },
    {
        userId: 4,
        id: 66,
        title: 'rerum eum molestias autem voluptatum sit optio',
        completed: false
    },
    {
        userId: 4,
        id: 67,
        title: 'quia voluptatibus voluptatem quos similique maiores repellat',
        completed: false
    },
    {
        userId: 4,
        id: 68,
        title: 'aut id perspiciatis voluptatem iusto',
        completed: false
    },
    {
        userId: 4,
        id: 69,
        title: 'doloribus sint dolorum ab adipisci itaque dignissimos aliquam suscipit',
        completed: false
    },
    {
        userId: 4,
        id: 70,
        title: 'ut sequi accusantium et mollitia delectus sunt',
        completed: false
    },
    {
        userId: 4,
        id: 71,
        title: 'aut velit saepe ullam',
        completed: false
    },
    {
        userId: 4,
        id: 72,
        title: 'praesentium facilis facere quis harum voluptatibus voluptatem eum',
        completed: false
    },
    {
        userId: 4,
        id: 73,
        title: 'sint amet quia totam corporis qui exercitationem commodi',
        completed: true
    },
    {
        userId: 4,
        id: 74,
        title: 'expedita tempore nobis eveniet laborum maiores',
        completed: false
    },
    {
        userId: 4,
        id: 75,
        title: 'occaecati adipisci est possimus totam',
        completed: false
    },
    { userId: 4, id: 76, title: 'sequi dolorem sed', completed: true },
    {
        userId: 4,
        id: 77,
        title: 'maiores aut nesciunt delectus exercitationem vel assumenda eligendi at',
        completed: false
    },
    {
        userId: 4,
        id: 78,
        title: 'reiciendis est magnam amet nemo iste recusandae impedit quaerat',
        completed: false
    },
    { userId: 4, id: 79, title: 'eum ipsa maxime ut', completed: true },
    {
        userId: 4,
        id: 80,
        title: 'tempore molestias dolores rerum sequi voluptates ipsum consequatur',
        completed: true
    },
    { userId: 5, id: 81, title: 'suscipit qui totam', completed: true },
    {
        userId: 5,
        id: 82,
        title: 'voluptates eum voluptas et dicta',
        completed: false
    },
    {
        userId: 5,
        id: 83,
        title: 'quidem at rerum quis ex aut sit quam',
        completed: true
    },
    {
        userId: 5,
        id: 84,
        title: 'sunt veritatis ut voluptate',
        completed: false
    },
    { userId: 5, id: 85, title: 'et quia ad iste a', completed: true },
    {
        userId: 5,
        id: 86,
        title: 'incidunt ut saepe autem',
        completed: true
    },
    {
        userId: 5,
        id: 87,
        title: 'laudantium quae eligendi consequatur quia et vero autem',
        completed: true
    },
    {
        userId: 5,
        id: 88,
        title: 'vitae aut excepturi laboriosam sint aliquam et et accusantium',
        completed: false
    },
    { userId: 5, id: 89, title: 'sequi ut omnis et', completed: true },
    {
        userId: 5,
        id: 90,
        title: 'molestiae nisi accusantium tenetur dolorem et',
        completed: true
    },
    {
        userId: 5,
        id: 91,
        title: 'nulla quis consequatur saepe qui id expedita',
        completed: true
    },
    { userId: 5, id: 92, title: 'in omnis laboriosam', completed: true },
    {
        userId: 5,
        id: 93,
        title: 'odio iure consequatur molestiae quibusdam necessitatibus quia sint',
        completed: true
    },
    {
        userId: 5,
        id: 94,
        title: 'facilis modi saepe mollitia',
        completed: false
    },
    {
        userId: 5,
        id: 95,
        title: 'vel nihil et molestiae iusto assumenda nemo quo ut',
        completed: true
    },
    {
        userId: 5,
        id: 96,
        title: 'nobis suscipit ducimus enim asperiores voluptas',
        completed: false
    },
    {
        userId: 5,
        id: 97,
        title: 'dolorum laboriosam eos qui iure aliquam',
        completed: false
    },
    {
        userId: 5,
        id: 98,
        title: 'debitis accusantium ut quo facilis nihil quis sapiente necessitatibus',
        completed: true
    },
    {
        userId: 5,
        id: 99,
        title: 'neque voluptates ratione',
        completed: false
    },
    {
        userId: 5,
        id: 100,
        title: 'excepturi a et neque qui expedita vel voluptate',
        completed: false
    },
    ... 100 more items
    ]
    HTTP Status: 200
    Response Headers: [
    [ 'access-control-allow-credentials', 'true' ],
    [ 'age', '18221' ],
    [ 'alt-svc', 'h3=":443"; ma=86400' ],
    [ 'cache-control', 'max-age=43200' ],
    [ 'cf-cache-status', 'HIT' ],
    [ 'cf-ray', '8beeed33af55d2bf-FRA' ],
    [ 'connection', 'keep-alive' ],
    [ 'content-encoding', 'gzip' ],
    [ 'content-type', 'application/json; charset=utf-8' ],
    [ 'date', 'Fri, 06 Sep 2024 13:50:10 GMT' ],
    [ 'etag', 'W/"5ef7-4Ad6/n39KWY9q6Ykm/ULNQ2F5IM"' ],
    [ 'expires', '-1' ],
    [
        'nel',
        '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}'
    ],
    [ 'pragma', 'no-cache' ],
    [
        'report-to',
        '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725400215&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=8cV0LIM9VqudqEBODzeWog%2F8v7YOPJOIouBNivwBQzQ%3D"}]}'
    ],
    [
        'reporting-endpoints',
        'heroku-nel=https://nel.heroku.com/reports?ts=1725400215&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=8cV0LIM9VqudqEBODzeWog%2F8v7YOPJOIouBNivwBQzQ%3D'
    ],
    [ 'server', 'cloudflare' ],
    [ 'transfer-encoding', 'chunked' ],
    [ 'vary', 'Origin, Accept-Encoding' ],
    [ 'via', '1.1 vegur' ],
    [ 'x-content-type-options', 'nosniff' ],
    [ 'x-powered-by', 'Express' ],
    [ 'x-ratelimit-limit', '1000' ],
    [ 'x-ratelimit-remaining', '999' ],
    [ 'x-ratelimit-reset', '1725400234' ]
    ]
    Transformed Data: { title: 'HELLO WORLD', id: 201 }
    Response Data: {}
    HTTP Status: 200
    Response Headers: [
    [ 'access-control-allow-credentials', 'true' ],
    [ 'alt-svc', 'h3=":443"; ma=86400' ],
    [ 'cache-control', 'no-cache' ],
    [ 'cf-cache-status', 'DYNAMIC' ],
    [ 'cf-ray', '8beeed3388324daf-FRA' ],
    [ 'connection', 'keep-alive' ],
    [ 'content-length', '2' ],
    [ 'content-type', 'application/json; charset=utf-8' ],
    [ 'date', 'Fri, 06 Sep 2024 13:50:10 GMT' ],
    [ 'etag', 'W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"' ],
    [ 'expires', '-1' ],
    [
        'nel',
        '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}'
    ],
    [ 'pragma', 'no-cache' ],
    [
        'report-to',
        '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D"}]}'
    ],
    [
        'reporting-endpoints',
        'heroku-nel=https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D'
    ],
    [ 'server', 'cloudflare' ],
    [ 'vary', 'Origin, Accept-Encoding' ],
    [ 'via', '1.1 vegur' ],
    [ 'x-content-type-options', 'nosniff' ],
    [ 'x-powered-by', 'Express' ],
    [ 'x-ratelimit-limit', '1000' ],
    [ 'x-ratelimit-remaining', '997' ],
    [ 'x-ratelimit-reset', '1725630612' ]
    ]
    Response Data: { title: 'Updated Todo', completed: true, id: 1 }
    HTTP Status: 200
    Response Headers: [
    [ 'access-control-allow-credentials', 'true' ],
    [ 'alt-svc', 'h3=":443"; ma=86400' ],
    [ 'cache-control', 'no-cache' ],
    [ 'cf-cache-status', 'DYNAMIC' ],
    [ 'cf-ray', '8beeed33abfe3a6d-FRA' ],
    [ 'connection', 'keep-alive' ],
    [ 'content-encoding', 'br' ],
    [ 'content-type', 'application/json; charset=utf-8' ],
    [ 'date', 'Fri, 06 Sep 2024 13:50:10 GMT' ],
    [ 'etag', 'W/"3d-kwkh1+f9esv+RdNMIjMU7LqQrO4"' ],
    [ 'expires', '-1' ],
    [
        'nel',
        '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}'
    ],
    [ 'pragma', 'no-cache' ],
    [
        'report-to',
        '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D"}]}'
    ],
    [
        'reporting-endpoints',
        'heroku-nel=https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D'
    ],
    [ 'server', 'cloudflare' ],
    [ 'transfer-encoding', 'chunked' ],
    [ 'vary', 'Origin, Accept-Encoding' ],
    [ 'via', '1.1 vegur' ],
    [ 'x-content-type-options', 'nosniff' ],
    [ 'x-powered-by', 'Express' ],
    [ 'x-ratelimit-limit', '1000' ],
    [ 'x-ratelimit-remaining', '998' ],
    [ 'x-ratelimit-reset', '1725630612' ]
    ]
    Response Data: [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false
    },
    { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    {
        userId: 1,
        id: 5,
        title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false
    }
    ]
    HTTP Status: 200
    Response Headers: [
    [ 'access-control-allow-credentials', 'true' ],
    [ 'access-control-expose-headers', 'X-Total-Count' ],
    [ 'alt-svc', 'h3=":443"; ma=86400' ],
    [ 'cache-control', 'max-age=43200' ],
    [ 'cf-cache-status', 'MISS' ],
    [ 'cf-ray', '8beeed338d89d365-FRA' ],
    [ 'connection', 'keep-alive' ],
    [ 'content-encoding', 'br' ],
    [ 'content-type', 'application/json; charset=utf-8' ],
    [ 'date', 'Fri, 06 Sep 2024 13:50:10 GMT' ],
    [ 'etag', 'W/"222-Jlf0URYqNjT6OVRKt6wScS3N4iQ"' ],
    [ 'expires', '-1' ],
    [
        'nel',
        '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}'
    ],
    [ 'pragma', 'no-cache' ],
    [
        'report-to',
        '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D"}]}'
    ],
    [
        'reporting-endpoints',
        'heroku-nel=https://nel.heroku.com/reports?ts=1725630610&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=fBxrxilmrr77S3UjBEGQk3%2FiF47pWWSekXlqjV0GPwU%3D'
    ],
    [ 'server', 'cloudflare' ],
    [ 'transfer-encoding', 'chunked' ],
    [ 'vary', 'Origin, Accept-Encoding' ],
    [ 'via', '1.1 vegur' ],
    [ 'x-content-type-options', 'nosniff' ],
    [ 'x-powered-by', 'Express' ],
    [ 'x-ratelimit-limit', '1000' ],
    [ 'x-ratelimit-remaining', '996' ],
    [ 'x-ratelimit-reset', '1725630612' ],
    [ 'x-total-count', '200' ]
    ]
    Error: HTTP error! status: 404
 */
