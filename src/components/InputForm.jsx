export default function InputForm() {
  return (
    <form className="stack-sm">
      <div className="row">
        <input
          className="input"
          placeholder="할 일을 입력하세요"
          defaultValue=""
        />
        <button className="btn btn-primary" type="submit">
          추가
        </button>
      </div>
    </form>
  );
}
