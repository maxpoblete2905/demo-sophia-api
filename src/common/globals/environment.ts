export const Environment = {
  local: 'local',
  development: 'development',
  qa: 'qa',
  production: 'production',
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];
