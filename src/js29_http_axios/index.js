// index.js
// Http and Axios Library
// npm install axios

// Import Axios library
// For Node.js environments, you can use: const axios = require('axios');
// For browser environments using modules, use import: import axios from 'axios';

import axios from "axios";

// Set default headers globally (not needed for JSONPlaceholder, but useful for other APIs)
// axios.defaults.headers.common['X-Auth-Token'] = 'your-auth-token-here';

// Importing Axios library
// For Node.js, use: const axios = require('axios');
// For browser environments with module bundlers, use: import axios from 'axios';

// Function to log Axios responses to the console
function logResponse(res) {
  console.log("Response Data:", res.data); // Outputs the data received from the response
  console.log("HTTP Status:", res.status); // Outputs the HTTP status code of the response
  console.log("Response Headers:", res.headers); // Outputs the headers of the response
}

// GET Request: Fetching a limited number of items with a 3 seconds timeout
function fetchItems() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      params: { _limit: 10 }, // Fetching 10 items
      timeout: 3000, // 3 seconds timeout
    })
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) => console.error("Error in GET request:", error)); // Log errors if they occur
}

// POST Request: Adding a new item with a 5 seconds timeout
function addItem() {
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Task", // Data to be sent in the POST request
        completed: false,
      },
      {
        timeout: 5000, // 5 seconds timeout
      }
    )
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) => console.error("Error in POST request:", error)); // Log errors if they occur
}

// PUT Request: Updating an existing item with a 7 seconds timeout
function updateItem() {
  axios
    .put(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        title: "Updated Task", // Updated data to be sent
        completed: true,
      },
      {
        timeout: 7000, // 7 seconds timeout
      }
    )
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) => console.error("Error in PUT request:", error)); // Log errors if they occur
}

// DELETE Request: Removing an item with a 2 seconds timeout
function deleteItem() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1", {
      timeout: 2000, // 2 seconds timeout
    })
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) => console.error("Error in DELETE request:", error)); // Log errors if they occur
}

// Making simultaneous requests to fetch a different number of items and posts
function fetchMultipleData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: { _limit: 15 },
      }), // Fetch 15 todos
      axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: { _limit: 8 },
      }), // Fetch 8 posts
    ])
    .then(
      axios.spread((todosResponse, postsResponse) => {
        console.log("Todos Data:");
        logResponse(todosResponse); // Log todos data
        console.log("Posts Data:");
        logResponse(postsResponse); // Log posts data
      })
    )
    .catch((error) => console.error("Error in simultaneous requests:", error)); // Log errors if they occur
}

// POST Request with Custom Headers and a 4 seconds timeout
function postWithCustomHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
      Authorization: "Bearer customToken", // Example authorization token
    },
    timeout: 4000, // 4 seconds timeout
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Task with Headers",
        completed: false,
      },
      config // Include custom headers and timeout in the request
    )
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) =>
      console.error("Error in POST request with custom headers:", error)
    ); // Log errors if they occur
}

// Transforming the response data with a custom transformation
function transformResponseData() {
  const options = {
    method: "post", // HTTP method
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Transform This Text",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      // Transform response data by converting the title to uppercase
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options)
    .then((response) => logResponse(response)) // Log the transformed response data
    .catch((error) => console.error("Error in transforming response:", error)); // Log errors if they occur
}

// Error handling with Axios for a 404 error
function handleErrors() {
  axios
    .get("https://jsonplaceholder.typicode.com/nonexistent", {
      timeout: 5000, // 5 seconds timeout for error handling
    })
    .then((response) => logResponse(response)) // Log response if successful (unlikely)
    .catch((error) => {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.log("Error Response Data:", error.response.data); // Log response data
        console.log("Error Status Code:", error.response.status); // Log status code
        console.log("Error Headers:", error.response.headers); // Log response headers

        if (error.response.status === 404) {
          console.error("Error: Resource Not Found"); // Specific error handling for 404
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error Request:", error.request); // Log request details
      } else {
        // Other errors
        console.error("Error Message:", error.message); // Log error message
      }
    });
}

// Canceling a request using a Cancel Token
function cancelRequest() {
  const cancelTokenSource = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: cancelTokenSource.token, // Attach cancel token to request
      timeout: 3000, // 3 seconds timeout
    })
    .then((response) => logResponse(response)) // Log response data on success
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request was canceled:", thrown.message); // Log cancellation message
      } else {
        console.error("Error in cancel request:", thrown); // Log other errors
      }
    });

  // Simulate a cancellation
  setTimeout(() => {
    cancelTokenSource.cancel("Request was canceled manually.");
  }, 1500); // Cancel after 1.5 seconds
}

