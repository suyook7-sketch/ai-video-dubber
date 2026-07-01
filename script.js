const videoInput = document.getElementById("video");
const lang = document.getElementById("lang");
const voice = document.getElementById("voice");
const status = document.getElementById("status");

videoInput.addEventListener("change", () => {
    if(videoInput.files.length > 0){
        status.innerHTML = "📁 Selected: " + videoInput.files[0].name;
    }
});

async function startDub(){

    if(videoInput.files.length === 0){
        alert("Please select a video");
        return;
    }

    status.innerHTML = "⏳ Uploading video...";

    const formData = new FormData();
    formData.append("video", videoInput.files[0]);
    formData.append("language", lang.value);
    formData.append("voice", voice.value);

    try{

        const response = await fetch(
            "https://ai-video-dubber-api.sdrama679.workers.dev/",
            {
                method:"POST",
                body:formData
            }
        );

        const data = await response.json();

        status.innerHTML =
        "✅ " + (data.message || "Request sent successfully");

    showProgress();
        
    }catch(error){

        status.innerHTML =
        "❌ Error: " + error.message;

    }

}

// ===== Version 3 =====

// Video Preview
videoInput.addEventListener("change", () => {
  if (videoInput.files.length > 0) {
    const preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(videoInput.files[0]);
    preview.style.display = "block";
  }
});

// Progress Bar
function showProgress() {
  const progress = document.getElementById("progress");
  const bar = document.getElementById("bar");
  const downloadBtn = document.getElementById("downloadBtn");

  progress.style.display = "block";
  downloadBtn.style.display = "none";
  bar.value = 0;

  let value = 0;

  const timer = setInterval(() => {
    value += 10;
    bar.value = value;

    if (value >= 100) {
      clearInterval(timer);
      status.innerHTML = "✅ Dubbing Completed!";
      downloadBtn.style.display = "block";
    }
  }, 500);
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  alert("⬇️ Download feature will come in Version 4.");
});
