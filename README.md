# Migrate users from mysql to aws cognito

The project is created to show how we can migrate user from mysql to cognito server and login the user. 

### Project Structure
```
project
└───  config
    |  connection.js
└───  data
    |  Users.sql
    |  users.js
└───  services
    |  cognito-service.js
    |  mysql-service.js
|  README.md
|  env.js
|  index.js        
|  package.json
```

### Steps to use
- Update the database credentials in ```env.js```
- Run ```npm i``` command to install all the dependencies 
- Run ``` npm strat ``` command to serve the project at 
- The project will server at ```3001``` port number

