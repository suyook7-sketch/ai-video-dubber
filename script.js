const videoInput = document.getElementById("video");
const lang = document.getElementById("lang");
const voice = document.getElementById("voice");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");

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
        
        if (data.audio) {
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.style.display = "block";

    downloadBtn.onclick = () => {
        window.open(
            "https://suyook-ai-video-dubber-api-new.hf.space" + data.audio,
            "_blank"
        );
    };
}

    } catch (err) {
        status.innerHTML = "❌ " + err.message;
    }
}
