import Ably from 'ably';

export default defineNuxtPlugin(async () => {
  const clientId = ref('client-1');
  const ably = new Ably.Realtime({
    authUrl: `/api/liveSync/connect`,
    authParams: { clientId: clientId.value },
    authMethod: 'POST',
    autoConnect: false,
  });
  ably.connection
    .once('connected')
    .then((abx) => {
      connected.value = true;
      console.log('Connected to Ably.', ably.auth.clientId, abx)
    });

  let connected = ref(false);
  let openConnection = false;
  function getAbly() {
    if (!openConnection && !connected.value) {
      openConnection = true;
      connected.value = true;
      ably.connect();
    }

    return ably;
  }

  function disconnect() {
    ably.close();
    connected.value = false;
    openConnection = false;
  }

  // function runLiveSyncClient(
  //   channelName: string,
  //   eventName: string,
  //   unsubPromise: Promise<void>,
  //   onMessage: (message: any) => Promise<void>,
  // ) {
  //   const ably = getAbly();
  //   const channel = ably.channels.get(channelName);
  //   channel.subscribe(eventName, onMessage);
  //   unsubPromise.then(() => channel.unsubscribe(eventName));
  // }

  const liveSync = { connected, getAbly, disconnect };

  return {
    provide: {
      liveSync,
    },
  };
});
