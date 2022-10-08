import PZTrait from "@pz/models/PZTrait";
import { observer } from "mobx-react";
import { useState } from "react";
import cx from "classnames";

const TraitTableHeader = observer(function TraitTableHeader({
  title,
}: {
  title: string;
}) {
  return (
    <thead>
      <th>{title}</th>
      <th>Cost</th>
    </thead>
  );
});

const TraitRow = observer(function TraitRow({
  trait,
  clickTrait,
}: {
  trait: PZTrait;
  clickTrait: (trait: PZTrait) => void;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <tr
      key={trait.name}
      className={cx("cursor-pointer", {
        hover: isHover,
      })}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onClick={() => {
        clickTrait(trait);
      }}
    >
      <td>{trait.name}</td>
      <td>{trait.cost}</td>
    </tr>
  );
});

export default observer(function TraitTable({
  title,
  traits,
  clickTrait,
}: {
  title: string;
  traits: PZTrait[];
  clickTrait: (trait: PZTrait) => void;
}) {
  return (
    <table className="table-zebra table w-full">
      <TraitTableHeader title={title} />
      <tbody>
        {traits.map((trait) => (
          <TraitRow
            key={trait.name}
            trait={trait}
            clickTrait={(clickedTrait) => {
              clickTrait(clickedTrait);
            }}
          />
        ))}
      </tbody>
    </table>
  );
});
