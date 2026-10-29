const jwt = require("jsonwebtoken");

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must be configured with at least 32 characters");
    }

    return secret;
}

function assertJwtSecret() {
    getJwtSecret();
}

function createAuthToken(user) {
    return jwt.sign(
        {
            email: user.email,
            role: user.role
        },
        getJwtSecret(),
        {
            algorithm: "HS256",
            expiresIn: "1d",
            subject: user._id.toString()
        }
    );
}

function authenticateToken(req, res, next) {
    const authorization = req.get("authorization") || "";
    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const payload = jwt.verify(token, getJwtSecret(), {
            algorithms: ["HS256"]
        });

        if (
            typeof payload === "string" ||
            typeof payload.sub !== "string" ||
            typeof payload.email !== "string" ||
            typeof payload.role !== "string"
        ) {
            return res.status(401).json({ message: "Invalid authentication token" });
        }

        req.authUser = {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        };
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid or expired authentication token" });
        }

        return next(error);
    }
}

function requireCustomer(req, res, next) {
    if (req.authUser.role !== "customer") {
        return res.status(403).json({ message: "Customer access required" });
    }

    return next();
}

module.exports = {
    assertJwtSecret,
    authenticateToken,
    createAuthToken,
    requireCustomer
};
