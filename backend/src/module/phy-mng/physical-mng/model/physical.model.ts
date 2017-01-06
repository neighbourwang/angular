export class PhysicalModel{
      pmName:string;
      ipAddr: string;
      username: string;
      password: string;
      serverType: string;
      brand: string;
      model: string;
      locale:string;
      description: string;
      hardwareInfo: HardwareInfo;
      enterprise: string;
      department: string;
      startDate: string;
      endDate: string;
      applicant: string;
      priIPAddr: string;
      pubIPAddr:string;
      image: string;
   }

   export class HardwareInfo{
     cpu:CPU;
     memory:Memory;
     disk:Array<Disk>;
   }
   export class CPU{
     spec:string;
     specValue:number;
   }
   export class Memory{
      spec:string;
      specValue:number;
   }

   export class Disk{
      spec:string;
      specValue:number;
   }
