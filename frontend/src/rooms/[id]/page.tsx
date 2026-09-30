export default async function RoomPage({ params }: { params: { id: string } }) {
  return <h1>Room {params.id}</h1>;
}
