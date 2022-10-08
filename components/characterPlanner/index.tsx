import { observer } from "mobx-react";
import { useContext } from "react";
import characterPlannerContext from "@contexts/characterPlannerContext";
import JobTable from "@components/characterPlanner/jobTable";
import TraitTable from "@components/characterPlanner/traitTable";

export default observer(function CharacterPlanner() {
  const characterPlanner = useContext(characterPlannerContext);
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="h-192 overflow-y-auto">
          <JobTable
            title="Available Jobs"
            jobs={characterPlanner.character.availableJobs}
            currentJob={characterPlanner.character.job}
            clickJob={(clickedJob) =>
              characterPlanner.character.setJob(clickedJob)
            }
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="h-96 overflow-y-auto">
          <TraitTable
            title="Positive Traits"
            traits={characterPlanner.character.availablePositiveTraits}
            clickTrait={(clickedTrait) => {
              characterPlanner.character.addTrait(clickedTrait);
            }}
          />
        </div>
        <div className="h-96 overflow-y-auto">
          <TraitTable
            title="Negative Traits"
            traits={characterPlanner.character.availableNegativeTraits}
            clickTrait={(clickedTrait) => {
              characterPlanner.character.addTrait(clickedTrait);
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="h-96 overflow-y-auto">
          <TraitTable
            title="Current Traits"
            traits={characterPlanner.character.traits}
            clickTrait={(clickedTrait) => {
              characterPlanner.character.removeTrait(clickedTrait);
            }}
          />
        </div>
        <div className="h-96 overflow-y-auto">
          <div className="card m-4  w-96 bg-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Stats</h2>
              <p>Job: {characterPlanner.character.job.name}</p>
              <p>Available points: {characterPlanner.character.points}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
