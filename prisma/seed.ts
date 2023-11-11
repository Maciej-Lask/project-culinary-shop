import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      title: 'Knife-1',
      price: 20,
      description:
        'High-quality knife crafted from premium stainless steel. Ideal for all your culinary needs, from slicing to dicing and chopping.',
      image: 'knife-1.png',
    },
    {
      title: 'Knife-2',
      price: 25,
      description:
        'Exceptional premium knife designed for professional chefs. Precision and durability make it the perfect tool for culinary mastery.',
      image: 'knife-2.png',
    },
    {
      title: 'Knife-3',
      price: 15,
      description:
        'Versatile utility knife, an essential in every kitchen. Its ergonomic design ensures comfort, making it suitable for various tasks.',
      image: 'knife-3.png',
    },
    {
      title: 'Pot-1',
      price: 30,
      description:
        'Durable and spacious cooking pot with a secure-fitting lid. Crafted for versatile cooking, from simmering soups to boiling pasta.',
      image: 'pot-1.png',
    },
    {
      title: 'Pot-2',
      price: 35,
      description:
        'Non-stick saucepan for effortless cooking and easy cleaning. Its sleek design and advanced coating make it a kitchen essential.',
      image: 'pot-2.png',
    },
    {
      title: 'Pot-3',
      price: 28,
      description:
        'Stainless steel stockpot, perfect for simmering hearty soups and stews. A must-have for home cooks who value both style and function.',
      image: 'pot-3.png',
    },
    {
      title: 'Pan-1',
      price: 22,
      description:
        "Frying pan with a non-stick surface for perfect frying results. Whether you're searing meats or cooking delicate omelets, this pan delivers.",
      image: 'pan-1.png',
    },
    {
      title: 'Pan-2',
      price: 18,
      description:
        'Cast iron skillet for searing, baking, and more. The even heat distribution ensures consistent results with every culinary creation.',
      image: 'pan-2.png',
    },
    {
      title: 'Pan-3',
      price: 24,
      description:
        'Wok pan for stir-frying and mastering Asian cuisine. Its wide surface and high sides make it the go-to choice for flavorful stir-fry dishes.',
      image: 'pan-3.png',
    },
    {
      title: 'Baking Set-1',
      price: 40,
      description:
        'Complete baking set featuring a variety of molds and tools. From cakes to cookies, this set equips you for all your baking adventures.',
      image: 'baking-set-1.jpg',
    },
    {
      title: 'Grill-1',
      price: 50,
      description:
        'Premium grill pan for indoor and outdoor grilling. Achieve perfect grill marks on your favorite meats and vegetables, any time of the year.',
      image: 'grill-1.jpg',
    },
  ];
}
function getUsers() {
  return [
    {
      id: 'test',
      email: 'test@example.com',
      role: Role.USER,
      password: {
        create: {
          hashedPassword:
            '$2a$10$plZkxTiqsbS.rcwbCo8jNO/Fg1u0VsD9yucUiPE/KYppflR301dmq',
        },
      },
    },
    {
      email: 'user1@example.com',
      role: Role.USER,
      password: {
        create: {
          hashedPassword:
            '$2a$10$plZkxTiqsbS.rcwbCo8jNO/Fg1u0VsD9yucUiPE/KYppflR301dmq',
        },
      },
    },
    {
      email: 'user2@example.com',
      role: Role.ADMIN,
      password: {
        create: {
          hashedPassword:
            '$2a$10$beaXjC2PuvXK7NboaamcVeQmvlrkHmdbOAKjKTTsH5UVygLubFvLq',
        },
      },
    },
  ];
}

async function seed() {
  await db.product.deleteMany();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    })
  );
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: user,
      });
    }),
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
