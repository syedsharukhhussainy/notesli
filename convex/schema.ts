import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notebooks: defineTable({
    title: v.string(),
    userId: v.string(),
    content: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
