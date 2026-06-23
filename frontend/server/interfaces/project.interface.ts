import type { Author } from "./author.interface";

export interface Project {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    author: Author | null;
    authorId: number;
    imageUrls: string[];
    videoUrls: string[];
    githubUrl: string | null;
    websiteUrl: string | null;
    videoUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
}
