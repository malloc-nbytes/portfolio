import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data/projects';
import CopyButton from '../components/CopyButton';
import CollapseSnippet from '../components/CollapseSnippet'
import { MdOutlineQuestionMark } from "react-icons/md";

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

    const DocComponent = project.doc;

    return (
        <section>
            <h1 className="page-title">{project.title}</h1>
            <Link className="back-to-projs" to="/projects">Back to Projects</Link>
            <div>
                <a className="readme-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
            </div>
            <h3 className="quick-install">Quick Install: <CopyButton copy={project.clone} /></h3>
            <div className="project-detail-clone">{project.clone}</div>
            <h3>
                Forge install: <CopyButton copy={project.forge} />
                <button style={{ border: 'none', fontSize: '15px', background: 'none', color: 'white', cursor: 'pointer' }}
                        onClick={() => {
                            alert('Forge is a custom package manager that I have made. All of my projects can be installed through it.\n\nhttps://www.github.com/malloc-nbytes/forge.git');
                        }}>
                    <MdOutlineQuestionMark />
                </button>
            </h3>
            <div className="project-detail-forge">{project.forge}</div>
            <h4 style={{ marginTop: '1.5rem' }}>README (via {project.readmeUrl}):</h4>
            <CollapseSnippet>
                <div className="readme-content">
                    {project.format !== 'md' ? (
                        <pre>{content}</pre>
                    ) : (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    )}
                </div>
            </CollapseSnippet>
            {DocComponent && (
                <>
                    <h2 style={{ marginTop: '1.5rem', textAlign: 'center' }}>Official Documentation</h2>
                    <div className="project-detail-doc">
                        <DocComponent />
                    </div>
                </>
            )}
        </section>
    );
}

export default ProjectDetail;
