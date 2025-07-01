// src/pages/Projects.jsx
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

function Projects() {
    return (
        <section className="projects-section">
            <div className="projects-header">
                <h1 className="page-title">My Projects</h1>
                <p>A collection of my open-source work</p>
            </div>
            <div className="project-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} className="project-card-animated" />
                ))}
            </div>
        </section>
    );
}

export default Projects;
