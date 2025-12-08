// Button they press to allow permission
const button = document.getElementById("permission-button");

// Allows the extension access to user's microphone
button.addEventListener("click", () => {
    let microphone = navigator.mediaDevices.getUserMedia({ audio: true });
    microphone.then((microphone) => stopTrack(microphone));
});

// This stops the recording immediately after user grants permission
// because it isn't needed here
function stopTrack(device) {
    console.log(device.getTracks()[0]);
    device.getTracks()[0].stop();
}
