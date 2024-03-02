declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NEXTAUTH_URL: string;
    NEXT_PUBLIC_REQUEST_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  }
}
