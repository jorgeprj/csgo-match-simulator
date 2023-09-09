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
            
                createPlayerSkills(player);
                createPlayerNickname(player);
                createPlayerName(player);
                document.getElementById("playerAge").textContent = player.age;
                createPlayerCurrentTeam(player);

                const playerImage = document.getElementById("playerImage");
                playerImage.src = `./assets/players/${player.id}.png`;

                document.getElementById("playerPopupContainer").style.display = "block";
                document.getElementById("playerPopup").style.display = "block";
                
            });
        });
    }

    function createPlayerSkills(player){
        document.getElementById("playerSkills").textContent = player.skills;
        if (player.skills > 89){
            playerSkills.style.color = 'var(--purple)';
        }
        else if (player.skills > 80){
            playerSkills.style.color = 'var(--green)';
        }else if(player.skills > 70){
            playerSkills.style.color = 'var(--dark-green)';
        }else{
            playerSkills.style.color = 'var(--red)';
        }
    }

    function createPlayerNickname(player){
        const playerNicknameElement = document.getElementById("playerNickname");
        playerNicknameElement.textContent = "";
        const nicknameTextNode = document.createTextNode(player.nickname);
        playerNicknameElement.appendChild(nicknameTextNode);
        const playerIdElement = createPlayerId(player);
        playerNicknameElement.appendChild(playerIdElement);
    }

    function createPlayerId(player){
        const playerIdElement = document.createElement("span");
        playerIdElement.classList.add("playerId");
        const playerIdString = String(player.id);
        const paddedPlayerId = playerIdString.padStart(4, '0');
        playerIdElement.textContent = "#" + paddedPlayerId;
        return playerIdElement;
    }

    function createFlagImage(player){
        const flagImage = document.createElement("img");
        flagImage.className = "flag";
        const flagImagePath = `./assets/flags/${player.country}.png`;
        flagImage.src = flagImagePath;
        return flagImage;
    }

    function createPlayerName(player){
        const flagImage = createFlagImage(player);
        const playerNameElement = document.getElementById("playerName");
        playerNameElement.textContent = "";
        playerNameElement.appendChild(flagImage);
        playerNameElement.appendChild(document.createTextNode(player.name));
    }

    function createPlayerCurrentTeam(player){
        const teamId = findTeamIdByPlayerId(player.id);
        if (teamId !== null) {
            const team = teams.find(team => team.id === teamId);
            if (team !== undefined) {
                const logoImage = document.createElement("img");
                logoImage.className = "smallTeamLogo";
                const logoImagePath = `./assets/teams/${teamId}.png`;
                logoImage.src = logoImagePath;
                
                const playerTeamElement = document.getElementById("playerTeam");
                playerTeamElement.textContent = "";
                playerTeamElement.appendChild(logoImage);
                playerTeamElement.appendChild(document.createTextNode(team.name));
            }
        }
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
        document.querySelector(".playerPopupContainer").style.display = "none";
    });

    addClickEventToPlayerElements();
});