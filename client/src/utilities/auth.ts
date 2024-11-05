// const apiUrl = import.meta.env.VITE_API_URL;

// export async function login (userName, password) {
//     const response = await fetch(`${apiUrl}/login`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ username: userName, password: password }),
//         credentials: "include"
//     });
//     return response.json();
// }

// export async function register(regUserName, regPassword) {
//     const response = await fetch(`${apiUrl}/register`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ username: regUserName, password: regPassword }),   
//     });
//     return response.json();
// }

// export async function handleLogout() {
//     const response = await fetch(`${apiUrl}/logout`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         credentials: "include"
//     });
//     return response.json();
// }