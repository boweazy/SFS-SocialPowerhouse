import { type User, type InsertUser, type Post, type AITemplate, type PostComment } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

// modify the interface with any CRUD methods
// you might need

export interface InsertPost {
  userId: string;
  content: string;
  platforms: string[];
  mediaUrls?: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  status?: string;
  aiGenerated?: boolean;
  tone?: string;
  hashtags?: string[];
}

export interface InsertAITemplate {
  userId: string;
  name: string;
  prompt: string;
  tone: string;
  category?: string;
  isPublic?: boolean;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Post methods
  getPost(id: string): Promise<Post | undefined>;
  getUserPosts(userId: string, filters?: {
    status?: string;
    platform?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, updates: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;

  // Template methods
  getTemplate(id: string): Promise<AITemplate | undefined>;
  getUserTemplates(userId: string): Promise<AITemplate[]>;
  createTemplate(template: InsertAITemplate): Promise<AITemplate>;
  updateTemplate(id: string, updates: Partial<InsertAITemplate>): Promise<AITemplate | undefined>;
  deleteTemplate(id: string): Promise<boolean>;
  incrementTemplateUsage(id: string): Promise<void>;

  // Comment methods
  getPostComments(postId: string): Promise<PostComment[]>;
  createComment(postId: string, userId: string, comment: string): Promise<PostComment>;
  deleteComment(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;
  private templates: Map<string, AITemplate>;
  private comments: Map<string, PostComment>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.templates = new Map();
    this.comments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = randomUUID();
    const now = new Date();
    const user: User = {
      ...insertUser,
      password: hashedPassword,
      id,
      name: null,
      avatar: null,
      subscriptionTier: 'starter',
      sfsLevel: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  // Post methods
  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getUserPosts(
    userId: string,
    filters?: {
      status?: string;
      platform?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<Post[]> {
    let posts = Array.from(this.posts.values()).filter(
      (post) => post.userId === userId
    );

    if (filters?.status) {
      posts = posts.filter((post) => post.status === filters.status);
    }

    if (filters?.platform) {
      posts = posts.filter((post) =>
        post.platforms.includes(filters.platform!)
      );
    }

    if (filters?.startDate) {
      posts = posts.filter(
        (post) => post.scheduledAt && post.scheduledAt >= filters.startDate!
      );
    }

    if (filters?.endDate) {
      posts = posts.filter(
        (post) => post.scheduledAt && post.scheduledAt <= filters.endDate!
      );
    }

    return posts.sort((a, b) => {
      const aTime = a.scheduledAt?.getTime() || a.createdAt?.getTime() || 0;
      const bTime = b.scheduledAt?.getTime() || b.createdAt?.getTime() || 0;
      return aTime - bTime;
    });
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const now = new Date();
    const post: Post = {
      id,
      userId: insertPost.userId,
      content: insertPost.content,
      platforms: insertPost.platforms,
      mediaUrls: insertPost.mediaUrls || null,
      scheduledAt: insertPost.scheduledAt || null,
      publishedAt: insertPost.publishedAt || null,
      status: insertPost.status || 'draft',
      approvalStatus: null,
      approvedBy: null,
      approvedAt: null,
      rejectionReason: null,
      aiGenerated: insertPost.aiGenerated || false,
      tone: insertPost.tone || null,
      hashtags: insertPost.hashtags || null,
      createdAt: now,
      updatedAt: now,
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(
    id: string,
    updates: Partial<InsertPost>
  ): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) {
      return undefined;
    }

    const updatedPost: Post = {
      ...post,
      ...updates,
      updatedAt: new Date(),
    };

    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Template methods
  async getTemplate(id: string): Promise<AITemplate | undefined> {
    return this.templates.get(id);
  }

  async getUserTemplates(userId: string): Promise<AITemplate[]> {
    return Array.from(this.templates.values())
      .filter((template) => template.userId === userId || template.isPublic)
      .sort((a, b) => b.usageCount! - a.usageCount!); // Most used first
  }

  async createTemplate(insertTemplate: InsertAITemplate): Promise<AITemplate> {
    const id = randomUUID();
    const now = new Date();
    const template: AITemplate = {
      id,
      userId: insertTemplate.userId,
      name: insertTemplate.name,
      prompt: insertTemplate.prompt,
      tone: insertTemplate.tone,
      category: insertTemplate.category || null,
      isPublic: insertTemplate.isPublic || false,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(
    id: string,
    updates: Partial<InsertAITemplate>
  ): Promise<AITemplate | undefined> {
    const template = this.templates.get(id);
    if (!template) {
      return undefined;
    }

    const updatedTemplate: AITemplate = {
      ...template,
      ...updates,
      updatedAt: new Date(),
    };

    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }

  async incrementTemplateUsage(id: string): Promise<void> {
    const template = this.templates.get(id);
    if (template) {
      template.usageCount = (template.usageCount || 0) + 1;
      template.updatedAt = new Date();
      this.templates.set(id, template);
    }
  }

  // Comment methods
  async getPostComments(postId: string): Promise<PostComment[]> {
    return Array.from(this.comments.values())
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime()); // Oldest first
  }

  async createComment(postId: string, userId: string, comment: string): Promise<PostComment> {
    const id = randomUUID();
    const now = new Date();
    const newComment: PostComment = {
      id,
      postId,
      userId,
      comment,
      createdAt: now,
      updatedAt: now,
    };
    this.comments.set(id, newComment);
    return newComment;
  }

  async deleteComment(id: string): Promise<boolean> {
    return this.comments.delete(id);
  }
}

export const storage = new MemStorage();