// Request and Response Interceptors
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request made to ${
        config.url
      } at ${new Date().toLocaleTimeString()}`
    );
    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Example of using Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 10 seconds timeout for all requests made with this instance
});

function useAxiosInstance() {
  axiosInstance
    .get("/comments", { params: { _limit: 7 } }) // Fetching 7 comments
    .then((response) => logResponse(response)) // Log the response data on success
    .catch((error) => console.error("Error in Axios instance request:", error)); // Log errors if they occur
}

// Example function calls
fetchItems(); // Perform GET request with a limit of 10
addItem(); // Perform POST request
updateItem(); // Perform PUT request
deleteItem(); // Perform DELETE request
fetchMultipleData(); // Fetch multiple data types with different limits
postWithCustomHeaders(); // POST request with custom headers
transformResponseData(); // Transform response data
handleErrors(); // Handle errors with a 404 request
cancelRequest(); // Demonstrate request cancellation
useAxiosInstance(); // Example of using Axios instance

/** Output:
 *   },
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
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725601814&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=upNfcuGgu6HWH9ClJ6NxvtTbqHZasTZ20Q089eCLdfw%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725601814&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=upNfcuGgu6HWH9ClJ6NxvtTbqHZasTZ20Q089eCLdfw%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '999',
    'x-ratelimit-reset': '1725601872',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"5ef7-4Ad6/n39KWY9q6Ykm/ULNQ2F5IM"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '28238',
    server: 'cloudflare',
    'cf-ray': '8beedf92c9bb2c5a-FRA',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Error Response Data: {}
    Error Status Code: 404
    Error Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '2',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630009&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=ydSBhlTAQijZUCQ%2F9HiWVlGrBKUdr%2FkngooQuri77Bg%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630009&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=ydSBhlTAQijZUCQ%2F9HiWVlGrBKUdr%2FkngooQuri77Bg%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '993',
    'x-ratelimit-reset': '1725630012',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '42',
    server: 'cloudflare',
    'cf-ray': '8beedf931ea006d6-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Error: Resource Not Found
    Response Data: {}
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '2',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '999',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"2-vyGp6PvFo4RvsFtPoIWeCReyIC8"',
    via: '1.1 vegur',
    'cf-cache-status': 'DYNAMIC',
    server: 'cloudflare',
    'cf-ray': '8beedf92c87a1913-FRA',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Response Data: { title: 'New Task with Headers', completed: false, id: 201 }
    HTTP Status: 201
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '73',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '998',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, X-HTTP-Method-Override, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    expires: '-1',
    'access-control-expose-headers': 'Location',
    location: 'https://jsonplaceholder.typicode.com/todos/201',
    'x-content-type-options': 'nosniff',
    etag: 'W/"49-QplY2DawifaQsGLaWde8nCpba+0"',
    via: '1.1 vegur',
    'cf-cache-status': 'DYNAMIC',
    server: 'cloudflare',
    'cf-ray': '8beedf92d8a98f36-FRA',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Response Data: [
    {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\n' +
        'tempora quo necessitatibus\n' +
        'dolor quam autem quasi\n' +
        'reiciendis et nam sapiente accusantium'
    },
    {
        postId: 1,
        id: 2,
        name: 'quo vero reiciendis velit similique earum',
        email: 'Jayne_Kuhic@sydney.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\n' +
        'et omnis occaecati quod ullam at\n' +
        'voluptatem error expedita pariatur\n' +
        'nihil sint nostrum voluptatem reiciendis et'
    },
    {
        postId: 1,
        id: 3,
        name: 'odio adipisci rerum aut animi',
        email: 'Nikita@garfield.biz',
        body: 'quia molestiae reprehenderit quasi aspernatur\n' +
        'aut expedita occaecati aliquam eveniet laudantium\n' +
        'omnis quibusdam delectus saepe quia accusamus maiores nam est\n' +
        'cum et ducimus et vero voluptates excepturi deleniti ratione'
    },
    {
        postId: 1,
        id: 4,
        name: 'alias odio sit',
        email: 'Lew@alysha.tv',
        body: 'non et atque\n' +
        'occaecati deserunt quas accusantium unde odit nobis qui voluptatem\n' +
        'quia voluptas consequuntur itaque dolor\n' +
        'et qui rerum deleniti ut occaecati'
    },
    {
        postId: 1,
        id: 5,
        name: 'vero eaque aliquid doloribus et culpa',
        email: 'Hayden@althea.biz',
        body: 'harum non quasi et ratione\n' +
        'tempore iure ex voluptates in ratione\n' +
        'harum architecto fugit inventore cupiditate\n' +
        'voluptates magni quo et'
    },
    {
        postId: 2,
        id: 6,
        name: 'et fugit eligendi deleniti quidem qui sint nihil autem',
        email: 'Presley.Mueller@myrl.com',
        body: 'doloribus at sed quis culpa deserunt consectetur qui praesentium\n' +
        'accusamus fugiat dicta\n' +
        'voluptatem rerum ut voluptate autem\n' +
        'voluptatem repellendus aspernatur dolorem in'
    },
    {
        postId: 2,
        id: 7,
        name: 'repellat consequatur praesentium vel minus molestias voluptatum',
        email: 'Dallas@ole.me',
        body: 'maiores sed dolores similique labore et inventore et\n' +
        'quasi temporibus esse sunt id et\n' +
        'eos voluptatem aliquam\n' +
        'aliquid ratione corporis molestiae mollitia quia et magnam dolor'
    }
    ]
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725629813&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=i%2F6wpY1jTfWDLL%2F%2F1HFzMU1zPDgvf%2FDwvXMd1g9TdR0%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725629813&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=i%2F6wpY1jTfWDLL%2F%2F1HFzMU1zPDgvf%2FDwvXMd1g9TdR0%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '991',
    'x-ratelimit-reset': '1725629832',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-total-count': '500',
    'access-control-expose-headers': 'X-Total-Count',
    'x-content-type-options': 'nosniff',
    etag: 'W/"889-JFRdWYsE/g57i9O/cOVdJngKH1Q"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '239',
    server: 'cloudflare',
    'cf-ray': '8beedf92ec3166d4-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
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
    }
    ]
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725363990&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=DsNxt%2Fl7ksqwgyF78JD6tSTDLgVESkggU%2Bax0quHJQw%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725363990&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=DsNxt%2Fl7ksqwgyF78JD6tSTDLgVESkggU%2Bax0quHJQw%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '999',
    'x-ratelimit-reset': '1725364047',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-total-count': '200',
    'access-control-expose-headers': 'X-Total-Count',
    'x-content-type-options': 'nosniff',
    etag: 'W/"461-kGB511QWUPgMk9fwYp1jJdjl9mk"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '43',
    server: 'cloudflare',
    'cf-ray': '8beedf930cd966b6-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Response Data: { title: 'New Task', completed: false, id: 201 }
    HTTP Status: 201
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '60',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '997',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, X-HTTP-Method-Override, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    expires: '-1',
    'access-control-expose-headers': 'Location',
    location: 'https://jsonplaceholder.typicode.com/todos/201',
    'x-content-type-options': 'nosniff',
    etag: 'W/"3c-uY/Y18e1ZxE2RwW70gvFG2aVr1c"',
    via: '1.1 vegur',
    'cf-cache-status': 'DYNAMIC',
    server: 'cloudflare',
    'cf-ray': '8beedf92cfc43604-FRA',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Todos Data:
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
    }
    ]
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '996',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-total-count': '200',
    'access-control-expose-headers': 'X-Total-Count',
    'x-content-type-options': 'nosniff',
    etag: 'W/"67f-kLfkBOcnDlRK8JZsv13n9srNJ54"',
    via: '1.1 vegur',
    'cf-cache-status': 'MISS',
    server: 'cloudflare',
    'cf-ray': '8beedf92cb029960-FRA',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Posts Data:
    Response Data: [
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
    }
    ]
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725629813&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=i%2F6wpY1jTfWDLL%2F%2F1HFzMU1zPDgvf%2FDwvXMd1g9TdR0%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725629813&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=i%2F6wpY1jTfWDLL%2F%2F1HFzMU1zPDgvf%2FDwvXMd1g9TdR0%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '990',
    'x-ratelimit-reset': '1725629832',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-total-count': '100',
    'access-control-expose-headers': 'X-Total-Count',
    'x-content-type-options': 'nosniff',
    etag: 'W/"8bb-LI7zxHDUF1vj01Aj5vigP54lBkA"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '239',
    server: 'cloudflare',
    'cf-ray': '8beedf92fb4966b4-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Response Data: { title: 'TRANSFORM THIS TEXT', id: 201 }
    HTTP Status: 201
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '49',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '994',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, X-HTTP-Method-Override, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    expires: '-1',
    'access-control-expose-headers': 'Location',
    location: 'https://jsonplaceholder.typicode.com/todos/201',
    'x-content-type-options': 'nosniff',
    etag: 'W/"31-dzO4TQBQ7Yk0OYHLOk8ITJq65As"',
    via: '1.1 vegur',
    'cf-cache-status': 'DYNAMIC',
    server: 'cloudflare',
    'cf-ray': '8beedf931f2165ff-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
    Response Data: { title: 'Updated Task', completed: true, id: 1 }
    HTTP Status: 200
    Response Headers: Object [AxiosHeaders] {
    date: 'Fri, 06 Sep 2024 13:40:52 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'keep-alive',
    'report-to': '{"group":"heroku-nel","max_age":3600,"endpoints":[{"url":"https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D"}]}',
    'reporting-endpoints': 'heroku-nel=https://nel.heroku.com/reports?ts=1725630052&sid=e11707d5-02a7-43ef-b45e-2cf4d2036f7d&s=88CKopZ2qmEbasJLV8BAkjmZxqtR5BBmaVBZZ6r6GF4%3D',
    nel: '{"report_to":"heroku-nel","max_age":3600,"success_fraction":0.005,"failure_fraction":0.05,"response_headers":["Via"]}',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '995',
    'x-ratelimit-reset': '1725630072',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    expires: '-1',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    expires: '-1',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    expires: '-1',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    expires: '-1',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"3d-yp83vB4HOBi55k8E9mGm65jeBbc"',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    expires: '-1',
    expires: '-1',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"3d-yp83vB4HOBi55k8E9mGm65jeBbc"',
    via: '1.1 vegur',
    'cf-cache-status': 'DYNAMIC',
    server: 'cloudflare',
    'cf-ray': '8beedf930d969ffa-AMS',
    'alt-svc': 'h3=":443"; ma=86400'
    }
 */
