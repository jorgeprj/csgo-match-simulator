document.addEventListener("DOMContentLoaded", async function () {
    const teamSelectorA = document.getElementById("teamSelectorA");
    const teamSelectorB = document.getElementById("teamSelectorB");
    const teamALogo = document.getElementById("teamALogo");
    const teamBLogo = document.getElementById("teamBLogo"); 

    const response = await fetch("/src/database/teams.json");
    const teams = await response.json();

    const responsePlayers = await fetch("/src/database/players.json");
    const players = await responsePlayers.json();

    function populateTeamSelectors() {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Selecione o time";

        teamSelectorA.appendChild(defaultOption.cloneNode(true));
        teamSelectorB.appendChild(defaultOption.cloneNode(true));

        teams.forEach(team => {
            const optionA = document.createElement("option");
            optionA.value = team.id;
            optionA.textContent = team.name;
            teamSelectorA.appendChild(optionA);

            const optionB = document.createElement("option");
            optionB.value = team.id;
            optionB.textContent = team.name;
            teamSelectorB.appendChild(optionB);
        });
    }

    function updatePlayerIDs(selectedTeamIdA, selectedTeamIdB) {
        const selectedTeamA = teams.find(team => team.id === selectedTeamIdA);
        const selectedTeamB = teams.find(team => team.id === selectedTeamIdB);

        const scoreElement = document.getElementById("score");
        scoreElement.textContent = "";
      
        // Assuming the roster attribute is a list of player IDs
        const rosterA = selectedTeamA.roster;
        const rosterB = selectedTeamB.roster;
      
        // Update player elements with player IDs
        updatePlayerElement("player1", rosterA[0]);
        updatePlayerElement("player2", rosterA[1]);
        updatePlayerElement("player3", rosterA[2]);
        updatePlayerElement("player4", rosterA[3]);
        updatePlayerElement("player5", rosterA[4]);
      
        updatePlayerElement("player6", rosterB[0]);
        updatePlayerElement("player7", rosterB[1]);
        updatePlayerElement("player8", rosterB[2]);
        updatePlayerElement("player9", rosterB[3]);
        updatePlayerElement("player10", rosterB[4]);
      
        function updatePlayerElement(elementId, playerId) {
          const playerElement = document.getElementById(elementId);
          const player = players.find(player => player.id === playerId);
      
          if (player) {
            const country = player.country;
            const flagImage = document.createElement("img");
            flagImage.className = "flag";
      
            const imagePath = `./assets/flags/${country}.png`;
            flagImage.src = imagePath;

            playerElement.setAttribute("data-player-id", playerId);
      
            playerElement.innerHTML = "";
            playerElement.appendChild(flagImage);
            playerElement.appendChild(document.createTextNode(player.nickname));
          }

          const imagePathA = `/assets/teams/${selectedTeamIdA}.png`;
          const imagePathB = `/assets/teams/${selectedTeamIdB}.png`;
          teamALogo.innerHTML = `<img src="${imagePathA}" alt="Logo do Time A">`;
          teamBLogo.innerHTML = `<img src="${imagePathB}" alt="Logo do Time B">`;
        }
    }

    function setupTeamSelectors() {
        teamSelectorA.addEventListener("change", function () {
            const selectedTeamIdA = parseInt(teamSelectorA.value);
            const selectedTeamIdB = parseInt(teamSelectorB.value);

            if (selectedTeamIdA !== selectedTeamIdB) {
                teamSelectorB.querySelectorAll("option").forEach(option => {
                    option.disabled = false;
                });
                teamSelectorB.querySelector(`option[value="${selectedTeamIdA}"]`).disabled = true;
                updatePlayerIDs(selectedTeamIdA, selectedTeamIdB);
            }
        });

        teamSelectorB.addEventListener("change", function () {
            const selectedTeamIdA = parseInt(teamSelectorA.value);
            const selectedTeamIdB = parseInt(teamSelectorB.value);

            if (selectedTeamIdB !== selectedTeamIdA) {
                teamSelectorA.querySelectorAll("option").forEach(option => {
                    option.disabled = false;
                });
                teamSelectorA.querySelector(`option[value="${selectedTeamIdB}"]`).disabled = true;
                updatePlayerIDs(selectedTeamIdA, selectedTeamIdB);
            }
        });
    }

    populateTeamSelectors();
    setupTeamSelectors();
});