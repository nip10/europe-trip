import { createApi } from "unsplash-js";
import * as nodeFetch from "node-fetch";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY as string,
  fetch: (nodeFetch.default as unknown) as typeof fetch,
});

const cities = ["prague", "vienna", "budapest"];

const dayOfTrip = new Date("2022-09-14");

export async function main() {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const photo = await unsplash.search.getPhotos({
    query: randomCity,
    page: 1,
    perPage: 1,
  });

  const dateDiff = dayOfTrip.getTime() - new Date().getTime();
  const daysLeft = Math.ceil(dateDiff / (1000 * 3600 * 24));

  const msg: sgMail.MailDataRequired = {
    // to: ['alex.portugal.teixeira@gmail.com', 'rimps.1995@gmail.com'],
    to: "diogocardoso92@outlook.com",
    from: "hello@diogocardoso.dev",
    subject: `Faltam ${daysLeft} dias para a viagem!`,
    templateId: "d-b442e32459c74f9288823f02c1f927c4",
    dynamicTemplateData: {
      subject: `Faltam ${daysLeft} dias para a viagem!`,
      city: randomCity,
      daysLeft,
      photoUrl: photo.response?.results[0].urls.regular,
    },
  };

  await sgMail.send(msg);

  return {};
}
