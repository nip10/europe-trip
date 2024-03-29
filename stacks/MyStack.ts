import { Cron, StackContext } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  new Cron(stack, "Cron", {
    schedule: "cron(0 9 * * ? *)",
    job: "functions/lambda.main",
  });
}
