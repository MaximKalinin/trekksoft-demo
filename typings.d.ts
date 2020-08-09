declare module "*.svg" {
  const resource: string;
  export default resource;
}

declare module "*.less" {
  const resource: { [key: string]: string };
  export default resource;
}
