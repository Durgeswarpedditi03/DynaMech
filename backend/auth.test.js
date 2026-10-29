const assert = require("node:assert/strict");
const test = require("node:test");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-secret-that-is-long-enough-to-use";

const {
    authenticateToken,
    createAuthToken,
    requireCustomer
} = require("./auth");

function runMiddleware(middleware, authorization) {
    const result = {
        statusCode: null,
        body: null,
        nextCalled: false,
        request: {
            get: () => authorization
        }
    };
    const response = {
        status(statusCode) {
            result.statusCode = statusCode;
            return this;
        },
        json(body) {
            result.body = body;
            return this;
        }
    };

    middleware(result.request, response, () => {
        result.nextCalled = true;
    });

    return result;
}

test("creates verifiable customer tokens", () => {
    const token = createAuthToken({
        _id: "customer-123",
        email: "customer@example.com",
        role: "customer"
    });
    const result = runMiddleware(authenticateToken, `Bearer ${token}`);

    assert.equal(result.nextCalled, true);
    assert.deepEqual(result.request.authUser, {
        id: "customer-123",
        email: "customer@example.com",
        role: "customer"
    });
});

test("rejects requests without a bearer token", () => {
    const result = runMiddleware(authenticateToken, undefined);

    assert.equal(result.statusCode, 401);
    assert.equal(result.nextCalled, false);
});

test("rejects invalid and expired tokens", () => {
    const invalid = runMiddleware(authenticateToken, "Bearer invalid.token.value");
    const expiredToken = jwt.sign(
        { email: "customer@example.com", role: "customer" },
        process.env.JWT_SECRET,
        { algorithm: "HS256", expiresIn: "-1s", subject: "customer-123" }
    );
    const expired = runMiddleware(authenticateToken, `Bearer ${expiredToken}`);

    assert.equal(invalid.statusCode, 401);
    assert.equal(expired.statusCode, 401);
});

test("allows only customer roles through customer authorization", () => {
    const allowedRequest = { authUser: { role: "customer" } };
    const deniedRequest = { authUser: { role: "admin" } };
    const denied = { statusCode: null, body: null, nextCalled: false };

    const response = {
        status(statusCode) {
            denied.statusCode = statusCode;
            return this;
        },
        json(body) {
            denied.body = body;
            return this;
        }
    };
    let customerPassed = false;
    requireCustomer(allowedRequest, response, () => {
        customerPassed = true;
    });
    requireCustomer(deniedRequest, response, () => {
        denied.nextCalled = true;
    });

    assert.equal(customerPassed, true);
    assert.equal(denied.statusCode, 403);
    assert.equal(denied.nextCalled, false);
});
