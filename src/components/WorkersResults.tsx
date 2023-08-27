interface WorkersResultsProps {
    occupation: string | null;
}

const WorkersResults = ({occupation}: WorkersResultsProps) => {
  return (
    <article className="w-full">
      <div className="flex flex-col">
        <h4 className=" text-2xl self-start">Trabajadores</h4>
      </div>
    </article>
  )
}

export default WorkersResults