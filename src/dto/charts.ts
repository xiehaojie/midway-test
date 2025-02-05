// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';

export class ChartsConfigDTO {
  @Rule(RuleType.number().default(400))
  width: number;
  @Rule(RuleType.number().default(800))
  height: number;
  @Rule(RuleType.number().default(5))
  version: number;
  @Rule(RuleType.string().required())
  tempType: string;
  @Rule(RuleType.number().required())
  showLabel: number;
  @Rule(RuleType.required())
  chartConfig: any;
}
