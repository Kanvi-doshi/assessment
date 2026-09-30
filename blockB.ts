// TypeScript: Interfaces, Enums, Generics   3 min · 4 marks
// ●	Write interface Room for the item shape (id, name, category, price, stock) and enum RoomStatus { Vacant, Occupied, Maintenance }.
// ●	Write a generic function findById<T extends { id: number }>(list: T[], id: number): T | undefined.
// ●	One line: why is this better than typing the list as any[]?

interface room {
  id: Number;
  name: String;
  category: Number;
  price: Number;
  stock: Number;
}

enum roomStatus {
  Vacant = "Vacant",
  Occupied = "Occupied",
  Maintenance = "Maintenance",
}

function findById<T extends { id: number }>(
  list: T[],
  id: number,
): T | undefined {
  return list.find((item) => item.id === id);
}
// Better than any[] as generics helps in type safety,and will still allow findById to work with other object that has a numeric value.

// B3
// · TypeScript: Utility Types + Typed React Props   2 min · 2 marks

// ●	type UpdateRoomDto = only price and stock, both optional (use Partial + Pick). type RoomPreview = Room without stock (use Omit).
type UpdateRoomDto = Partial<Pick<room, "price" | "stock">>;
type RoomPreview = Omit<room, "stock">;
// ●	Type the props of a RoomCard component: item: Room and onSelect: (id: number) => void.
interface roomCard {
  item: Room;
  onSelect: (id: number) => void;
}

// B4
// React: Custom Hook, Context, Router   3 min · 4 marks
// ●	useToggle(initial = false) custom hook returning [value, toggle].
// ●	RoomContext with a Provider exposing favorites and toggleFavorite(id) (skeleton is fine).
// ●	React Router: routes for /, /rooms/:id and a * 404 page, plus a NavLink to /rooms and reading id via useParams.

// b8
// · Node: fs, Streams, Events   2 min · 2 marks
// ●	Read data.txt with fs.promises.readFile and log the number of lines.
// ●	Create an EventEmitter; emit "roomAdded" with a payload and log it in a listener.
// ●	One line: when would createReadStream be better than readFile?

const data = await fs.readFile("data.txt", "utf-8");

const lines = data.split(/\r?\n/);

const emitter = new EventEmitter();
emitter.on("roomAdded", (room) => {
  console.log(room);
});
emitter.emit("roomAdded", {
  id: 1,
  name: "Deluxe Room",
});

const stream = fs.createReadStream("data.txt");

// B9 · MongoDB & Mongoose   3 min · 5 marks
// ●	Mongoose schema for room: name required (min 2), category enum [Standard, Deluxe, Luxury], price min 0, stock default 0, timestamps on.
// ●	Add a compound index on { category: 1, price: -1 }.
// ●	Aggregation pipeline: total stock value (price × stock) per category, sorted descending, top 2 only.
// ●	A find: in-stock rooms priced ≥ 3000, sorted by price descending, limit 3.
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },

    category: {
      type: String,
      enum: ["Standard", "Deluxe", "Luxury"],
    },

    price: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.index({
  category: 1,
  price: -1,
});

const result = await Room.aggregate([
  {
    $group: {
      _id: "$category",
      totalStockValue: {
        $sum: { $multiply: ["$price", "$stock"] },
      },
    },
  },

  { $sort: { totalStockValue: -1 } },
  { $limit: 2 },
]);

const rooms = await Room.find({
  stock: { $gt: 0 },
  price: { $gte: 3000 },
})
  .sort({ price: -1 })
    .limit(3);
  
