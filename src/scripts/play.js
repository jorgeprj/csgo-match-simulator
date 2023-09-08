import { Match } from "../classes/match/Match.mjs";
import { Team } from "../classes/team/Team.mjs";

document.addEventListener("DOMContentLoaded", async function  () {
    const playButton = document.getElementById("playButton");
    const scoreElement = document.getElementById("score");
    const teamSelectorA = document.getElementById("teamSelectorA");
    const teamSelectorB = document.getElementById("teamSelectorB");
    
    const response = await fetch("/src/database/teams.json");
    const teams = await response.json();

    const responsePlayers = await fetch("/src/database/players.json");
    const players = await responsePlayers.json();

    let match = null;
    
    playButton.addEventListener("click", function () {
        const selectedTeamIdA = parseInt(teamSelectorA.value);
        const selectedTeamIdB = parseInt(teamSelectorB.value);
        const selectedTeamA = teams.find(team => team.id === selectedTeamIdA);
        const selectedTeamB = teams.find(team => team.id === selectedTeamIdB);

        if (!selectedTeamA || !selectedTeamB) {
            popupContainer.style.display = "flex";
        } else {
            const teamA = new Team(selectedTeamA.id, selectedTeamA.name, selectedTeamA.roster)
            const teamB = new Team(selectedTeamB.id, selectedTeamB.name, selectedTeamB.roster)
            getScore(teamA, teamB);
            getMatchStats(match);
        }
    });

    function getScore(teamA, teamB){
        match = new Match(1, teamA, teamB);
        match.play();
        scoreElement.textContent = match.getStats().getScore();
        statsButton.style.display = "inline-block";
    }

    function getMatchStats(match){
        const selectedTeamIdA = parseInt(teamSelectorA.value);
        const selectedTeamIdB = parseInt(teamSelectorB.value);

        const selectedTeamA = teams.find(team => team.id === selectedTeamIdA);
        const selectedTeamB = teams.find(team => team.id === selectedTeamIdB);
        const teamA = new Team(selectedTeamA.id, selectedTeamA.name, selectedTeamA.roster)
        const teamB = new Team(selectedTeamB.id, selectedTeamB.name, selectedTeamB.roster)

        setTeamName(teamA,"teamAName");
        setTeamName(teamB,"teamBName");
  

        var tableA = document.getElementById('teamAStats');
        var tableB = document.getElementById('teamBStats');

        while (tableA.rows.length > 1) {
            tableA.deleteRow(1);
        }

        while (tableB.rows.length > 1) {
            tableB.deleteRow(1);
        }

        const teamAStats = getTeamStats(teamA.getID());
        const teamBStats = getTeamStats(teamB.getID());

        setStats(teamAStats, tableA);
        setStats(teamBStats, tableB);
    }

    function setTeamName(team, teamName){
        const logoImage = document.createElement("img");
        logoImage.className = "statsTeamLogo";
        const logoImagePath = `./assets/teams/${team.getID()}.png`;
        logoImage.src = logoImagePath;
        
        const teamANameElement = document.getElementById(teamName);
        teamANameElement.textContent = "";
        teamANameElement.appendChild(logoImage);
        teamANameElement.appendChild(document.createTextNode(team.name));
    }

    function getTeamStats(teamID){
        var statsTeam= [];

        match.getStats().getPlayersStats().forEach(function (playerStats) {
            if (playerStats.teamID === teamID){
                statsTeam.push(playerStats);
            }
        });
        statsTeam.sort(function (a, b) {
            return b.kills - a.kills;
        });

        return statsTeam;
    }

    function createPlayerName(player, row){
        var playerNameCell = row.insertCell(0);
        playerNameCell.classList.add("statsPlayerName");
        var flagImage = createFlagImage(player);
        var name = player.name.split(" ");
        
        var container = document.createElement("div");
        container.appendChild(flagImage);
        
        container.appendChild(document.createTextNode(`${name[0]} `));
        var nicknameElement = document.createElement("b");
        nicknameElement.textContent = `'${player.nickname}'`;
        container.appendChild(nicknameElement);
        
        container.appendChild(document.createTextNode(` ${name[1]}`));
        
        playerNameCell.innerHTML = "";
        playerNameCell.appendChild(container);
    }

    function createFlagImage(player){
        const flagImage = document.createElement("img");
        flagImage.className = "flag";
        const flagImagePath = `./assets/flags/${player.country}.png`;
        flagImage.src = flagImagePath;
        return flagImage;
    }

    function createPlusMinus(playerStats, row){
        var plusMinusCell = row.insertCell(2);
        var plusMinus = playerStats.kills - playerStats.deaths;
        
        plusMinusCell.classList.add('plus-minus');
        
        if (plusMinus > 0) {
            plusMinusCell.innerHTML = "+" + plusMinus;
            plusMinusCell.style.color = "#0CB307";
        } else if (plusMinus < 0) {
            plusMinusCell.innerHTML = plusMinus;
            plusMinusCell.style.color = "#C82123";
        } else {
            plusMinusCell.innerHTML = plusMinus;
        }
    }

    function setStats(teamStats, table){
        teamStats.forEach(function (playerStats) {
            var player = players.find(player => player.id === playerStats.playerID);

            var row = table.insertRow(-1);
            createPlayerName(player, row);
            var kdCell = row.insertCell(1);
            createPlusMinus(playerStats, row);
            var ratingCell = row.insertCell(3);

            var kd = playerStats.kills + "-" + playerStats.deaths;
            kdCell.innerHTML = kd;
            var rating = (playerStats.kills / playerStats.deaths).toFixed(2);
            ratingCell.innerHTML = rating;
        });
    }
});