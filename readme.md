# App Title: 

### App Demo: www.linkegoeshere.com

---

## Concept:

A full description of what your project is all about 

## Technologies Used:

* Auth
  * bcrypt
  * passport
  * express-session
  * connect-flash
* Database management
  * postgres
  * sequelize



## Installation instructions:

1. Fork and clone the repo
2. Install dependencies
```
npm i
```

3. Create a `config.json` with the following code:
```json
{
  "development": {
    "database": "<insert development db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
**Note:** If your database requires a username and password you'll need to include these fields as well.

4. Create a database
```
sequelize db:create <insert db name here>
```

5. Migrate models to your database
```
sequelize db:migrate
```
6. Register at the [Spoonacular API](https://spoonacular.com/) to get your API key

7. Add `SESSION_SECRET` (any string), `PORT` (value of the host port), and `FOOD_KEY` (your Spoonacular API key) environment variables in a `.env` file.

8. Run `nodemon` to start up app
----------------------------------------------------------
### ERD

![ERD](asdfasdfsd)
----------------------------------------------------------

### User Stories
* As a user, I want to be able to search for food and cocktail recipes
* As a user, I want to search for recipes and save them to a list in order to access them later
* As a user, I want to add guests to a list and include likes, dislikes, and/or sensitivities/allergies
* As a user I want to flag saved guests and recipes to be displayed together on one page, and then go to that page to see my party plan.
----------------------------------------------------------
### Wireframes
![mainpage](./Wireframe/1.png)

------------------------------
![guestpage](./Wireframe/2.png)

-------------------------------
![mealpage](./Wireframe/3.png)

---------------------------------
![cocktailpage](./Wireframe/4.png)

-----------------------------------
![searchresultspage](./Wireframe/5.png)

----------------------------------------------------------
