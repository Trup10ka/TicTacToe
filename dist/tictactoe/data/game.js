"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(id, io) {
        this.id = id;
        this.io = io;
        this.players = [];
    }
    addPlayer(player) {
        this.players.push(player);
    }
}
exports.Game = Game;
