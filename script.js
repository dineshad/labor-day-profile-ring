const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      drawProfileWithFrame(img);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

function drawProfileWithFrame(profileImg) {
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Draw white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, size, size);

  // Draw profile picture in a circle
  const center = size / 2;
  const radius = center - 60;

  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(profileImg, center - radius, center - radius, radius * 2, radius * 2);
  ctx.restore();

  // Load and draw the Labour Day themed frame
  const frame = new Image();
  frame.onload = () => {
    ctx.drawImage(frame, 0, 0, size, size);
  };
  frame.src = "frame.png"; // Replace with your actual frame path
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "labour-day-profile.png";
  link.href = canvas.toDataURL();
  link.click();
}
