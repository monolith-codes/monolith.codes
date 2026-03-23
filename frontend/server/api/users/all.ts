export default defineEventHandler(async (event) => {
  try {
    const data = await $fetch('http://monolith.codes-backend:1909/users/all');
    return data;
  } catch (error) {
    console.error("Server API Error fetching users:", error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch from backend' });
  }
});