// Array Methods, Destructuring, Spread/Rest   5 min · 9 marks
// ●	Use the items array in data.js (each item is a room). Use only map / filter / reduce / find — no for loops.
// ●	(a) Return the names of rooms priced above 3000 that are still available (stock > 0).
// ●	(b) Compute the total stock value = sum of price × stock across all items.
// ●	(c) Find the room with id 4 and return a NEW object with stock increased by 1 using spread. Do not mutate the original.
// ●	(d) Destructure { name, price, ...others } from the first item and log others.

// 1	Standard Room	Standard	2500	4
// 2	Deluxe Room	Deluxe	4200	2
// 3	Royal Suite	Luxury	8000	1
// 4	Budget Room	Standard	1800	0
// 5	Family Room	Deluxe	5000	3

const data = [
  { id: 1, name: "Standard Room", category: "Standard", price: 2500, stock: 4 },
  { id: 2, name: "Deluxe Room", category: "Deluxe", price: 4200, stock: 2 },
  { id: 3, name: "Royal Suite", category: "Luxury", price: 8000, stock: 1 },
  { id: 4, name: "Budget Room", category: "Standard", price: 1800, stock: 0 },
  { id: 5, name: "Family Room", category: "Deluxe", price: 5000, stock: 3 },
];

const a = data
  .filter((datas) => datas.price > 3000 && datas.stock > 0)
  .map((datas) => datas.name);
console.log(a); // [ 'Deluxe Room', 'Royal Suite', 'Family Room' ]

const b = data.reduce((sum, datas) => sum + datas.price * datas.stock, 0);
console.log(b); //41400

const c = data.find((datas) => datas.id === 4);
const newC = { ...c, stock: c.stock + 1 };

console.log(newC);
// {
//   id: 4,
//   name: 'Budget Room',
//   category: 'Standard',
//   price: 1800,
//   stock: 1
// }

const { name, price, ...others } = data[0];
console.log(others); //{ id: 1, category: 'Standard', stock: 4 }

// · Closures & Lexical Scope   4 min · 6 marks
// ●	Implement makeCounter(step) using a closure. It returns { inc, dec, value, reset } and the count must be private.
// ●	Scenario: tracking rooms left with step = 1. Call inc(), inc(), dec() and log value() after each.
// ●	In one comment: which variable is "closed over", and where does it live?

function makeCounter(step) {
  let count = 0;
  return {
    inc: () => {
      count += step;
    },

    dec: () => {
      count -= step;
    },

    value: () => {
      return count;
    },

    reset: () => {
      count = 0;
    },
  };
}

const roomsLeft = makeCounter(1);

roomsLeft.inc();
console.log(roomsLeft.value()); // 1

roomsLeft.inc();
console.log(roomsLeft.value()); // 2

roomsLeft.dec();
console.log(roomsLeft.value()); // 1

// · Promises, Async/Await & Event Loop   4 min · 9 marks
// ●	The starter has fakeApi(data, ms, shouldFail = false) which returns a Promise. Write async function loadDashboard() that fetches items and categories IN PARALLEL with Promise.all and logs "N rooms across M categories".
// ●	Wrap it in try/catch. Prove the failure path by passing shouldFail = true to one call and logging "Failed: <message>".
// ●	WITHOUT running it, write the exact console output order as a comment:
// console.log("A");
// setTimeout(() => console.log("B"), 0);
// Promise.resolve().then(() => console.log("C"));
// console.log("D");

async function loadDashboard() {
  try {
    const [items, categories] = await Promise.all([
      fakeApi(data, 1000),
      fakeApi(data, 1000),
    ]);

    console.log(`${items.length} rooms across ${categories.length} categories`);
  } catch (error) {
    console.log(`Failed: ${error.message}`); //Failed: fakeApi is not defined
  }
}

loadDashboard();

// console.log("A");
// setTimeout(() => console.log("B"), 0);
// Promise.resolve().then(() => console.log("C"));
// console.log("D");
// A
// D
// C
// B

// Classes, Inheritance & Prototype   3 min · 5 marks
// ●	Create class Room with constructor(id, name, price) and a method discountedPrice(pct).
// ●	Create class SuiteRoom extends Room with an extra field hasJacuzzi. Override discountedPrice so it calls super.discountedPrice(pct) and takes a further 5% off.
// ●	Instantiate one of each from the first item in data.js and log both prices. In one comment: where is discountedPrice stored — on the instance or the prototype?

class Room {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  discountedPrice(pct) {
    return this.price - (this.price * pct) / 100;
  }
}

class SuiteRoom extends Room {
  constructor(id, name, price, hasJacuzzi) {
    super(id, name, price);
    this.hasJacuzzi = hasJacuzzi;
  }

  discountedPrice(pct) {
    const discounted = super.discountedPrice(pct);
    return discounted - discounted * 0.05;
  }
}

const firstItem = data[0];

const room = new Room(firstItem.id, firstItem.name, firstItem.price);

const suiteRoom = new SuiteRoom(
  firstItem.id,
  firstItem.name,
  firstItem.price,
  true,
);

console.log(room.discountedPrice(10)); // 2250
console.log(suiteRoom.discountedPrice(10)); // 2137.5

// Git (3 min)
// G · Git Workflow   3 min · 5 marks
// ●	In your working folder: git init, commit the starter files, create branch feature/rooms-discount, make one change + commit, then merge it into main with --no-ff.
// ●	Save the result: git log --oneline --graph --all > git-log.txt.
// ●	In answers.md (2 lines): the command you'd use to REBASE the feature branch onto main instead, and a one-line Pull Request title for this change.
