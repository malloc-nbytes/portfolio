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
                <p>Tech: <span className='yellow'>{project.tech}</span></p>
                <p>OS: <span className='yellow'>{project.os}</span></p>
                <p>Category: <span className='yellow'>{project.cat}</span></p>
            </div>
        </Link>
    );
}

export default ProjectCard;
