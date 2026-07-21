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

  console.log("Applying TechStack Seed...")
  const items = [
    {
      name: "Angular",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg",
      companyUrl: "https://angular.dev/",
      description: "Angular is a web development framework for building mobile and desktop web applications."
    },
    {
      name: "Nuxt.js",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
      companyUrl: "https://nuxt.com/",
      description: "Nuxt.js is an open source framework under MIT license that makes web development simple and powerful."
    },
    {
      name: "Vue.js",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      companyUrl: "https://vuejs.org/",
      description: "Vue.js is an approachable, performant and versatile framework for building web user interfaces."
    },
    {
      name: "TypeScript",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      companyUrl: "https://www.typescriptlang.org/",
      description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale."
    },
    {
      name: "JavaScript",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      companyUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      description: "JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions."
    },
    {
      name: "Node.js",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      companyUrl: "https://nodejs.org/",
      description: "Node.js is an open-source, cross-platform JavaScript runtime environment."
    },
    {
      name: "Supabase",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      companyUrl: "https://supabase.com/",
      description: "Supabase is an open source Firebase alternative."
    },
    {
      name: "Firebase",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      companyUrl: "https://firebase.google.com/",
      description: "Firebase is an app development platform that helps you build and grow apps and games users love."
    },
    {
      name: "Sass",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      companyUrl: "https://sass-lang.com/",
      description: "Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets."
    },
    {
      name: "Tailwind CSS",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      companyUrl: "https://tailwindcss.com/",
      description: "Tailwind CSS is a utility-first CSS framework for rapidly building modern websites."
    },
    {
      name: "C",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      companyUrl: "https://en.wikipedia.org/wiki/C_(programming_language)",
      description: "C is a general-purpose computer programming language."
    },
    {
      name: "C++",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      companyUrl: "https://cplusplus.com/",
      description: "C++ is a high-performance general-purpose programming language developed by Bjarne Stroustrup."
    },
    {
      name: "C#",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      companyUrl: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      description: "C# is a modern, object-oriented, and type-safe programming language developed by Microsoft."
    },
    {
      name: "Lua",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
      companyUrl: "https://www.lua.org/",
      description: "Lua is a powerful, efficient, lightweight, embeddable scripting language."
    },
    {
      name: "Debian",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg",
      companyUrl: "https://www.debian.org/",
      description: "Debian is a Unix-like operating system composed entirely of free software."
    },
    {
      name: "Docker",
      imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      companyUrl: "https://www.docker.com/",
      description: "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers."
    }
  ];

  const itemNames = items.map(item => item.name);
  await prisma.techStackItem.deleteMany({
    where: {
      name: {
        notIn: itemNames
      }
    }
  });

  for (const item of items) {
    await prisma.techStackItem.upsert({
      where: { name: item.name },
      update: {
        imageUrl: item.imageUrl,
        companyUrl: item.companyUrl,
        description: item.description
      },
      create: item
    });
  }
  console.log("TechStack Seeding completed successfully!");

  console.log("Applying Project Seed...")

  let seedUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: 'hans@example.com' },
        { name: 'Hans' }
      ]
    }
  });

  if (!seedUser) {
    seedUser = await prisma.user.create({
      data: {
        name: 'Hans',
        email: 'hans@example.com',
      }
    });
  }

  const projectData = [
    {
      title: 'Zouleyna Webshop',
      content: 'Development and administration of the official Zouleyna webshop, built with wordpress.',
      imageUrl: 'images/project_thumbnails/zouleyna_thumb.webp',
      imageUrls: [],
      videoUrls: [],
      websiteUrl: 'https://zouleyna.com',
      instagramUrl: 'https://www.instagram.com/zouleynacosmetics',
      tiktokUrl: 'https://www.tiktok.com/@zouleynacosmetics',
    },
    {
      title: 'Szene Club Webshop',
      content: 'Development and administration of the Szene Club webshop. Build in shopify with custom theme.',
      imageUrl: 'images/project_thumbnails/szeneclub_thumb.webp',
      imageUrls: [],
      videoUrls: [],
      websiteUrl: 'https://szeneclub.com',
      instagramUrl: 'https://www.instagram.com/szeneclub_com/',
    },
    {
      title: 'Discord Bots',
      content: 'Development and hosting of several custom discord bots. Including ticket bots, moderation bots, and more.',
      imageUrl: '/images/project_thumbnails/dbot_thumb.webp',
      imageUrls: [],
      videoUrls: [],
    },
    {
      title: 'World of Miner - Minecraft Server',
      content: 'Development and administration of a Minecraft Faction server. Focused on player retention and community, with custom plugins, optimized performance, and a variety of minigames.',
      imageUrl: '/images/project_thumbnails/wom_thumb.webp',
      imageUrls: [],
      videoUrls: [],
    },
    {
      title: 'Tractor Market - Student Project',
      content: 'WPF UI application showcasing an agricultural vehicle shop. Showcases basic and advanced UI design principles including custom animations and modern design trends.',
      imageUrl: '/images/project_thumbnails/tractormarket_thumb.webp',
      imageUrls: [],
      videoUrls: [],
      githubUrl: 'https://github.com/zynth666/tractor-market',
    },
    {
      title: 'Mythic Garden - Student Project',
      content: 'Digital plant companion AR application. Made with Unity.',
      imageUrl: '/images/project_thumbnails/mythic_garden_thumb.webp',
      githubUrl: 'https://github.com/monolith-codes/MythicGarden',
      imageUrls: [],
      videoUrls: [],
    },
    {
      title: 'Yoshy Project Hearth Explosion - 3D Animation',
      content: 'Project focusing on 3D modelling and animation of a Hearth Necklace for the Brand Yoshy Project.',
      imageUrl: '/images/project_thumbnails/szenaryo_thumb.webp',
      instagramUrl: 'https://www.instagram.com/yoshyproject/',
      videoUrl: 'https://www.instagram.com/reel/DGFh8lvIEC3/',
      imageUrls: [],
      videoUrls: [],
    },
    {
      title: 'Pokemon Biomes - 3D Animation - Student Project',
      content: 'Project focusing on 3D modelling and animation of various Pokemon Biomes. Made with Blender.',
      imageUrl: '/images/project_thumbnails/pokemon_thumb.webp',
      videoUrl: 'https://www.youtube.com/watch?v=UcnoVx4YDXA',
      imageUrls: [],
      videoUrls: [],
    },
  ];

  const projectTitles = projectData.map(project => project.title);
  await prisma.project.deleteMany({
    where: {
      title: {
        notIn: projectTitles
      }
    }
  });

  for (const project of projectData) {
    const existingProject = await prisma.project.findFirst({
      where: {
        title: project.title,
        authorId: seedUser.id
      }
    });

    const normalizedProject = {
      ...project,
      githubUrl: project.githubUrl ?? null,
      websiteUrl: project.websiteUrl ?? null,
      videoUrl: project.videoUrl ?? null,
      instagramUrl: project.instagramUrl ?? null,
      tiktokUrl: project.tiktokUrl ?? null,
    };

    if (existingProject) {
      await prisma.project.update({
        where: { id: existingProject.id },
        data: normalizedProject
      });
      console.log(`Project "${project.title}" updated successfully!`);
    } else {
      await prisma.project.create({
        data: {
          ...normalizedProject,
          authorId: seedUser.id
        }
      });
      console.log(`Project "${project.title}" created successfully!`);
    }
  }
}