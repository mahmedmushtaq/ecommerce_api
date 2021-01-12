import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
  accountType: "user" | "admin" | "seller";
}

class JWT {
  constructor() {}

  async generateJWt({ id, email, accountType }: UserPayload) {
    const signJWT = await jwt.sign(
      {
        id,
        email,
        accountType,
      },
      process.env!.JWT_SECRET!
    );

    return signJWT;
  }

  verifyJwt(jwtToken: string) {
    try {
      const payload = jwt.verify(
        jwtToken,
        process.env!.JWT_SECRET!
      ) as UserPayload;

      return payload;
    } catch (err) {}
    return "";
  }
}

const jwtReference = new JWT();

export default jwtReference;
