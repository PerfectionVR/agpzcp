import { observer } from "mobx-react";
import { useState } from "react";
import cx from "classnames";
import PZJob from "@pz/models/PZJob";

const JobTableHeader = observer(function JobTableHeader({
  title,
}: {
  title: string;
}) {
  return (
    <thead>
      <th>{title}</th>
    </thead>
  );
});
const JobRow = observer(function JobRow({
  job,
  currentJob,
  clickJob,
}: {
  job: PZJob;
  currentJob: PZJob;
  clickJob: (job: PZJob) => void;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <tr
      key={job.name}
      className={cx("cursor-pointer", {
        hover: isHover,
        active: currentJob.name === job.name,
      })}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onClick={() => {
        clickJob(job);
      }}
    >
      <td>{job.name}</td>
    </tr>
  );
});
export default observer(function JobTable({
  title,
  jobs,
  currentJob,
  clickJob,
}: {
  title: string;
  jobs: PZJob[];
  currentJob: PZJob;
  clickJob: (job: PZJob) => void;
}) {
  return (
    <table className="table-zebra table w-full">
      <JobTableHeader title={title} />
      <tbody>
        {jobs.map((job) => (
          <JobRow
            key={job.name}
            job={job}
            currentJob={currentJob}
            clickJob={(clickedJob) => {
              clickJob(clickedJob);
            }}
          />
        ))}
      </tbody>
    </table>
  );
});
