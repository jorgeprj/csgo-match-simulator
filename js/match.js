var Match = /** @class */ (function () {
    function Match(id, idTeamA, idTeamB, scoreTeamA, scoreTeamB) {
        this.id = id;
        this.idTeamA = idTeamA;
        this.idTeamB = idTeamB;
        this.scoreTeamA = scoreTeamA;
        this.scoreTeamB = scoreTeamB;
    }
    Match.prototype.getID = function () {
        return this.id;
    };
    Match.prototype.setID = function (id) {
        this.id = id;
    };
    Match.prototype.getIDTeamA = function () {
        return this.idTeamA;
    };
    Match.prototype.setIDTeamA = function (id) {
        this.idTeamA = id;
    };
    Match.prototype.getIDTeamB = function () {
        return this.idTeamB;
    };
    Match.prototype.setIDTeamB = function (id) {
        this.idTeamB = id;
    };
    Match.prototype.getScoreTeamA = function () {
        return this.scoreTeamA;
    };
    Match.prototype.setScoreTeamA = function (scoreTeamA) {
        this.scoreTeamA = scoreTeamA;
    };
    Match.prototype.addScoreTeamA = function () {
        this.setScoreTeamA(this.getScoreTeamA() + 1);
    };
    Match.prototype.getScoreTeamB = function () {
        return this.scoreTeamB;
    };
    Match.prototype.setScoreTeamB = function (scoreTeamB) {
        this.scoreTeamB = scoreTeamB;
    };
    Match.prototype.addScoreTeamB = function () {
        this.setScoreTeamB(this.getScoreTeamB() + 1);
    };
    Match.prototype.play = function () {
        var teamWith16 = Math.random() < 0.5 ? 'A' : 'B'; 
        if (teamWith16 === 'A') {
            this.setScoreTeamA(16);
            this.setScoreTeamB(Math.floor(Math.random() * 15)); 
        } else {
            this.setScoreTeamA(Math.floor(Math.random() * 15));
            this.setScoreTeamB(16);
        }
        return "".concat(this.scoreTeamA, " x ").concat(this.scoreTeamB);
    };
    return Match;
}());
exports.Match = Match;
