import { Author } from "./author.interface";

export interface Post {
    id: number | string;
    title: string;
    content: string | null;
    author: Author | null;
}