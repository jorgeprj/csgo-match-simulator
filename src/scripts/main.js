import { Team } from "../classes/team/Team.mjs";
import { Match } from "../classes/match/Match.mjs";
import { MatchStats } from "../classes/match/MatchStats.mjs";

const teamA = new Team(1,"Vasco", [1,2,3,4,5]);
const teamB = new Team(2,"Galo", [6,7,8,9,10]);

const match = new Match(1,teamA, teamB);
match.play();
console.log(match.stats.getPlayersStats());