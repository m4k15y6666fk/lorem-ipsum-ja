
window.addEventListener('DOMContentLoaded', async _ => {
    console.log("loaded");

    const response = await fetch("source/a.txt");
    localStorage.setItem('original text', await response.text());

    const textarea = document.querySelector('#text-area');
    const text = document.querySelector('#select-text');
    //document.querySelector('#select-text').addEventListener('change', (e) => {
    //    textarea.style.borderColor = "none";
    //    const response = await fetch(e.target.value);
    //    localStorage.setItem('original text', await response.text());
    //});
    document.querySelector('#select-newline').addEventListener('change', (e) => {
        textarea.setAttribute("class", "");
        if (e.target.value == "true") {
            textarea.textContent = localStorage.getItem('original text');
        } else {
            textarea.textContent = localStorage.getItem('original text').replace(/\n/g, '');
        }
    });

    document.querySelector('#copy-button').addEventListener('click', async _ => {
        textarea.setAttribute("class", "");
        navigator.clipboard.writeText(textarea.textContent)
        .then(_ => {
            textarea.classList.add("copy-success");
        })
        .catch(_ => {
            textarea.classList.add("copy-error");
        });
    });
    document.querySelector('#download-button').addEventListener('click', _ => {
        const file = new File([textarea.textContent], text.value, {
            type: "text/plain",
        });

        const _a = document.createElement('a');
        _a.href = URL.createObjectURL(file);
        _a.setAttribute("download", text.value);
        _a.click();
    });
});