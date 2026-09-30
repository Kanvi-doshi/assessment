// B4 · React: Custom Hook, Context, Router   3 min · 4 marks
// ●	useToggle(initial = false) custom hook returning [value, toggle].
// useToggle
import { createContext, useState } from "react";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}
// ●	RoomContext with a Provider exposing favorites and toggleFavorite(id) (skeleton is fine).

export const RoomContext = createContext();
export function RoomProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <RoomContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </RoomContext.Provider>
  );
}

// ●	React Router: routes for /, /rooms/:id and a * 404 page, plus a NavLink to /rooms and reading id via useParams.
function Home() {
  return <h1>Home</h1>;
}

function Rooms() {
  return <h1>Rooms</h1>;
}

function RoomDetails() {
  const { id } = useParams();

  return <h1>Room ID: {id}</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/rooms">Rooms</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

