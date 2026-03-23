export default defineEventHandler(async (event) => {
  try {
    // Make the request to your actual backend
    // (Removed the Authorization header for now to see if it fixes the request)
    const data = await $fetch('http://host.docker.internal:4000/users/all');
    return data;
  } catch (error) {
    console.error("Server API Error fetching users:", error);
    // Throw a Nuxt error so the frontend knows it failed
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch from backend' });
  }
});