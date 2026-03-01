import {
  pgTable,
  pgEnum,
  serial,
  timestamp,
  varchar,
  integer,
  jsonb,
  text,
} from "drizzle-orm/pg-core";

// 1. Defining the Enum
// This creates a custom PostgreSQL type for consistent status values
export const matchStatusEnum = pgEnum("match_status", [
  "scheduled",
  "live",
  "finished",
]);

// 2. The Matches Table
// Stores the core information about a specific sporting event
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  sport: varchar("sport", { length: 50 }).notNull(),
  homeTeam: varchar("home_team", { length: 100 }).notNull(),
  awayTeam: varchar("away_team", { length: 100 }).notNull(),
  status: matchStatusEnum("status").notNull().default("scheduled"),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  homeScore: integer("home_score").notNull().default(0),
  awayScore: integer("away_score").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// 3. The Commentary Table
// Stores real-time play-by-play events that belong to a specific match
export const commentary = pgTable("commentary", {
  id: serial("id").primaryKey(),

  // Foreign key referencing the matches table
  matchId: integer("match_id")
    .notNull()
    .references(() => matches.id),

  minute: integer("minute"),
  sequence: integer("sequence"),
  period: varchar("period", { length: 50 }),
  eventType: varchar("event_type", { length: 50 }),
  actor: varchar("actor", { length: 100 }),
  team: varchar("team", { length: 100 }),
  message: text("message").notNull(),

  // JSONB is excellent for flexible, unstructured data in PostgreSQL
  metadata: jsonb("metadata"),
  tags: text("tags").array(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});
