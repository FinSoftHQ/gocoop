<template>
  <div class="relative w-full max-w-md mx-auto flex flex-col">
    <div
      v-if="!capturedImage"
      class="relative flex-grow overflow-hidden"
    >
      <video
        ref="videoElement"
        :srcObject="stream"
        autoplay
        playsinline
        class="absolute top-0 left-0 w-full h-full object-contain"
        @loadedmetadata="setupCanvas"
      ></video>

      <canvas
        ref="canvasElement"
        class="absolute top-0 left-0 w-full h-full opacity-0"
      ></canvas>

      <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
        <UButton
          v-if="hasCamera"
          @click="capturePhoto"
          icon="i-mdi-camera"
          color="white"
          variant="solid"
          square
          :ui="{ rounded: 'rounded-full' }"
        >
        </UButton>

        <UButton
          v-if="hasCamera"
          @click="switchCamera"
          icon="i-mdi-camera-flip"
          color="white"
          variant="solid"
          square
          :ui="{ rounded: 'rounded-full' }"
        >
        </UButton>
      </div>
    </div>

    <div
      v-else
      class="flex-grow flex flex-col"
    >
      <img
        :src="capturedImage"
        alt="Captured Photo"
        class="w-full h-full object-contain"
      />
      <div class="flex justify-around p-4">
        <button
          @click="retakePhoto"
          class="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Retake
        </button>
        <button
          @click="confirmPhoto"
          class="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserMedia } from '@vueuse/core'

const emits = defineEmits(['photoTaken']);

// Types
type CameraType = 'user' | 'environment'
const {
  videoInputs: cameras,
  // ensurePermissions,
  // permissionGranted,
} = useDevicesList({ requestPermissions: true });

// Reactive references
const videoElement = ref<HTMLVideoElement | null>(null)
const canvasElement = ref<HTMLCanvasElement | null>(null)
const capturedImage = ref<string | null>(null)
const hasCamera = ref(false)
const currentCameraType = ref<CameraType>('environment')
const currentCameraIndex = ref(0);

// const currentCamera = computed(() => cameras.value[currentCameraIndex.value]?.deviceId);

// Use vueuse to handle user media
const { stream, start, stop } = useUserMedia({
  constraints: {
    video: reactive({
      facingMode: currentCameraType,
      width: { ideal: 720 },
      height: { ideal: 720 }
    }),
    audio: false
  }
})

// Camera setup function
async function setupCamera(cameraType: CameraType = 'environment', cameraIndex = 0) {
  stop()
  currentCameraType.value = cameraType
  currentCameraIndex.value = cameraIndex
  await start()
  if (videoElement.value && !!stream.value) {
    videoElement.value.srcObject = stream.value
  }
  hasCamera.value = !!stream.value
}

// Switch camera method
async function switchCamera() {
  const newCameraType = currentCameraType.value === 'environment' ? 'user' : 'environment'
  const currentIndex = currentCameraIndex.value;
  const cameraLength = cameras.value.length;
  const newCameraIndex = cameraLength > 1 ? (currentIndex + 1) % cameraLength : 0;
  await setupCamera(newCameraType, newCameraIndex)
}

// Setup canvas to match video dimensions
function setupCanvas() {
  if (videoElement.value && canvasElement.value) {
    const video = videoElement.value
    const canvas = canvasElement.value

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
  }
}

// Capture photo method
function capturePhoto() {
  if (videoElement.value && canvasElement.value) {
    const video = videoElement.value
    const canvas = canvasElement.value
    const context = canvas.getContext('2d')

    // Draw current video frame to canvas
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to image
    capturedImage.value = canvas.toDataURL('image/jpeg')
  }
}

// Retake photo method
function retakePhoto() {
  capturedImage.value = null
}

// Confirm photo method (implement your upload/save logic)
function confirmPhoto() {
  if (capturedImage.value) {
    // console.log('Taking photo:', capturedImage.value);
    emits('photoTaken', capturedImage.value);
  }
}

// Lifecycle hooks
onMounted(async () => {
  await setupCamera()
})

onUnmounted(() => {
  stop()
})
</script>
