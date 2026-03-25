import { prisma } from "./prisma";

export async function StartDBSeeding() {
  console.log("Starting DB Seeding")

  let userCount = 0;
  let userCount2 = 0;
  let userCount3 = 0;
  let postCount = 0;
  
  try {
    userCount = await prisma.user.count();
    userCount2 = await prisma.user2.count();
    userCount3 = await prisma.user3.count();
    postCount = await prisma.post.count();
  } catch (error) {
    console.log("ERROR: Prisma not migrated!")
    return
  }

  if(userCount == 0 && postCount == 0) {
    console.log("Applying Seed...")

    const seedUser = await prisma.user.create({
        data: {
            name: 'Hans',
            email: 'bob@example.com',
        }
    })

    const seedUser2 = await prisma.user2.create({
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