import Character from '../src/Character';

describe('Character class', () => {
  let character;

  beforeEach(() => {
    character = new Character('Hero', 'Warrior', 40, 10);
  });

  describe('levelUp', () => {
    test('should increase level, attack, defence and set health to 100 if health > 0', () => {
      character.health = 50;
      character.level = 2;
      character.attack = 30;
      character.defence = 20;

      character.levelUp();

      expect(character.level).toBe(3);
      expect(character.attack).toBe(36);
      expect(character.defence).toBe(24);
      expect(character.health).toBe(100);
    });

    test('should throw error if health is 0', () => {
      character.health = 0;
      expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего');
    });

    test('should round attack and defence down after increasing', () => {
      character.attack = 33;
      character.defence = 17;
      character.levelUp();

      expect(character.attack).toBe(39);
      expect(character.defence).toBe(20);
    });
  });

  describe('damage', () => {
    test('should reduce health correctly based on defence', () => {
      character.health = 100;
      character.defence = 10;
      character.damage(50);
      expect(character.health).toBe(55);
    });

    test('should not let health go below 0', () => {
      character.health = 30;
      character.defence = 0;
      character.damage(100);
      expect(character.health).toBe(0);
    });

    test('should handle zero defence', () => {
      character.health = 80;
      character.defence = 0;
      character.damage(30);
      expect(character.health).toBe(50);
    });

    test('should handle high defence', () => {
      character.health = 100;
      character.defence = 100;
      character.damage(100);
      expect(character.health).toBe(100);
    });
  });
});
