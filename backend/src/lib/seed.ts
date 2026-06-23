import { prisma } from "./prisma";

export async function StartDBSeeding() {
  console.log("Starting DB Seeding")

  let userCount = 0;
  let projectCount = 0;
  let techStackCount = 0;
  
  try {
    userCount = await prisma.user.count();
    projectCount = await prisma.project.count();
    techStackCount = await prisma.techStackItem.count();
  } catch (error) {
    console.log("ERROR: Prisma not migrated!")
    return
  }

  if (techStackCount == 0) {
    console.log("Applying TechStack Seed...")
    const items = [
      {
        name: "Nuxt.js",
        imageUrl: "https://nuxt.com/assets/design-kit/logo/icon-green.png",
        companyUrl: "https://nuxt.com/",
        description: "Nuxt.js is an open source framework under MIT license that makes web development simple and powerful."
      },
      {
        name: "TypeScript",
        imageUrl: "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/website/static/img/logo.svg",
        companyUrl: "https://www.typescriptlang.org/",
        description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale."
      },
      {
        name: "C++",
        imageUrl: "https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.svg",
        companyUrl: "https://cplusplus.com/",
        description: "C++ is a high-performance general-purpose programming language developed by Bjarne Stroustrup."
      },
      {
        name: "C#",
        imageUrl: "https://raw.githubusercontent.com/dotnet/brand/main/logo/dotnet-logo.svg",
        companyUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        description: "C# is a modern, object-oriented, and type-safe programming language developed by Microsoft."
      },
      {
        name: "Unreal Engine",
        imageUrl: "https://raw.githubusercontent.com/EpicGames/Signup/master/UnrealEngineLogo.png",
        companyUrl: "https://www.unrealengine.com/",
        description: "Unreal Engine is a 3D computer graphics game engine developed by Epic Games."
      },
      {
        name: "Node.js",
        imageUrl: "https://nodejs.org/static/images/logo.svg",
        companyUrl: "https://nodejs.org/",
        description: "Node.js is an open-source, cross-platform JavaScript runtime environment."
      },
      {
        name: "Docker",
        imageUrl: "https://www.docker.com/wp-content/uploads/2023/05/symbol-blue-docker-logo.png",
        companyUrl: "https://www.docker.com/",
        description: "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers."
      }
    ];

    for (const item of items) {
      await prisma.techStackItem.create({ data: item });
    }
    console.log("TechStack Seeding completed successfully!");
  }

  if (userCount == 0 && projectCount == 0) {
    console.log("Applying Seed...")

    const seedUser = await prisma.user.create({
        data: {
            name: 'Hans',
            email: 'hans@example.com',
        }
    })

    await prisma.project.create({
        data: {
            title: 'Test Project',
            content: 'This is a test project created during DB seeding.',
            imageUrl: 'https://example.com/project.png',
            authorId: seedUser.id,
            imageUrls: ['https://example.com/project.png'],
            videoUrls: ['https://example.com/project.video'],
            githubUrl: 'https://github.com/example/project',
            websiteUrl: 'https://example.com',
        }
    })

    const finalUserCount = await prisma.user.count();
    const finalProjectCount = await prisma.project.count();

    if (finalUserCount != 0 && finalProjectCount != 0) {
        console.log("DB Seeding successfully!")
    } else {
        console.log("DB Seeding failed!")
    }
  } else {
    console.log("DB already seeded, continuing...")
  }
}