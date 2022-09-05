import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(() => {
  return {
    id: "1",
    name: "gg",
  };
});