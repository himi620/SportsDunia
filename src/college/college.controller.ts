import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CollegeService } from './college.service';

@UseGuards(JwtGuard)
@Controller()
export class CollegeController {
  constructor(private collegeService: CollegeService) {}

  @Get('college_data/:collegeId')
  getCollegePlacementData(@Param('collegeId') collegeId: string) {
    return this.collegeService.getCollegePlacementData(parseInt(collegeId));
  }

  @Get('college_courses/:collegeId')
  getCollegeCourses(@Param('collegeId') collegeId: string) {
    return this.collegeService.getCollegeCourses(parseInt(collegeId));
  }

  @Get('colleges')
  getColleges(@Query('city') city?: string, @Query('state') state?: string) {
    return this.collegeService.getColleges(city, state);
  }
}
