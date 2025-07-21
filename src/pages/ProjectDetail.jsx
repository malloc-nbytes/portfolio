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
    const [copySuccess, setCopySuccess] = useState('');

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

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(project.clone);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        } catch (err) {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    if (!project) return <h1>Project not found</h1>;
    if (loading) return <h1>Loading project...</h1>;
    if (error) return <p>{error}</p>;

    return (
        <section>
            <h1 className="page-title">{project.title}</h1>
            <p>Quick Install: <button className="copy-btn" onClick={copyToClipboard}>
                                  Copy to Clipboard
                              </button>
                {copySuccess && <span style={{ marginLeft: '10px', color: 'yellow' }}>{copySuccess}</span>}
            </p>
            <div className="project-detail-clone">
                {project.clone}
            </div>
            <p>Forge install:</p>
            <div className="project-detail-forge">
                {project.forge}
            </div>
            <p>Date: {project.date}</p>
            <Link className="back-to-projs" to="/projects">Back to Projects</Link>
            <p>
                <div>
                    <a className="readme-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                </div>
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
