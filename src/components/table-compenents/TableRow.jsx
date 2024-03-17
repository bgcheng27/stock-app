export function TableRow({ children, label }) {
  return (
    <tr>
      <td>{label}</td>
      { children }
    </tr>
  );
}
