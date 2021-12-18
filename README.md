# Mini Free Library - Backend

This is the backend repository.

Check out the frontend repository [here](https://github.com/serenalin121/mini-free-library-front-end).

See the project in action [here](https://mini-free-library-frontend.herokuapp.com/).

## Project Description
Have you seen those mini-libraries in your community? People put a box or crate of books in their front yard. Neighbors browse and return later. For this app, I created a system to help library owners to manage books in their libraries. The book information was pull from the Open Library API (https://openlibrary.org/developers/api). Also, this system can assist people who want to borrow a book to track the library inventory before they visit. I used Mapbox map (https://www.mapbox.com/) to display the library locations. 

Both admin and user can create an account by providing email and password information. Or they can choose third party Google log in.


## Technology Used and Approaches
- The website is a MERN stack project. (MongoDB, Express, React, Node)
- This app is mobile friendly.
- The backend contains 4 different modele: admin, user, book and library. Both admin model and user model storing a user's login information. Bcrypt is used to maintain security for user passwords.
- Mongoose Schema supporting referencing potentially different schema object id based on the reference type. (e.g a book's locationId can reference a library's objectId or an user's objectId depending on if the book is checked out or at a library.)
- Admin and User can choose to log in with their gmail account. Google OAuth and Passport Js are used for this feature.
- The Material-UI is used for styling of the pages.
- Redux for managing the front-end state.
- The app is being hosted on MongoDB Atlas and deployed on Heroku.
- Third Party APIs used are: 
    - Open Library API - for book information and cover image
    - Mapbox API - for admins to add a new library and display all libraries for users


## Data Models
For this project's database, I used mongoDB and Mongoose.

```javascript
const userSchema = new mongoose.Schema({
    email:  { type: String, required: true, unique: true },
    pwd: String,
    isAdmin: Boolean
});

const adminSchema = new mongoose.Schema({
    email:  { type: String, required: true, unique: true },
    pwd: String,
    isAdmin: Boolean
});

const librarySchema = new mongoose.Schema({
    location:  { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: "Admin" }, 
});

const bookSchema = new mongoose.Schema({
    name:  { type: String},
    ISBN:  { type: Number, required: true },
    locationID: {
       type: Schema.Types.ObjectId,
       required: true,
       refPath: 'locationType'
    },
    locationType: {
        type: String,
        required: true,
        enum: ['Library', 'User']
     }
});

```


## Run the Project
- Clone this project
- Clone the [froneend repository](https://github.com/serenalin121/mini-free-library-front-end). and follow the instructions in there
- `cd` into the project directory
- Run `npm install` in your command line
- Create a `.env` file in the root directory and add your MongoDB URL, PORT 3003, SECRET, Google CLIENT_ID, and Google CLIENT_SECRET
- Run `npm start` in your command line




## Upcoming Features
- User can search libraries by zipcode
- Add other third party login options 


## Website Screenshots

![Screen Shot 2021-12-16 at 2 19 15 PM](https://user-images.githubusercontent.com/71234575/146457933-1a504660-3826-4315-9ed7-c1a00e42092f.png)

![Screen Shot 2021-12-16 at 2 20 55 PM](https://user-images.githubusercontent.com/71234575/146457959-2ca7a04d-ccbd-402b-9c6d-b117b96edcb8.png)

![Screen Shot 2021-12-16 at 2 21 49 PM](https://user-images.githubusercontent.com/71234575/146457964-04713af1-5565-4dc6-921d-1e2f2d49f4de.png)

