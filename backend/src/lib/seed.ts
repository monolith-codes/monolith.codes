import { prisma } from "./prisma";

export async function StartDBSeeding() {
  console.log("Starting DB Seeding")

  let userCount = 0;
  let postCount = 0;
  
  try {
    userCount = await prisma.user.count();
    postCount = await prisma.post.count();
  } catch (error) {
    console.log("ERROR: Prisma not migrated!")
    return
  }

  if(userCount == 0 && postCount == 0) {
    console.log("Applying Seed...")

    const seedUser = await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@example.com',
        }
    })

    const post = await prisma.post.create({
        data: {
            title: 'Prisma is awesome',
            content: 'I love how easy it is to link tables',
            authorId: seedUser.id,
        }
    })

    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();

    if(userCount != 0 && postCount != 0) {
        console.log("DB Seeding successfully!")
    }else{
        console.log("DB Seeding failed!")
    }
  }else{
    console.log("DB already seeded, continuing...")
  }
}