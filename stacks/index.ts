import { App } from "@serverless-stack/resources";
import { MyStack } from "./MyStack";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
    environment: {
      UNSPLASH_API_ACCESS_KEY: process.env.UNSPLASH_API_ACCESS_KEY as string,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
      EMAIL_ADDRESS_1: process.env.EMAIL_ADDRESS_1 as string,
      EMAIL_ADDRESS_2: process.env.EMAIL_ADDRESS_2 as string,
      EMAIL_ADDRESS_3: process.env.EMAIL_ADDRESS_3 as string,
    },
  });
  app.stack(MyStack);
}
