import { createParamDecorator } from "@nestjs/common";
import { User } from "src/user/user.entity";

const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});