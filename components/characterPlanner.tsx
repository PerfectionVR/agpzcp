import { observer } from "mobx-react";
import { useContext } from "react";
import characterPlannerContext from "@contexts/characterPlannerContext";
import cx from "classnames";

export default observer(function CharacterPlanner() {
  const characterPlanner = useContext(characterPlannerContext);
  return (
    <div>
      <div className="card w-96  bg-neutral shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">Jobs</h2>
          <ul>
            {characterPlanner.availableJobs.map((x) => (
              <li key={x.id}>
                <button
                  className={cx("btn", {
                    "btn-success": characterPlanner.character.isJob(x),
                  })}
                  onClick={() => {
                    {
                      characterPlanner.character.setJob(x);
                    }
                  }}
                >
                  {x.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card w-96  bg-neutral shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">Positive Traits</h2>
          <ul>
            {characterPlanner.availablePositiveTraits.map((x) => (
              <li key={x.id}>
                <button
                  className="btn"
                  onClick={() => {
                    characterPlanner.character.addTrait(x);
                  }}
                >
                  {x.name} {x.cost}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card w-96  bg-neutral shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">Negative Traits</h2>
          <ul>
            {characterPlanner.availableNegativeTraits.map((x) => (
              <li key={x.id}>
                <button
                  className="btn"
                  onClick={() => {
                    characterPlanner.character.addTrait(x);
                  }}
                >
                  {x.name} +{x.cost}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card w-96  bg-neutral shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">Current Traits</h2>
          <ul>
            {characterPlanner.character.traits.map((x) => (
              <li key={x.id}>
                <button
                  className="btn"
                  onClick={() => {
                    characterPlanner.character.removeTrait(x);
                  }}
                >
                  {x.name} {x.cost >= 0 ? "+" : ""}
                  {x.cost}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card w-96  bg-neutral shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">Stats</h2>
          <p>Available points: {characterPlanner.character.points}</p>
        </div>
      </div>
    </div>
  );
});
