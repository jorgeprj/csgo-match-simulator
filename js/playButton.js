document.addEventListener("DOMContentLoaded", async function  () {
    const playButton = document.getElementById("playButton");
    const scoreElement = document.getElementById("score");
    const teamSelectorA = document.getElementById("teamSelectorA");
    const teamSelectorB = document.getElementById("teamSelectorB");
    const response = await fetch("/src/database/teams.json");
    const teams = await response.json();
    
    playButton.addEventListener("click", function () {
        const selectedTeamIdA = parseInt(teamSelectorA.value);
        const selectedTeamIdB = parseInt(teamSelectorB.value);

        const selectedTeamA = teams.find(team => team.id === selectedTeamIdA);
        const selectedTeamB = teams.find(team => team.id === selectedTeamIdB);

        if (!selectedTeamA || !selectedTeamB) {
            scoreElement.textContent = "Select valid teams";
        } else {
            const match = new Match(1, 1, selectedTeamA.id, selectedTeamB.id, 0);
            scoreElement.textContent = match.play();
        }
    });
});