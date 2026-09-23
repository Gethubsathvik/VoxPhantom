// lib/redis.ts
const client = null as unknown as {
  on: (event: string, cb: (err: Error) => void) => void;
  connect: () => Promise<void>;
  isOpen: boolean;
  get: (key: string) => Promise<string | null>;
  setEx: (key: string, ttl: number, value: string) => Promise<void>;
  del: (key: string) => Promise<void>;
  incr: (key: string) => Promise<number>;
  expire: (key: string, ttl: number) => Promise<void>;
};

export const redis = client;

export async function initRedis() {
  return null;
}

export async function getFromCache(_key: string): Promise<string | null> {
  return null;
}

export async function setInCache(_key: string, _value: string, _ttl: number = 3600): Promise<void> {
  // not implemented
}

export async function deleteFromCache(_key: string): Promise<void> {
  // not implemented
}

export async function incrementCounter(_key: string, _ttl: number = 3600): Promise<number> {
  return 0;
}
