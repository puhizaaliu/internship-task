This is a REST API for managing users and cars, built with Node.js, Express.js, MongoDB and JWT authentication. 

Make sure you have the following installed: 
-Node.js (v14 or later)
-MongoDB (locally)
-Postman (or any API testing tool)

After you clone the repository, you install the dependencies: 
-npm install
The .env file in the project root should have the following:
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/carRental
    JWT_SECRET=mySuperSecretKey123!
After that, you can start the server using: 
-npm start
The API will be running at: 
-http://localhost:5000


I used Postman for testing the API endpoints, which are:
1.User Routes: 
POST http://localhost:5000/api/users/register - register a new user
POST http://localhost:5000/api/users/login - log in: authenticate user and get a token
GET http://localhost:5000/api/users/get - get all users(requires authentication)
GET http://localhost:5000/api/users/:id - gets a user by Id (requires authentication)
PUT http://localhost:5000/api/users/:id - update a user by Id (requires authentication)
DELETE http://localhost:5000/api/users/:id - delete a user by Id (requires authentication)
GET http://localhost:5000/api/users/my-profile - get logged-in user's profile (name, email, username) (requires authentication)


2.Car Routes: (they don't require authentication)
POST http://localhost:5000/api/cars - create a new car
GET http://localhost:5000/api/cars/get - get all cars
GET http://localhost:5000/api/cars/:id - gets a car by Id
PUT http://localhost:5000/api/cars/:id - update a car by Id 
DELETE http://localhost:5000/api/cars/:id - delete a car by Id
POST http://localhost:5000/api/cars/rental-cars-1 - get cars sorted from lowest to highest price. Filtering is done using a JSON body (year, color, steering type, number of seats).
GET http://localhost:5000/api/cars/rental-cars-2 - get cars sorted from lowest to highest price. Filtering is done using query parameters (e.g., ?year=2022&color=red&steeringType=automatic&seats=4).


Testing the API:
1.Ensure MongoDB is running locally before testing
2.Register a user via /api/users/register
3.Log in via /api/users/login to receive a JWT token
4.Use the token for authenticated requests by adding it in the headers: Authorization: Bearer (your-token)
5.Perform CRUD operations on users and cars
