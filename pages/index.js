import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/flashcards", fetcher);
  if (error) return <p>Fehler beim Laden</p>;
  if (isLoading) return <p>Lade Daten...Bitte warten...</p>;

  return (
    <>
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
