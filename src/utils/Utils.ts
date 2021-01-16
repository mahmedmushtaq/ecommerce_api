import slug from "slug";
import randomstring from "randomstring";

class Utils {
  static generateSlug(value: string) {
    const randomNum = randomstring.generate({ length: 4, charset: "numeric" });
    return slug(value) + "-" + randomNum;
  }
}

export default Utils;
