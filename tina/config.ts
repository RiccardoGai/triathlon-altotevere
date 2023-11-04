import { defineConfig } from 'tinacms';
import Global from './collections/global';
import Page from './collections/page';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN, // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public'
    }
  },
  schema: {
    collections: [Global, Page]
  }
});
