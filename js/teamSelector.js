document.addEventListener("DOMContentLoaded", async function () {
    const teamSelectorA = document.getElementById("teamSelectorA");
    const teamSelectorB = document.getElementById("teamSelectorB");

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

        // Assuming the roster attribute is a list of player IDs
        const rosterA = selectedTeamA.roster;
        const rosterB = selectedTeamB.roster;

        // Update player elements with player IDs
        document.getElementById("player1").textContent = players.find(player => player.id === rosterA[0]).nickname;
        document.getElementById("player2").textContent = players.find(player => player.id === rosterA[1]).nickname;
        document.getElementById("player3").textContent = players.find(player => player.id === rosterA[2]).nickname;
        document.getElementById("player4").textContent = players.find(player => player.id === rosterA[3]).nickname;
        document.getElementById("player5").textContent = players.find(player => player.id === rosterA[4]).nickname;

        document.getElementById("player6").textContent = players.find(player => player.id === rosterB[0]).nickname;
        document.getElementById("player7").textContent = players.find(player => player.id === rosterB[1]).nickname;
        document.getElementById("player8").textContent = players.find(player => player.id === rosterB[2]).nickname;
        document.getElementById("player9").textContent = players.find(player => player.id === rosterB[3]).nickname;
        document.getElementById("player10").textContent = players.find(player => player.id === rosterB[4]).nickname;
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