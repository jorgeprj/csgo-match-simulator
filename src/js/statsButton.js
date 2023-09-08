document.addEventListener("DOMContentLoaded", async function  () {
    const statsButton = document.getElementById("statsButton");

    statsButton.addEventListener("click", function () {
        statsPopupContainer.style.display = "flex";
    });

    statsPopupContainer.addEventListener("click", function (event) {
        if (event.target === statsPopupContainer) {
            statsPopupContainer.style.display = "none";
        }
    });

    document.querySelector("#close3").addEventListener("click", function(){
        document.querySelector(".statsPopupContainer").style.display = "none";
    });
});