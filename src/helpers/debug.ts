export class Debug {
  constructor() {

  }
  public static log(message?: any, ...optionalParams: any[]) {
    if (optionalParams) {
      console.log(message, optionalParams);
    }
    else {
      console.log(message);
    }
  }

}
