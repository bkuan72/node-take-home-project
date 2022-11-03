export class Util {

static hasProperty = (obj: any, prop: string): boolean => {
    let found = false;
    for (const key in obj) {
      if (key === prop) {
        found = true;
      }
    }
    return found;
  };
}

export default Util;