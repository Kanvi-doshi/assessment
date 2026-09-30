import express from "express";
import { z } from "zod";
const app = express();
app.use(express.json());

let rooms = [
  { id: 1, name: "Standard Room", category: "Standard", price: 2500, stock: 4 },
  { id: 2, name: "Deluxe Room", category: "Deluxe", price: 4200, stock: 2 },
  { id: 3, name: "Royal Suite", category: "Luxury", price: 8000, stock: 1 },
  { id: 4, name: "Budget Room", category: "Standard", price: 1800, stock: 0 },
  { id: 5, name: "Family Room", category: "Deluxe", price: 5000, stock: 3 },
];

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const time = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${time}ms`);
  });
  next();
});

// Zod validation
const roomSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  price: z
    .number()
    .positive("Price must be positive")
    .max(20000, "Price cannot be above 20000"),
});

app.get("/rooms", (req, res) => {
  const { category } = req.query;

  if (category) {
    const filteredRooms = rooms.filter(
      (room) => room.category.toLowerCase() === String(category).toLowerCase(),
    );
    return res.status(200).json(filteredRooms);
  }
  res.status(200).json(rooms);
});

app.get("/rooms/:id", (req, res) => {
  const id = Number(req.params.id);
  const room = rooms.find((room) => room.id === id);
  if (!room) {
    return res.status(404).json({
      error: "Room not found",
    });
  }
  res.status(200).json(room);
});

app.post("/rooms", (req, res) => {
  const result = roomSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((issue) => issue.message),
    });
  }

  const newRoom = {
    id: rooms.length > 0 ? Math.max(...rooms.map((room) => room.id)) + 1 : 1,
    ...result.data,
  };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// node express.js
// Server running on port 3000
// GET /rooms - 6ms

// curl http://localhost:3000/rooms

// StatusCode        : 200
// StatusDescription : OK
// Content           : [{"id":1,"name":"Standard Room","category":"Standard","price":2500,"stock":4},{"id":2,"name":"Deluxe
//                     Room","category":"Deluxe","price":4200,"stock":2},{"id":3,"name":"Royal Suite","category":"Luxury",...
// RawContent        : HTTP/1.1 200 OK
//                     Connection: keep-alive
//                     Keep-Alive: timeout=5
//                     Content-Length: 372
//                     Content-Type: application/json; charset=utf-8
//                     Date: Wed, 30 Sep 2026 10:34:54 GMT
//                     ETag: W/"174-QpyN+mG6G/Uvc9fjcK...
// Forms             : {}
// Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 372], [Content-Type, application/json; charset=utf-8]...}
// Images            : {}
// InputFields       : {}
// Links             : {}
// ParsedHtml        : mshtml.HTMLDocumentClass
// RawContentLength  : 372
