import { player1, player2 } from "./testValues";
import { Player } from "./interfaces";

const calcBaseDamage = (player1: Player, player2: Player, day) =>
  ((player1.baseCasualities * player1.troops) / 1000) *
  player1.unitModifier *
  player1.phaseModifier *
  player1.combatAbility *
  (player1.discipline / player2.tactics) *
  ((100 + day) / 100);

const calcMoralDamage = (player: Player, damageFromPlayer: number) =>
  (damageFromPlayer / 200) * (player.maxMoral / 2.7) + 0.03;

const battleDay = (player1: Player, player2: Player, day = 1) => {
  console.log("day", day);
  console.log("player1", player1);
  console.log("player2", player2);

  if (player1.currentMoral <= 0 && player2.currentMoral <= 0) {
    if (player1.currentMoral > player2.currentMoral) {
      console.log("player 1 wins");
    } else {
      console.log("player 2 wins");
    }
    return;
  }

  if (player1.currentMoral <= 0) {
    console.log("player 2 wins");
    return;
  }

  if (player2.currentMoral <= 0) {
    console.log("player 1 wins");
    return;
  }
  const damageFromPlayer1 = calcBaseDamage(player1, player2, day);
  const damageFromPlayer2 = calcBaseDamage(player2, player1, day);
  console.log("Damage from player1", damageFromPlayer1);
  console.log("Damage from player2", damageFromPlayer2);
  player1.troops = player1.troops - damageFromPlayer2;
  player2.troops = player2.troops - damageFromPlayer1;

  const moralDamageFromPlayer1 = calcMoralDamage(player1, damageFromPlayer1);
  const moralDamageFromPlayer2 = calcMoralDamage(player2, damageFromPlayer2);

  console.log("Moral damage from player1", moralDamageFromPlayer1);
  console.log("Moral damage from player2", moralDamageFromPlayer2);

  player1.currentMoral = player1.currentMoral - moralDamageFromPlayer2;
  player2.currentMoral = player2.currentMoral - moralDamageFromPlayer1;

  battleDay(player1, player2, (day = day + 1));
};

battleDay(player1, player2);
