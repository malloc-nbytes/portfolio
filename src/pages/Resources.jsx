import '../styles.css';

function yel(s) {
    return <span className='yellow'>{s}</span>;
}

function Resources() {
    return (
        <>
            <div className='projects-header'>
                <h1 className='page-title'>Resources</h1>
                <p>
                    A collection of books, articles, and other interesting pieces of media
                    that I have found useful or interesting.
                </p>
            </div>

            <h2>Books</h2>
            <ul>
                <li><a className='readme-link' href='https://a.co/d/1hUmt4g'>C Programming Language, 2nd Edition</a></li>
                <li><a className='readme-link' href='https://www.linuxfromscratch.org/lfs/'>Linux From Scratch</a></li>
                <li><a className='readme-link' href='https://craftinginterpreters.com/'>Crafting Interpreters</a></li>
                <li><a className='readme-link' href='https://a.co/d/4Zg6VsG'>The Art of Multiprocessor Programming 2nd Edition</a></li>
                <li><a className='readme-link' href='https://a.co/d/gELR4VD'>Competitive Programming 4, Book 1</a></li>
                <li><a className='readme-link' href='https://github.com/SystemsApproach/book'>Computer Networks: A Systems Approach ({yel('needs to be compiled')})</a></li>
            </ul>
            <h2>Articles</h2>
            <ul>
                <li><a className='readme-link' href='https://people.freebsd.org/~lstewart/articles/cpumemory.pdf'>What Every Programmer Should Know About Memory</a></li>
                <li><a className='readme-link' href='https://beej.us/guide/bgnet/html/split/index.html'>Beej's Guide to Network Programming</a></li>
                <li><a className='readme-link' href='https://ephemeral.cx/2013/12/writing-a-self-mutating-x86_64-c-program/'>Writing a Self-Mutating x86_64 C Program</a></li>
            </ul>
        </>
    );
}

export default Resources;
