export function configure() {
  const { REGION, DYNAMO_ENDPOINT } = process.env;
  return {
    endpoint: DYNAMO_ENDPOINT,
    region: REGION,
  };
}
