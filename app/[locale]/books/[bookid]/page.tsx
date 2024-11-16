export default async function Book(props: {
  params: Promise<{ bookid: string }>;
}) {
  const { bookid } = await props.params;
  return (
    <div>
      <h1>Book {bookid}</h1>
    </div>
  );
}
