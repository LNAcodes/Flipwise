// components\FlashCardForm\FlashCardForm.js

import styled from "styled-components";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";

const Form = styled.form`
  color: var(--text-color-light);
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const Label = styled.label`
  font-size: 1rem;
  line-height: 1.2;
  padding: 5px;
  text-align: left;
`;
const Input = styled.input`
  background-color: rgba(0, 20, 100, 0.5);
  border-radius: 30px;
  border: 1px solid var(--color-border);
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 15px;
  &::placeholder {
    color: var(--text-color-light);
    transition: opacity 120ms ease;
  }
  &:focus::placeholder {
    opacity: 0;
  }
  &:focus-visible {
    outline: none;
  }
  &:user-invalid {
    outline: 2px solid red;
  }
`;

const Select = styled.select`
  background-color: rgba(0, 20, 100, 0.5);
  border-radius: 30px;
  border: 1px solid var(--color-border);
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 15px;
  margin-bottom: 30px;
  padding-right: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;
  &::placeholder {
    color: var(--text-color-light);
  }
  &#collection {
    background-color: rgba(0, 20, 100, 0.5);
    padding: 15px;
  }
  &:focus-visible {
    outline: none;
  }
  &:user-invalid {
    outline: 2px solid red;
  }
`;

const Button = styled.button`
  background-color: var(--color-primary);
  border: none;
  border-radius: 30px;
  color: var(--text-color-light);
  font-size: 1.2rem;
  height: 60px;
  padding: 15px;
  padding-right: 40px;
  margin: 10px 0;
  &[aria-label="Cancel editing"] {
    background-color: var(--color-secundary);
  }
`;

const Hint = styled.p`
  color: var(--color-accent);
  font-size: 0.8rem;
  line-height: 1;
  padding: 5px;
  margin: 7px 0 0 0;
  text-align: left;
  min-height: 10px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  input:focus + ${Hint} {
    opacity: 1;
  }
  select:focus:invalid + ${Hint} {
    opacity: 1;
  }
`;

const SuccessMessage = styled.p`
  background: rgba(0, 200, 120, 0.5);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  padding: 10px 14px;
  border-radius: 16px;
  margin: 10px 0 6px;
`;

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
  const [collectionFocused, setCollectionFocused] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      const timerId = successTimerRef.current; // get saved Timer-ID
      if (!timerId) return; // wenn kein Timer, nix machen
      clearTimeout(timerId); // Timer stoppen
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      await onSubmit(data);

      setShowSuccess(true); // Erfolgsmeldung sofort einblenden
      // Timer stoppen falls noch einer läuft
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      // Neuen Timer starten und Timer-ID in successTimerRef,
      successTimerRef.current = setTimeout(() => setShowSuccess(false), 3000); // nach 3 Sek. Erfolgsmeldung ausblenden

      setSubmitError("");

      if (resetOnSuccess) {
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
      {showSuccess ? (
        <SuccessMessage role="status" aria-live="polite">
          Flashcard successfully added.
        </SuccessMessage>
      ) : null}
      <Field>
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
      </Field>

      <Field>
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
      </Field>

      <Field>
        <Label htmlFor="collection">Collection</Label>
        <Select
          id="collection"
          name="collection"
          required
          defaultValue={initialData.collection ?? ""}
          onFocus={() => setCollectionFocused(true)}
          onBlur={() => setCollectionFocused(false)}
          aria-describedby="collection-hint"
        >
          <option value="" disabled hidden>
            Please select a collection
          </option>

          {collections?.map((collection) => (
            <option key={collection._id} value={collection.name}>
              {collection.name}
            </option>
          ))}
        </Select>
      </Field>

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
