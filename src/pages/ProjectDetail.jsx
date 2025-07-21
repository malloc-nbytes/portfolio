import { FaRegCopy } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data/projects';

// Reusable CopyButton component
function CopyButton({ textToCopy }) {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        } catch (err) {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    return (
        <>
            <button className="copy-btn" onClick={copyToClipboard}>
                <FaRegCopy style={{ fontSize: '15px' }}/>
            </button>
            {copySuccess && <span style={{ marginLeft: '10px', color: 'yellow' }}>{copySuccess}</span>}
        </>
    );
}

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
            <Link className="back-to-projs" to="/projects">Back to Projects</Link>
            <div>
                <a className="readme-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
            </div>
            <h3 className="quick-install">Quick Install: <CopyButton textToCopy={project.clone} /></h3>
            <div className="project-detail-clone">
                {project.clone}
            </div>
            <h3>Forge install: <CopyButton textToCopy={project.forge} /></h3>
            <div className="project-detail-forge">
                {project.forge}
            </div>
            <h4 style={{ marginTop: '1.5rem' }}>README (via {project.readmeUrl}):</h4>
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
