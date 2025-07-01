// src/components/ProjectCard.jsx
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ProjectCard({ project, className }) {
    return (
        <Link to={`/projects/${project.id}`} className={`project-card ${className}`}>
            <div className="project-card-content">
                <h3>{project.title}</h3>
                <div className="project-desc">
                    <ReactMarkdown>{project.desc}</ReactMarkdown>
                </div>
                <p>Date: {project.date}</p>
            </div>
        </Link>
    );
}

export default ProjectCard;
