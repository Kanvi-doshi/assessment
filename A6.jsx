// · React: Components, State, Effect, Form   7 min · 14 marks
// ●	In the react-app starter, build <RoomList items={...} /> that renders each item's name and price, with an "Out of stock" badge when stock === 0.
// ●	Add a controlled search input (useState) that filters by name, case-insensitive. Show "No rooms found" when nothing matches.
// ●	useEffect: set document.title to "Hotel (N)" and keep it updated as the filtered count changes.
// ●	Mini "Add room" form (controlled inputs: name, price). Disable the button and show an inline error if name < 3 characters or price ≤ 0. On submit, add it to the list state.

import { useEffect, useState } from "react";

function RoomList({ items }) {
  const [rooms, setRooms] = useState(items);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const filterRoom = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = `Hotel (${filterRoom.length})`;
  }, [filterRoom.length]);

  const isInvalid = name.trim().length < 3 || Number(price) <= 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalid) return;
    const newRoom = {
      id: Date.now(),
      name: name.trim(),
      price: Number(price),
      stock: 1,
    };
    setRooms((prev) => [...prev, newRoom]);
    setName("");
    setPrice("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder=" Search rooms"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterRoom.length === 0 ? (
        <p>No room found</p>
      ) : (
        filterRoom.map((room) => (
          <div key={room.id}>
            <h3>{room.name}</h3>
            <p>₹{room.price}</p>
            {room.stock === 0 && <span>Out of stock</span>}
          </div>
        ))
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {isInvalid && (
          <p>Name must atleast 3 charac and price must be greater than 0.</p>
        )}

        <button type="submit" disabled={isInvalid}>
          + Room
        </button>
      </form>
    </div>
  );
}

export default RoomList;
