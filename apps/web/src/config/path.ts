import { Path } from '@src/router.ts';

export const OPENAI_API_KEY_REQUIRED: Path[] = ['/'];
export const PRIVATE_PATH: Path[] = ['/logout', '/projects', '/projects/:slug'];
export const PUBLIC_PATH: Path[] = ['/', '/login'];
