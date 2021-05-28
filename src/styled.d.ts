// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mq: {
      xs: string;
      s: string;
      "s-down": string;
      m: string;
      "m-down": string;
      l: string;
      xl: string;
      xxl: string;
    };
  }
}
