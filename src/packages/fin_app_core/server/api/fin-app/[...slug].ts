import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const { baseURL } = useRuntimeConfig().apiServer;
  const path = event.path;
  const url = joinURL(baseURL, path);

  return proxyRequest(event, url);
});