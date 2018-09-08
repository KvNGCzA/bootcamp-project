[![Build Status](https://travis-ci.org/KvNGCzA/bootcamp-project.svg?branch=master)](https://travis-ci.org/KvNGCzA/bootcamp-project)
[![Coverage Status](https://coveralls.io/repos/github/KvNGCzA/bootcamp-project/badge.svg?branch=develop)](https://coveralls.io/github/KvNGCzA/bootcamp-project?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d6fe0ceabea0edb4b970/test_coverage)](https://codeclimate.com/github/KvNGCzA/bootcamp-project/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d6fe0ceabea0edb4b970/maintainability)](https://codeclimate.com/github/KvNGCzA/bootcamp-project/maintainability)


# StackOverFlow Lite

This project is an Andela Bootcamp challenge, written in Javascript, NodeJS and a bit of HTML and CSS.

## Getting Started

```
git clone this repo by running git@github.com:KvNGCzA/bootcamp-project.git
```

### Prerequisites

Have a local or online POSTGRESQL database running.

```
e.g. Heroku postgres, Elephant SQL
```

### Installing
In order to install all dependencies. 
```
run npm i 
```
create a .env file in the root of the project folder

Configure an environment variable for the database connection string if you are running locally. Name the variable DB.
```
eg DB= postgres://connectionstring/
```
Configure a JWT_KEY variable. You can make this equal to any string.

```
e.g JWT_KEY= anyStringHere
```
To start the application. Run
```
npm start
```
You can now test the api endpoints via postman


Sign up for a user account via a POST/ localhost:3000/api/auth/signup
provide firstName, lastName, username, email and password.
```
a link to the documentation will be pasted here
```


## Running the tests

to run the test run
```
npm test in the terminal
```
### Break down into end to end tests

The tests cover all endpoints includeing signing up, login in, posting an question, answering a question, marking an answer as accepted by the question author and editing an answer.


## Deployment

You can host this app on any server that supports node apps such as Heroku.

## Built With

* Nodejs
* Javascript
* Mocha

## Authors

* **Akanmu Christopher** - *Initial work* - [git account](https://github.com/KvNGCzA)


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

