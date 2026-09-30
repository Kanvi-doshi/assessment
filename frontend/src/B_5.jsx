// B5 · Redux Toolkit, Performance, Testing   3 min · 5 marks
// ●	createSlice named "rooms": initialState { items: [], status: "idle" }, reducers addItem and removeItem(id).

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  status: "idle",
};

export const fetchRooms = createAsyncThunk("rooms/fetch", async () => {
  const response = await fetch("/api/rooms");
  return await response.json();
});
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addItem: () => {},
    removeItem: () => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addItem, removeItem } = roomsSlice.actions;


// ●	createAsyncThunk("rooms/fetch", ...) calling fetch("/api/rooms") with extraReducers for pending / fulfilled / rejected.

// React Testing Library
test("shows Standard Room", () => {
  render(
    <RoomList
      items={[]}
    />
  );
  expect(
    screen.getByText("Standard Room")
  ).toBeInTheDocument();
});

// ●	One line: which of React.memo / useMemo / useCallback stops the list re-rendering when only the search text changes, and why?
// ●	One React Testing Library test: render <RoomList /> and assert "Standard Room" is in the document.

// React.memo → saves unnecessary component re-render when props don't change.
// useMemo    → memoizes a calculated value.
// useCallback → memoizes a function.
