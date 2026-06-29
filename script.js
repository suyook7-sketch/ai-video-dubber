const videoInput = document.getElementById("video");
const lang = document.getElementById("lang");
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

    }catch(error){

        status.innerHTML =
        "❌ Error: " + error.message;

    }

}
