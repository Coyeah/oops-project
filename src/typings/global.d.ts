declare const MOCK_ENV: string;
declare const INITIAL_SITE_INFO:
  | {
      title: string;
      name: string;
      author: string;
      owner: string;
      description: string;
      repo: string;
      licenses: string;
      since: number;
    }
  | AnyObject;

declare module 'parallax-js';
