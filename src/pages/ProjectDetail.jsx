import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data/projects';

function ProjectDetail() {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const project = projects.find((p) => p.id === parseInt(id));

    useEffect(() => {
        if (!project) return;

        const fetchReadme = async () => {
            try {
                const response = await axios.get(project.readmeUrl);
                setContent(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch README content');
                setLoading(false);
            }
        };
        fetchReadme();
    }, [project]);

    if (!project) return <h1>Project not found</h1>;
    if (loading) return <h1>Loading project...</h1>;
    if (error) return <p>{error}</p>;

    return (
        <section>
            <h1 className="page-title">{project.title}</h1>
            <p>Date: {project.date}</p>
            <Link to="/projects">Back to Projects</Link>
            <p>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    README not rendering? View on GitHub
                </a>
            </p>
            <h2 style={{ marginTop: '1.5rem' }}>README:</h2>
            <div className="readme-content">
                {project.format !== 'md' ? (
                    <pre>{content}</pre>
                ) : (
                    <ReactMarkdown>{content}</ReactMarkdown>
                )}
            </div>
        </section>
    );
}

export default ProjectDetail;
