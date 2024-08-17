// global.d.ts ou src/global.d.ts
declare module "*.css" {
    const content: string;
    export default content;
  }
  