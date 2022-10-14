import { Decimal } from "decimal.js";
import { observer } from "mobx-react";

const ForagingBonusTableHeader = observer(function ForagingBonusTableHeader() {
  return (
    <thead>
      <th>Foraging</th>
      <th>Bonus</th>
    </thead>
  );
});

const ForagingBonusRow = observer(function ForagingBonusRow({
  name,
  bonus,
}: {
  name: string;
  bonus: Decimal;
}) {
  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{bonus.toString()}</td>
    </tr>
  );
});

export default observer(function ForagingBonusTable({
  foraging,
}: {
  foraging: { [x: string]: Decimal };
}) {
  return (
    <table className="table-zebra table w-full">
      <ForagingBonusTableHeader />
      <tbody>
        {Object.keys(foraging).map((k) => (
          <ForagingBonusRow key={k} name={k} bonus={foraging[k]} />
        ))}
      </tbody>
    </table>
  );
});
