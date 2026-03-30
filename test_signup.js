
const fetch = require('node-fetch');

async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test User",
                email: "test" + Date.now() + "@example.com",
                password: "password123"
            })
        });
        const data = await res.json();
        console.log("Signup Status:", res.status);
        console.log("Signup Data:", data);
    } catch (err) {
        console.error("Test Error:", err.message);
    }
}

test();
