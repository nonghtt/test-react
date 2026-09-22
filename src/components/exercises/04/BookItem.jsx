import Badge from "../../ui/Badge";
export default function BookItem({ book }) {
  return (
    <li className="list-item">
      <div className="list-item-grow">
        <div>{book.title}</div>
        <div className="muted text-sm">{`${book.author} - ${book.year}`}</div>
      </div>
      <div className="tag-list">
        {book.tags.map((tag) => {
          return <Badge key={tag}>{tag}</Badge>;
        })}
      </div>
    </li>
  );
}
