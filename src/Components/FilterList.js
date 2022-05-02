import { useState, useTransition } from "react";

const FilterList = ({ names }) => {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState("");
  const [isPending, startTransition] = useTransition();

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    startTransition(() => {
      setHighlight(value);
    });
  };

  return (
    <div>
      <input type="text" onChange={changeHandler} value={query} />
      <div>
        <ul style={isPending ? { opacity: 0.2 } : { opacity: 1 }}>
          {names.map((name, index) => (
            <ListItem key={index} name={name} highlight={highlight} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterList;

function ListItem({ name, highlight }) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return <li>{name}</li>;
  }
  return (
    <li>
      {name.slice(0, index)}
      <span className="highlight">
        {name.slice(index, index + highlight.length)}
      </span>
      {name.slice(index + highlight.length)}
    </li>
  );
}
