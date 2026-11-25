const openButton = document.querySelector("#open-invitation");
const closeButton = document.querySelector("#close-invitation");
const dialog = document.querySelector("#invitation-dialog");
const video = document.querySelector("#invitation-video");
const status = document.querySelector("#video-status");

openButton.addEventListener("click", async () => {
  status.textContent = "";
  dialog.classList.add("video-dialog--fullscreen");
  if (!dialog.open) {
    dialog.showModal();
  }

  const fullscreenRequest = typeof video.requestFullscreen === "function"
    ? video.requestFullscreen().then(() => true, () => false)
    : Promise.resolve(false);

  let playbackStarted = false;
  try {
    await video.play();
    playbackStarted = true;
  } catch {
    status.textContent = "Add your video at assets/wedding-invitation.mp4 to play it here.";
  }

  const enteredFullscreen = await fullscreenRequest;
  if (playbackStarted && !enteredFullscreen) {
    status.textContent = "Full-screen playback is unavailable in this browser; showing the video in an expanded view.";
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("close", () => {
  video.pause();
  video.currentTime = 0;
  dialog.classList.remove("video-dialog--fullscreen");
});

video.addEventListener("error", () => {
  status.textContent = "The video could not be loaded. Check that assets/wedding-invitation.mp4 exists and is a supported video file.";
});

video.src = "assets/wedding-invitation.mp4";
