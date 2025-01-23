// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class WeatherDTO {
  @Rule(RuleType.string().required())
  cityId: string;
}
