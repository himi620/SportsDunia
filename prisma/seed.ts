import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
 
  const maharashtra = await prisma.state.create({
    data: { name: 'Maharashtra' },
  });


  const mumbai = await prisma.city.create({
    data: { name: 'Mumbai', stateId: maharashtra.id },
  });


  const college = await prisma.college.create({
    data: {
      name: 'Mumbai University',
      score: 850,
      cityId: mumbai.id,
      stateId: maharashtra.id,
    },
  });


  await prisma.collegePlacement.createMany({
    data: [
      {
        collegeId: college.id,
        year: 2023,
        highestPlacement: 2500000,
        averagePlacement: 800000,
        medianPlacement: 750000,
        placementRate: 92.5,
      },
      {
        collegeId: college.id,
        year: 2022,
        highestPlacement: 2200000,
        averagePlacement: 750000,
        medianPlacement: 700000,
        placementRate: 89.0,
      },
    ],
  });

  await prisma.collegeWiseCourse.createMany({
    data: [
      {
        collegeId: college.id,
        courseName: 'Computer Science',
        courseDuration: 4,
        courseFee: 400000,
      },
      {
        collegeId: college.id,
        courseName: 'Mechanical Engineering',
        courseDuration: 4,
        courseFee: 350000,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
