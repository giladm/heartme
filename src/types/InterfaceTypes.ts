// App Interfaces (json to typescript format)
// https://app.quicktype.io/?l=ts or https://jvilk.com/MakeTypes/
export interface BloodTestType {
  bloodTestConfig?: (BloodTestConfigEntity)[] | null;
}
export interface BloodTestConfigEntity {
  name: string;
  threshold: number;
}

export interface InputBloodTestType {
  TestName : string ;
  TestResult : number ;
}