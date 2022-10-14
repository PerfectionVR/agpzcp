import { observer } from "mobx-react";

const SkillBonusBoost = observer(function SkillBonusBoost({
  bonus,
}: {
  bonus: number;
}) {
  let result = `${bonus}/10`;
  if (bonus === 1) result += ` (+75% XP Boost)`;
  else if (bonus === 2) result += ` (+100% XP Boost)`;
  else if (bonus >= 3) result += ` (+125% XP Boost)`;
  return <td>{result}</td>;
});

const SkillBonusTableHeader = observer(function SkillBonusTableHeader() {
  return (
    <thead>
      <th>Skill Bonus</th>
      <th>Bonus</th>
    </thead>
  );
});

const SkillBonusRow = observer(function SkillBonusRow({
  name,
  bonus,
}: {
  name: string;
  bonus: number;
}) {
  return (
    <tr key={name}>
      <td>{name}</td>
      <SkillBonusBoost bonus={bonus} />
    </tr>
  );
});

export default observer(function SkillBonusTable({
  skills,
}: {
  skills: { [x: string]: number };
}) {
  return (
    <table className="table-zebra table w-full">
      <SkillBonusTableHeader />
      <tbody>
        {Object.keys(skills).map((k) => (
          <SkillBonusRow key={k} name={k} bonus={skills[k]} />
        ))}
      </tbody>
    </table>
  );
});
