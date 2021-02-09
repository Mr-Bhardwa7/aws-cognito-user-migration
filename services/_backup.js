const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const poolData = {
    UserPoolId: "us-east-2_sgAKsEem7", // Your user pool id here    
    ClientId: "1lmo260bi3tj106hjdu8rkk1rm" // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//register user
function RegisterUser(user, callback){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"sampleEmaila@gmail.com"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

    userPool.signUp('sampleEmaila@gmail.com', 'SamplePassword123', attributeList, null, function(err, result){
        if (err) {
            // console.log(err);
            callback(err);
            return;
        }
        cognitoUser = result.user;
        // console.log('user name is ' + cognitoUser.getUsername());
        callback(null, cognitoUser);
    });
}

//login
// function Login() {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username : 'sampleEmail@gmail.com',
//         Password : 'SamplePassword123',
//     });

//     var userData = {
//         Username : 'sampleEmail@gmail.com',
//         Pool : userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             console.log('access token + ' + result.getAccessToken().getJwtToken());
//             console.log('id token + ' + result.getIdToken().getJwtToken());
//             console.log('refresh token + ' + result.getRefreshToken().getToken());
//         },
//         onFailure: function(err) {
//             console.log(err);
//         },

//     });
// }

// //update user data
// function update(username, password){
//     var attributeList = [];
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//         Name: "custom:scope",
//         Value: "some new value"
//     }));
//     attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
//         Name: "name",
//         Value: "some new value"
//     }));

//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });

//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.updateAttributes(attributeList, (err, result) => {
//         if (err) {
//             //handle error
//         } else {
//             console.log(result);
//         }
//     });
// }

// //verify token
// function ValidateToken(token) {
//     request({
//         url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
//         json: true
//     }, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             pems = {};
//             var keys = body['keys'];
//             for(var i = 0; i < keys.length; i++) {
//                 //Convert each key to PEM
//                 var key_id = keys[i].kid;
//                 var modulus = keys[i].n;
//                 var exponent = keys[i].e;
//                 var key_type = keys[i].kty;
//                 var jwk = { kty: key_type, n: modulus, e: exponent};
//                 var pem = jwkToPem(jwk);
//                 pems[key_id] = pem;
//             }
//             //validate the token
//             var decodedJwt = jwt.decode(token, {complete: true});
//             if (!decodedJwt) {
//                 console.log("Not a valid JWT token");
//                 return;
//             }

//             var kid = decodedJwt.header.kid;
//             var pem = pems[kid];
//             if (!pem) {
//                 console.log('Invalid token');
//                 return;
//             }

//             jwt.verify(token, pem, function(err, payload) {
//                 if(err) {
//                     console.log("Invalid Token.");
//                 } else {
//                     console.log("Valid Token.");
//                     console.log(payload);
//                 }
//             });
//         } else {
//             console.log("Error! Unable to download JWKs");
//         }
//     });
// }

// //Renew token
// function renew() {
//     const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: "your_refresh_token_from_a_previous_login"});

//     const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//     const userData = {
//         Username: "sample@gmail.com",
//         Pool: userPool
//     };

//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.refreshSession(RefreshToken, (err, session) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let retObj = {
//                 "access_token": session.accessToken.jwtToken,
//                 "id_token": session.idToken.jwtToken,
//                 "refresh_token": session.refreshToken.token,
//             }
//             console.log(retObj);
//         }
//     })
// }

// //delete user
// function DeleteUser() {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });

//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             cognitoUser.deleteUser((err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Successfully deleted the user.");
//                     console.log(result);
//                 }
//             });
//         },
//         onFailure: function (err) {
//             console.log(err);
//         },
//     });
// }

// //delete attribute from user
// function deleteAttributes(username, password){
//     var attributeList = [];
//     attributeList.push("custom:scope");
//     attributeList.push("name");

//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });

//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.deleteAttributes(attributeList, (err, result) => {
//         if (err) {
//             //handle error
//         } else {
//             console.log(result);
//         }
//     });
// }

// //Change password 
// function ChangePassword(username, password, newpassword) {
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: username,
//         Password: password,
//     });

//     var userData = {
//         Username: username,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             cognitoUser.changePassword(password, newpassword, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Successfully changed password of the user.");
//                     console.log(result);
//                 }
//             });
//         },
//         onFailure: function (err) {
//             console.log(err);
//         },
//     });
// }