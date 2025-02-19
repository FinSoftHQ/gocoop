const liveSyncStore = defineStore('app-live-sync-store', () => {
  const _liveSync = useNuxtApp().$liveSync as any;

  const ably = ref<any>();
  const connected = ref(false);

  watch(_liveSync?.connected, (val) => {
    connected.value = val;
  });

  function connect() {
    if (!_liveSync) return;
    ably.value = _liveSync.getAbly();
    connected.value = _liveSync.connected.value;
  }

  function disconnect() {
    if (!_liveSync) return;
    _liveSync.disconnect();
  }

  return { ably, connected, connect, disconnect };
});

function liveSyncSubscriptionStore(channel: string, eventName: string) {
  const useSubscriptionStore = defineStore(`live-subx-${channel}`, () => {
    const liveStore = liveSyncStore();
    const { ably, connected } = storeToRefs(liveStore);

    const messageReceived = ref<any>();

    function onMessage(message: any) {
      if (!message) return;
      messageReceived.value = message;
    }

    function subscribe() {
      liveStore.connect();
      if (!ably.value) return;
      const channel2sub = ably.value.channels.get(channel);
      channel2sub.subscribe(eventName, onMessage);
    }
    subscribe();

    function ensureConnection() {
      if (!connected.value) {
        subscribe();
      }
    }

    const message2send = ref<any>();
    const body = computed(() => ({
      name: eventName,
      channel,
      data: message2send.value,
    }));
    const { execute } = useFetch('/api/liveSync/publish', {
      method: 'POST',
      body,
    });
    function publish(message: any) {
      if (!message) return;
      message2send.value = message;
    }

    function disconnect() {
      liveStore.disconnect();
    }

    return { messageReceived, connected, publish, disconnect, ensureConnection };
  });

  return useSubscriptionStore();
}

export function useLiveSync(channel: string, eventName: string) {
  const subStore = liveSyncSubscriptionStore(channel, eventName);

  const { messageReceived, connected } = storeToRefs(subStore);
  const publish = subStore.publish;
  const disconnect = subStore.disconnect;

  if (!connected.value) {
    subStore.ensureConnection();
  }

  return { messageReceived, connected, publish, disconnect };
}