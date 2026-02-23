import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("/api/flashcards");
  if (error) return <p>Error loading</p>;
  if (isLoading) return <p>Loading data... Please wait...</p>;

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
