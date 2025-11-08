import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, subscriptionPlans, userSubscriptions, payments, aiUsage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getSubscriptionPlans() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true));
}

export async function getPlanById(planId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, planId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(userSubscriptions)
    .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.isActive, true)))
    .limit(1);

  if (result.length === 0) return null;

  const sub = result[0];
  const plan = await getPlanById(sub.planId);
  
  return { ...sub, plan };
}

export async function createPayment(userId: number, planId: number, amount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(payments).values({
    userId,
    amount,
    currency: "USD",
    status: "pending",
  });

  return result;
}

export async function updatePaymentStatus(paymentId: number, status: string, cryptomusInvoiceId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(payments).set({
    status: status as any,
    cryptomusInvoiceId,
    updatedAt: new Date(),
  }).where(eq(payments.id, paymentId));
}

export async function getAIUsage(userId: number, month: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(aiUsage)
    .where(and(eq(aiUsage.userId, userId), eq(aiUsage.month, month)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function incrementAIUsage(userId: number, provider: string, month: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getAIUsage(userId, month);
  
  if (existing) {
    await db.update(aiUsage).set({
      requestCount: existing.requestCount + 1,
      updatedAt: new Date(),
    }).where(eq(aiUsage.id, existing.id));
  } else {
    await db.insert(aiUsage).values({
      userId,
      provider: provider as any,
      requestCount: 1,
      month,
    });
  }
}

export async function getUserPayments(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(payments).where(eq(payments.userId, userId));
}
