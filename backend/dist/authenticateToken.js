import jwt from "jsonwebtoken";
// Verify user (Check tokens is valid or not vaild)
async function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.send({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
    });
}
export default authenticate;
