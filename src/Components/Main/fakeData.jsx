import { faker } from "@faker-js/faker";
const generateContentData = () => {
  const rank = faker.number.int(30);
  const title = faker.lorem.words(3);
  const releaseDate = faker.date.past({ years: 2 }).toDateString();
  const runningTime = faker.number.int({
    min: 70,
    max: 180,
  });
  const posterImage = faker.image.url();

  return {
    rank,
    title,
    releaseDate,
    runningTime,
    posterImage,
  };
};

export const generateContentList = (numberOfContent) => {
  return Array.from({ length: numberOfContent }, generateContentData);
};
