const projects = [
  {
    name: "Green Valley",
    progress: 65,
  },

  {
    name: "Metro Tower",
    progress: 80,
  },

  {
    name: "Highway",
    progress: 45,
  },

  {
    name: "Metro Phase 2",
    progress: 70,
  },
];

function ProjectProgress() {
  return (
    <div className="project-progress-card">
      <div className="chart-header">
        <h3>Project Progress</h3>

        <p>Project completion overview</p>
      </div>

      <div className="progress-chart">
        <div className="chart-y-axis">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="bars-container">
          {projects.map((project) => (
            <div
              className="bar-item"
              key={project.name}
            >
              <div className="bar-area">
                <div
                  className="progress-bar"
                  style={{
                    height: `${project.progress}%`,
                  }}
                />

                <span
                  className="bar-value"
                  style={{
                    bottom: `${project.progress}%`,
                  }}
                >
                  {project.progress}%
                </span>
              </div>

              <p>{project.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectProgress;