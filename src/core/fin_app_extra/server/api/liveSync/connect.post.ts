import Ably from 'ably';

export default defineEventHandler(async (event) => {
  const { liveSync } = useRuntimeConfig();
  const { ablyKey } = liveSync;
  const req_body = await readBody(event);
  const { clientId } = req_body;

  if (!clientId || !ablyKey)
    return { success: false };

  const ably = new Ably.Rest({ key: ablyKey });
  const tokenDetails = await ably.auth.requestToken({
    clientId,
    capability: {
      greeting: ['publish', 'subscribe'],
      '*': ['subscribe'],
    },
  });

  return tokenDetails;
});
