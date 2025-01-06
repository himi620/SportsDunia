import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CollegeService {
  constructor(private prisma: PrismaService) {}

  async getCollegePlacementData(collegeId: number) {
    // average
    const avgSection = await this.prisma.$queryRaw`
    SELECT 
      year,
      AVG("highestPlacement") as avg_highest_placement,
      AVG("averagePlacement") as avg_average_placement,
      AVG("medianPlacement") as avg_median_placement,
      AVG("placementRate") as avg_placement_rate
    FROM "college_placements"
    WHERE "collegeId" = ${collegeId}
      AND "highestPlacement" > 0
      AND "averagePlacement" > 0
      AND "medianPlacement" > 0
      AND "placementRate" > 0
    GROUP BY year
    ORDER BY year DESC
  `;

    // placement data 
    const placements = await this.prisma.collegePlacement.findMany({
      where: {
        collegeId,
        AND: [
          { highestPlacement: { gt: 0 } },
          { averagePlacement: { gt: 0 } },
          { medianPlacement: { gt: 0 } },
          { placementRate: { gt: 0 } },
        ],
      },
      orderBy: { year: 'desc' },
    });

    // placement 
    const placementSection = placements.map((placement, index) => {
      let placementTrend = null;
      if (index < placements.length - 1) {
        placementTrend =
          placement.placementRate > placements[index + 1].placementRate
            ? 'UP'
            : 'DOWN';
      }
      return { ...placement, placementTrend };
    });

    return {
      avgSection,
      placementSection,
    };
  }

  async getCollegeCourses(collegeId: number) {
    return this.prisma.collegeWiseCourse.findMany({
      where: { collegeId },
      orderBy: { courseFee: 'desc' },
    });
  }

  async getColleges(city?: string, state?: string) {
    const where: any = {};

    if (city) {
      where.city = {
        name: {
          equals: city,
          mode: 'insensitive',
        },
      };
    }

    if (state) {
      where.state = {
        name: {
          equals: state,
          mode: 'insensitive',
        },
      };
    }

    return this.prisma.college.findMany({
      where,
      include: {
        city: true,
        state: true,
      },
      orderBy: { score: 'desc' },
    });
  }
}
