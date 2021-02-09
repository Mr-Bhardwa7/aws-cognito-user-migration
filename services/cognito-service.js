const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const authorizedAttribute = ['name', 'preferred_username', 'gender', 'birthdate', 'address', 'email', 'phone_number', 'custom:scope']

module.exports = class AmazonCognitoService {

    constructor(userPoolId, clientId) {
        this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: userPoolId, // Your user pool id here    
            ClientId: clientId // Your client id here
        });
    }

    //register user
    registerUser(user) {
        return new Promise((resolve, reject) => {
            let attributeList = [];

            Object.keys(user).forEach((key) => {
                if (authorizedAttribute.includes(key)) {
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: key, Value: user[key] }));
                }
            });

            let cognitoUserAttribute = [];
            cognitoUserAttribute.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'MessageAction', Value: 'CONFIRMED' }));

            this.userPool.signUp(user.email, user['custom:password'], attributeList, cognitoUserAttribute, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if(result) {
                    resolve(result.user);
                }else {
                    resolve(result);
                }
            });
        })
    }

    login(user) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: user.email,
            Password: user.password,
        });
 
        var userData = {
            Username: user.email,
            Pool: this.userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log("result", result)
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('id token + ' + result.getIdToken().getJwtToken());
                console.log('refresh token + ' + result.getRefreshToken().getToken());
            },
            onFailure: function (err) {
                console.log(err);
            },

        });
    }
}
