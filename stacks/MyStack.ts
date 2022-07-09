import { Cron, StackContext } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  new Cron(stack, "Cron", {
    schedule: "rate(2 minutes)",
    job: "functions/lambda.main",
  });
}
