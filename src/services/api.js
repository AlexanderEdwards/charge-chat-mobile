// src/services/api.js
export async function getSupercharger(latitude, longitude) {
  const response = await fetch(`http://139.59.130.149:3000/findSupercharger?latitude=${latitude}&longitude=${longitude}`);
  
  // Check if the response is not 204 before parsing it as JSON
  if (response.status !== 204) {
    const data = await response.json();
    return data;
  } else {
    // Handle 204 status (No Content) here, for example by returning null or custom object
    return null;
  }
}

  
  export async function sendMessage(message) {
    // Send a chat message here
  }