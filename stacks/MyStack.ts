import { Cron, StackContext } from "@serverless-stack/resources";

export function MyStack(this: any, { stack }: StackContext) {
  new Cron(this, "Cron", {
    schedule: "rate(1 hour)",
    job: "src/lambda.main",
  });
}
