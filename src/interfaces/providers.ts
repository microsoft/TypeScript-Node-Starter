export const knownProviders = ["facebook"] as const;

export type KnownProvider = typeof knownProviders[number];

export const isKnownProvider = (provider: string): provider is KnownProvider => (knownProviders as readonly string[]).includes(provider);
