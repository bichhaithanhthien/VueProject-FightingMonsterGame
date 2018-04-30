new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
      this.turns = [];
    },
    attack: function() {
      if(!this.monsterDamage(10, 3, 'Player hits monster for ')) {
        this.playerDamage(12, 5, 'Monster hits player for ');
      }
    },
    specialAttack: function() {
      if(!this.monsterDamage(20, 10, 'Player hits monster hard for ')) {
        this.playerDamage(12, 5, 'Monster hits player for ');
      }
    },
    monsterDamage: function(max, min, msg) {
      var damage = this.calculateDamage(max, min);
      this.monsterHealth -= damage;
      this.log(true, msg, damage);
      return this.checkWin();
    },
    playerDamage: function(max, min, msg) {
      var damage = this.calculateDamage(max, min);
      this.playerHealth -= damage;
      this.log(false, msg, damage);
      this.checkWin();
    },
    heal: function() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.log(true, 'Player is heal for ', 10);
      this.playerDamage(12, 5, 'Monster hits player for ');
    },
    giveUp: function() {
      this.startGame();
    },
    calculateDamage: function(max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if(this.monsterHealth <= 0) {
        if(this.monsterHealth < 0) {
          this.monsterHealth = 0;
        }
        this.showResult('You won! New game?');
        return true;
      } else if(this.playerHealth <= 0) {
        if(this.playerHealth < 0) {
          this.playerHealth = 0;
        }
        this.showResult('You lost! New game?');
        return true;
      }
      return false;
    },
    showResult: function(msg) {
      if(confirm(msg)) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    },
    log: function(isPlayer, msg, value) {
      this.turns.unshift({
        isPlayer: isPlayer,
        text: msg + value
      });
    }
  }
});