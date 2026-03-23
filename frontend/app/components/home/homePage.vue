<template>
  <div class="homePageWrapper">
    <h3 v-if="pending">Loading posts...</h3>

    <h3 v-else-if="error" class="error-text">
      Failed to load posts: {{ error.message }}
    </h3>

    <h3 v-else-if="!posts || posts.length === 0">
      No posts available.
    </h3>

    <div v-else class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2>{{ post.title }}</h2>
        <p class="content">{{ post.content }}</p>
        
        <p class="author">
          Author: {{ post.author?.name }} 
          <a :href="`mailto:${post.author?.email}`">({{ post.author?.email }})</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~~/server/interfaces/post.interface';

  // Since Prisma is isolated to the external backend, we manually define 
  // the expected Data Transfer Objects (DTOs) here on the frontend.


  // Aliased 'data' to 'posts' to match the actual content
  const { data: posts, pending, error } = await useFetch<Post[]>('/api/posts/all')

  if (error.value) {
    console.error("Frontend Error:", error.value)
  }
</script>

<style lang="scss">
  .homePageWrapper {
    min-height: 120svh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 2rem; /* Added some padding so it doesn't touch the screen edges */
  }

  /* --- New Styles for the Posts --- */
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 600px; /* Keeps the text readable on wide screens */
    margin-top: 2rem;
  }

  .post-card {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    h2 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .content {
      color: #555;
      line-height: 1.5;
    }

    .author {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #888;

      a {
        color: #007bff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .error-text {
    color: red;
  }
</style>