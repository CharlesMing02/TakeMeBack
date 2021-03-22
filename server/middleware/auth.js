import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => { //make sure user is authorized before doing next action
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //from jwt and not google
        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //sub is attribute from google
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;