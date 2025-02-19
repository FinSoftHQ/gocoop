import Ably from 'ably';

export default defineEventHandler(async (event) => {
  const { liveSync } = useRuntimeConfig();
  const { ablyKey } = liveSync;
  const req_body = await readBody(event);
  const { name, channel, data } = req_body;

  if (!data)
    return { success: false };

  const ably = new Ably.Rest({ key: ablyKey });
  await ably.channels.get(channel).publish(name, data);

  return { success: true };
});
