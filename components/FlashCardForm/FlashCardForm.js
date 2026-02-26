// components\FlashCardForm\FlashCardForm.js

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

const Button = styled.button`
  margin: 10px 0;
`;

const Hint = styled.p`
  color: #333;
  font-size: 0.7rem;
  line-height: 1;
  padding: 0 5px;
  margin-bottom: 10px;
`;

const HeadingForm = styled.h2``;

export default function FlashCardForm({
  initialData = {},
  onSubmit,
  submitLabel = "Add flashcard",
  onCancel,
  cancelLabel = "Cancel",
  resetOnSuccess = false,
}) {
  const { data: collections } = useSWR("/api/collections");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      await onSubmit(data);

      if (resetOnSuccess) {
        // mutate();
        event.target.reset();
      }
    } catch (error) {
      setSubmitError(error?.message ?? "Submit error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form data-js="flashCardForm" onSubmit={handleSubmit}>
      <HeadingForm>
        {onSubmit ? "Edit flashcard" : "Add a new flashcard"}
      </HeadingForm>

      <Label htmlFor="question">Question</Label>
      <Input
        name="question"
        id="question"
        required
        type="text"
        defaultValue={initialData.question ?? ""}
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
        defaultValue={initialData.answer ?? ""}
        minLength="15"
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
        defaultValue={initialData.collection ?? ""}
      >
        <option value="" disabled>
          Please select a collection
        </option>

        {collections?.map((collection) => (
          <option key={collection._id} value={collection.name}>
            {collection.name}
          </option>
        ))}
      </Select>

      <Hint>Please select a collection.</Hint>

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>

      {onCancel ? (
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancel editing"
        >
          {cancelLabel}
        </Button>
      ) : null}
    </Form>
  );
}
