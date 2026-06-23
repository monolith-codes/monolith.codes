export default defineEventHandler(async (event) => {
  try {
    const data = await $fetch('http://monolith.codes-backend:1909/techstack');
    return data;
  } catch (error) {
    console.error("Server API Error fetching tech stack:", error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch from backend' });
  }
});
