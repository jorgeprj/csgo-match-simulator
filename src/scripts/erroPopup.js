document.addEventListener("DOMContentLoaded", async function  () {
    popupContainer.addEventListener("click", function (event) {
        if (event.target === popupContainer) {
            popupContainer.style.display = "none";
        }
    });

    document.querySelector("#close2").addEventListener("click", function(){
        document.querySelector(".popupContainer").style.display = "none";
    });
});