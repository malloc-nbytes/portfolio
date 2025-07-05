import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

function Home() {
    return (
        <section className="home-section">
            <div className="profile-container">
                <h1 className="profile-name">About</h1>
                <p className="profile-bio">
                    I'm a software developer skilled in C, C++, OCaml, and Haskell. I build efficient,
                    reliable, and scalable code with a focus on systems and functional programming.
                </p>
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
                    <li>
                        <a href="https://malloc-nbytes.github.io/forge-web/index.html" target="_blank" rel="noopener noreferrer">
                            Forge Documentation
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Home;
