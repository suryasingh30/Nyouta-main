import jwt from 'jsonwebtoken';

// Authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // console.log("No token provided, authorization denied");
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    // console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(req.user);
         // Attach decoded user data to request object
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            // console.log(err);
            return res.status(401).json({ message: 'Token has expired, Please Login' });
        }
        // console.log(err);
        return res.status(403).json({ message: 'Token is invalid, Please Login' });
    }
};

// Authorize roles
const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
};

// Export both as named exports
export { authenticateToken, authorizeRole };
