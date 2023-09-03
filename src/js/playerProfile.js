document.addEventListener("DOMContentLoaded", async function () {
    const responsePlayers = await fetch("/src/database/players.json");
    const players = await responsePlayers.json();
    
    function addClickEventToPlayerElements() {
        const playerElements = document.querySelectorAll(".player");
        playerElements.forEach(playerElement => {
            playerElement.addEventListener("click", function () {
                const stringPlayerId = this.getAttribute("data-player-id");
                const playerId = parseInt(stringPlayerId, 10);
                const player = players.find(player => player.id === playerId);
                
                // Preencher o popup com as informações do jogador
                document.getElementById("popupSkills").textContent = player.skills;
                document.getElementById("popupName").textContent = player.name;
                document.getElementById("popupNickname").textContent = player.nickname;
                document.getElementById("popupAge").textContent = player.age;
                document.getElementById("popupCountry").textContent = player.country;

                const playerImage = document.getElementById("playerImage");
                playerImage.src = `./assets/players/${player.id}.png`;

                // Exibir o popup
                document.getElementById("playerPopup").style.display = "block";

                if (player.skills > 80){
                    popupSkills.style.color = '#19a914';
                }else if(player.skills < 80){
                    popupSkills.style.color = '#49d184';
                }
                    
            });
        });
    }

    document.querySelector("#close2").addEventListener("click", function(){
        document.querySelector("#playerPopup").style.display = "none";
    });

    addClickEventToPlayerElements();
});