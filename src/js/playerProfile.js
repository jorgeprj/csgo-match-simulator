document.addEventListener("DOMContentLoaded", async function () {
    const responsePlayers = await fetch("/src/database/players.json");
    const players = await responsePlayers.json();

    const response = await fetch("/src/database/teams.json");
    const teams = await response.json();

    function addClickEventToPlayerElements() {
        const playerElements = document.querySelectorAll(".player");
        playerElements.forEach(playerElement => {
            playerElement.addEventListener("click", function () {
                const stringPlayerId = this.getAttribute("data-player-id");
                const playerId = parseInt(stringPlayerId, 10);
                const player = players.find(player => player.id === playerId);

                const flagImage = document.createElement("img");
                flagImage.className = "flag";
                const flagImagePath = `./assets/flags/${player.country}.png`;
                flagImage.src = flagImagePath;
                
                document.getElementById("playerSkills").textContent = player.skills;
                if (player.skills > 80){
                    playerSkills.style.color = '#19a914';
                }else if(player.skills < 80){
                    playerSkills.style.color = '#49d184';
                }

                document.getElementById("playerNickname").textContent = player.nickname;
                
                const popupNameElement = document.getElementById("playerName");
                popupNameElement.textContent = "";
                popupNameElement.appendChild(flagImage);
                popupNameElement.appendChild(document.createTextNode(player.name));

                document.getElementById("playerAge").textContent = player.age;

                const teamId = findTeamIdByPlayerId(playerId);
                if (teamId !== null) {
                    const team = teams.find(team => team.id === teamId);
                    if (team !== undefined) {
                        const logoImage = document.createElement("img");
                        logoImage.className = "smallTeamLogo";
                        const logoImagePath = `./assets/teams/${teamId}.png`;
                        logoImage.src = logoImagePath;
                        
                        const popupTeamElement = document.getElementById("playerTeam");
                        popupTeamElement.textContent = "";
                        popupTeamElement.appendChild(logoImage);
                        popupTeamElement.appendChild(document.createTextNode(team.name));
                    }
                }

                const playerImage = document.getElementById("playerImage");
                playerImage.src = `./assets/players/${player.id}.png`;

                document.getElementById("playerPopupContainer").style.display = "block";
                document.getElementById("playerPopup").style.display = "block";
                
            });
        });
    }

    function findTeamIdByPlayerId(playerId) {
        for (const team of teams) {
            if (team.roster.includes(playerId)) {
                return team.id;
            }
        }
        return null;
    }

    playerPopupContainer.addEventListener("click", function (event) {
        if (event.target === playerPopupContainer) {
            playerPopupContainer.style.display = "none";
        }
    });

    document.querySelector("#close").addEventListener("click", function(){
        document.querySelector(".playerPopup-container").style.display = "none";
    });

    addClickEventToPlayerElements();
});