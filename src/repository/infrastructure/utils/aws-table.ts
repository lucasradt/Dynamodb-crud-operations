export function getTableSuffix(): string {
  const { ENV, ENV_REPOSITORY } = process.env;
  if (ENV && ENV_REPOSITORY === "true") {
    return `-${ENV}`;
  }
  return ``;
}
