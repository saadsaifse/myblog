import React from "react"
import GitHubButton from "react-github-btn"

const ProjectListing = props => {
  const { projects } = props

  return (
    <section className="projects">
      {projects.map(project => (
        <div className="each" key={project.title}>
          <h2>
            <a
              className="project-link"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-title">{project.title}</div>
            </a>
          </h2>
          <p>{project.description}</p>
          <div className="buttons">
            <GitHubButton
              href={project.source}
              data-size="large"
              data-show-count="true"
            >
              Source
            </GitHubButton>
            {project.path && (
              <a
                className="button"
                href={project.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

export default ProjectListing
