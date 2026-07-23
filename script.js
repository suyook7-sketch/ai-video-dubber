const videoInput = document.getElementById("video");
const lang = document.getElementById("lang");
const voice = document.getElementById("voice");
const mode = document.getElementById("mode");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");
const subtitleBtn = document.getElementById("subtitleBtn");

async function startDub() {

    if (videoInput.files.length === 0) {
        alert("Please select a video");
        return;
    }

    status.innerHTML = "⏳ Uploading...";

    const formData = new FormData();
    formData.append("video", videoInput.files[0]);
    formData.append("language", lang.value);
    formData.append("voice", voice.value);
    formData.append("mode", mode.value);

    try {

        const response = await fetch(
            "https://suyook-ai-video-dubber-api-new.hf.space/dub",
            {
                method: "POST",
                body: formData
            }
        );

        const text = await response.text();

        if (!response.ok) {
        throw new Error(text);
        }

        const data = JSON.parse(text);

        status.innerHTML = "✅ " + data.message;
        
        if (data.video) {
    downloadBtn.style.display = "block";
    downloadBtn.innerHTML = "⬇️ Download Dubbed Video";

    downloadBtn.onclick = () => {
        window.open(
            "https://suyook-ai-video-dubber-api-new.hf.space" + data.video,
            "_blank"
        );
    };
}
        if (data.subtitle) {
    subtitleBtn.style.display = "block";
    subtitleBtn.innerHTML = "📄 Download Subtitle";

    subtitleBtn.onclick = () => {
        window.open(
            "https://suyook-ai-video-dubber-api-new.hf.space" + data.subtitle,
            "_blank"
        );
    };
}

    } catch (err) {
        status.innerHTML = "❌ " + err.message;
    }
}
