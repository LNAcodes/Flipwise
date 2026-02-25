import FlashCardForm from "@/components/FlashCardForm/FlashCardForm";

export default function FlashCardDetailPage() {
  return (
    <main>
      <h1>Edit FlashCard</h1>
      <FlashCardForm
        initialData={data}
        onSubmit={handleUpdate}
        submitLabel="Update card"
      />
    </main>
  );
}
