const notes = document.getElementById("notes");
const clearButton = document.getElementById("clear");
const exportButton = document.getElementById("export");
const importInput = document.getElementById("import");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const strikeButton = document.getElementById("strike");
const underlineButton = document.getElementById("underline");


notes.addEventListener("input", () => {
    localStorage.setItem("notepad", notes.innerHTML);
});


window.onload = () => {
    notes.innerHTML = localStorage.getItem("notepad") || "";
};


clearButton.addEventListener("click", () => {
    notes.innerHTML = "";
    localStorage.removeItem("notepad");
});

exportButton.addEventListener("click", () => {
    const blob = new Blob([notes.innerText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.txt";
    link.click();
});


importInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
            notes.innerText = e.target.result;
            localStorage.setItem("notepad", notes.innerHTML);
        };
        reader.readAsText(file);
    } else {
        alert("Please upload a valid .txt file!");
    }
});


function wrapText(command, value = null) {
    document.execCommand(command, false, value);
}

boldButton.addEventListener("click", () => wrapText("bold"));
italicButton.addEventListener("click", () => wrapText("italic"));
strikeButton.addEventListener("click", () => wrapText("strikeThrough"));
underlineButton.addEventListener("click", () => wrapText("underline"));


notes.addEventListener("input", () => {
    const text = notes.value;
    notes.style.color = "#ffffff";

    const links = notes.querySelectorAll("a");
    links.forEach((link) => {
        link.style.color = "purple";
        link.style.textDecoration = "underline";
        link.style.fontStyle = "italic";
        link.target = "_blank";
    });
});

