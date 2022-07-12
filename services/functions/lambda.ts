import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";
import sgMail from "@sendgrid/mail";

const {
  EMAIL_ADDRESS_1,
  EMAIL_ADDRESS_2,
  EMAIL_ADDRESS_3,
  SENDGRID_API_KEY,
  UNSPLASH_API_ACCESS_KEY,
} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY as string);

const unsplash = createApi({
  accessKey: UNSPLASH_API_ACCESS_KEY as string,
  fetch: nodeFetch.default as unknown as typeof fetch,
});

const cities = ["Prague", "Vienna", "Budapest"];

const dayOfTrip = new Date("2022-09-14");

export async function main() {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const photo = await unsplash.photos.getRandom({
    query: randomCity,
  });

  const dateDiff = dayOfTrip.getTime() - new Date().getTime();
  const daysLeft = Math.ceil(dateDiff / (1000 * 3600 * 24));

  const msg: sgMail.MailDataRequired = {
    to: [
      EMAIL_ADDRESS_1 as string,
      EMAIL_ADDRESS_2 as string,
      EMAIL_ADDRESS_3 as string,
    ],
    from: "hello@diogocardoso.dev",
    templateId: "d-b442e32459c74f9288823f02c1f927c4",
    dynamicTemplateData: {
      subject: `Faltam ${daysLeft} dias para a viagem! ✈`,
      city: randomCity,
      daysLeft,
      // @ts-ignore
      photoUrl: photo.response?.urls.regular,
    },
  };

  await sgMail.send(msg);

  return {};
}
