// src/pages/Projects.jsx
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import "../styles.css";

function Projects() {
    return (
        <section className="projects-section">
            <div className="projects-header">
                <h1 className="page-title">Projects and Documentation</h1>
                <p>A collection of my open-source work.</p>
                <p>
                    To view the documentation of a specific program, just click
                    the card and navigate to the <span className="yellow">Official Documentation</span> section.
                </p>
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
