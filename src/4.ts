// Клас Key для створення ключа з випадковою сигнатурою
class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

// Клас Person, який приймає ключ і зберігає його
class Person {
  constructor(private key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

// Абстрактний клас House, який має двері (відкриті або закриті) та ключ
abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`Welcome, ${person.getKey().getSignature()}!`);
    } else {
      console.log("Sorry, can't come in.");
    }
  }
}

// Клас MyHouse успадковується від House і реалізує відкриття дверей
class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door is open.");
    } else {
      console.log("Wrong key. Door remains closed.");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
