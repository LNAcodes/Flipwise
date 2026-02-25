import styled from "styled-components";
import useSWR from "swr";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 40px;
`;

const Label = styled.label`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  padding: 5px;
`;
const Input = styled.input`
  &:user-invalid {
    outline: 2px solid red;
  }
`;
const Select = styled.select`
  &:user-invalid {
    outline: 2px solid red;
  }
`;
const Hint = styled.p`
  color: #333;
  font-size: 0.7rem;
  line-height: 1;
  padding: 0 5px;
  margin-bottom: 10px;
`;
const Button = styled.button``;
const HeadingForm = styled.h2``;

export default function FlashCardForm({ initialData = {} }) {
  const [collection, setCollection] = useState("");
  const { data: collections } = useSWR("/api/collections");
  const { data: flashcards, mutate } = useSWR("/api/flashcards");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newFlashcard = await response.json();
      mutate([newFlashcard, ...flashcards], false);
      event.target.reset();
      setCollection("");
    }

    setIsSubmitting(false);
  }
  return (
    <Form data-js="flashCardForm" onSubmit={handleSubmit}>
      <HeadingForm>Add a new flashcard</HeadingForm>
      <Label htmlFor="question">Question</Label>
      <Input
        name="question"
        id="question"
        required
        type="text"
        defaultValue=""
        minLength="15"
        maxLength="100"
        placeholder="Insert a question"
        aria-describedby="question-hint"
      />
      <Hint id="question-hint">Please enter a question.</Hint>
      <Label htmlFor="answer">Answer</Label>
      <Input
        name="answer"
        id="answer"
        required
        type="text"
        defaultValue=""
        minLength="40"
        maxLength="120"
        placeholder="Insert an answer"
        aria-describedby="answer-hint"
      />
      <Hint id="answer-hint">Please insert an answer.</Hint>
      <Label htmlFor="collection">Collection</Label>
      <Select
        id="collection"
        name="collection"
        required
        value={collection}
        onChange={(event) => setCollection(event.target.value)}
      >
        <option value="" disabled>
          Please select a collection
        </option>
        {console.log(collections)}
        {collections?.map((collection) => (
          <option key={collection._id} value={collection._name}>
            {collection.name}
          </option>
        ))}
      </Select>
      <Hint id="comment-collecion">Please select a collection.</Hint>
      <Button type="submit" aria-label="Add flashcard" disabled={isSubmitting}>
        Add flashcard
      </Button>
    </Form>
  );
}
