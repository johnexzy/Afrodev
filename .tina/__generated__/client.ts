import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '9083485891522c33afc237d1252d8a1a1744317b', queries });
export default client;
  