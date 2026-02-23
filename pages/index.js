import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/flashcards", fetcher);
  if (error) return <div>Fehler beim Laden</div>;
  if (isLoading) return <div>Lade Daten...Bitte warten...</div>;

  return (
    <>
      <div>
        <h1>Hello from Next.js</h1>
      </div>
      <ul>
        {data.map((card) => (
          <li key={card._id}>
            <strong>{card.question}</strong>:{card.answer}
          </li>
        ))}
      </ul>
    </>
  );
}
