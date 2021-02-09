const express = require('express');
const cors = require('cors')
const CognitoService = require('./services/cognito-service')
const MysqlService = require('./services/mysql-service');

const users = require('./data/users')
const env = require('./env');

var app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())


const cognitoService = new CognitoService(env.cognitoUserPoolID, env.cognitoClientID);
const mysqlService = new MysqlService();

app.get('/create-user', (req, res) => {
    try {
        mysqlService.getUserCount((count) => {
            let batch = 0,
                limit = 5,
                range = ((count / limit) < 0) ? 1 : (count / limit);

            for (let index = 0; index < range; index++) {
                mysqlService.getUser(limit, (batch * limit), rows => {
                    let allPromises = [];
                    rows.forEach(user => {
                        return cognitoService.registerUser({
                            name: user.name,
                            email: user.email,
                            address: user.address,
                            phone_number: user.phoneNumber,
                            'custom:scope': user.scope,
                            'custom:password': user.password
                        })
                    })

                    Promise.all(allPromises)
                        .then(() => {
                            console.log(`Batch - ${batch} Completed with ${batch * limit} rows`)
                        })
                        .catch(function (err) {
                            // console.log(err.message);
                        });
                    
                    batch++;


                });
            }
        });

    } catch (error) {
        console.log("error ==>", error)
    }
});

app.get('/check-user', (req, res) => {
    try {

        if(req.query.type != 'mysql') {
            cognitoService.login({
                email : req.query.email, 
                password : req.query.password
            })
        }else {
            mysqlService.getUserByCredencial(req.query.email, req.query.password,rows => {
                console.log("USER DATA ==>", rows)
            });
        }
        
    } catch (error) {
        console.log("error ==>", error)
    }
})

app.listen(3001);
console.log('Application running #', 3001);