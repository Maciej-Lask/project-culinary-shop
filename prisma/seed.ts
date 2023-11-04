import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      title: 'Knife-1',
      price: 20,
      description: 'High-quality knife for all your cooking needs',
      image: 'knife-1.png',
    },
    {
      title: 'Knife-2',
      price: 25,
      description: 'Premium knife for professional chefs',
      image: 'knife-2.png',
    },
    {
      title: 'Knife-3',
      price: 15,
      description: 'Versatile utility knife for your kitchen',
      image: 'knife-3.png',
    },
    {
      title: 'Pot-1',
      price: 30,
      description: 'Durable and spacious cooking pot with lid',
      image: 'pot-1.png',
    },
    {
      title: 'Pot-2',
      price: 35,
      description: 'Non-stick saucepan for easy cooking and cleaning',
      image: 'pot-2.png',
    },
    {
      title: 'Pot-3',
      price: 28,
      description: 'Stainless steel stockpot for soups and stews',
      image: 'pot-3.png',
    },
    {
      title: 'Pan-1',
      price: 22,
      description: 'Frying pan with a non-stick surface for perfect frying',
      image: 'pan-1.png',
    },
    {
      title: 'Pan-2',
      price: 18,
      description: 'Cast iron skillet for searing and baking',
      image: 'pan-2.png',
    },
    {
      title: 'Pan-3',
      price: 24,
      description: 'Wok pan for stir-frying and Asian cuisine',
      image: 'pan-3.png',
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
  await db.user.deleteMany();
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
