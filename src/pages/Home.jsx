import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import TabBar from '../components/TabBar';

function Home() {
    const tabs = [
        {
            title: 'About',
            content: 'I\'m a software developer skilled in C, C++, OCaml, and Haskell. I build efficient, reliable, and scalable code with a focus on systems and functional programming.'
        },
        {
            title: 'Biography',
            content: 'I began my journey creating electronic music with Ableton Live for seven years, honing my creative and technical skills. Transitioning to programming, I earned an Associate’s Degree in Computer Information Technology at a community college, starting with C# and progressing to Java, C++, and C. I later completed a Bachelor’s Degree in Software Engineering at Lipscomb University, solidifying my interest in low-level software.'
        },
        {
            title: 'Disclaimer',
            content: 'All my open-source projects are licensed under either the MIT License or the GNU Lesser General Public License (LGPL) v2.'
        },
    ];

    return (
        <section className="home-section">
            <div className="profile-container">
                <TabBar tabs={tabs} />
            </div>

            <div className="links-container">
                <h2>Socials</h2>
                <ul className="social-links">
                    <li>
                        <MdEmail />{' '}
                        <a href="mailto:zacharydhaskins@yahoo.com">zacharydhaskins@yahoo.com</a>
                    </li>
                    <li>
                        <FaGithub />{' '}
                        <a href="https://github.com/malloc-nbytes" target="_blank" rel="noopener noreferrer">
                            malloc-nbytes
                        </a>
                    </li>
                    <li>
                        <FaLinkedin />{' '}
                        <a href="https://linkedin.com/in/Zachary-Haskins" target="_blank" rel="noopener noreferrer">
                            Zachary-Haskins
                        </a>
                    </li>
                    <li>
                        <FaXTwitter />{' '}
                        <a href="https://x.com/malloc_nbytes" target="_blank" rel="noopener noreferrer">
                            @malloc_nbytes
                        </a>
                    </li>
                    <li>
                        <FaInstagram />{' '}
                        <a href="https://www.instagram.com/malloc_nbytes/" target="_blank" rel="noopener noreferrer">
                            @malloc_nbytes
                        </a>
                    </li>
                </ul>
            </div>

            <div className="links-container">
                <h2>Other Websites</h2>
                <ul className="website-links">
                    <li>
                        <a href="https://malloc-nbytes.github.io/EARL-web/" target="_blank" rel="noopener noreferrer">
                            EARL Documentation
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Home;
