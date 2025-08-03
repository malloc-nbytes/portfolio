import CollapseSnippet from '../components/CollapseSnippet';
import '../styles.css';
import '../doc.css';

function yel(s) {
    return <span className='yellow'>{s}</span>;
}

function Technology() {
    const cppRAII = `bool f(void) {
        std::string s = "Hello, World";
        // Do stuff with s...
        return true;
}`;

    const cRAII = `int f(void) {
        string s = string_from("Hello, World");
        // Do stuff with s...
        string_destroy(&s);
        return 1;
}`;

    const cppOOP=`class Expr {
public:
    virtual ~Expr() = default;
    virtual double evaluate() const = 0;
};

class Binary : public Expr {
private:
    Expr *left;
    Expr *right;
    char op;

public:
    Binary(Expr *left, char op, Expr *right);
    ~Binary();
    double evaluate() const override;
};

class Unary : public Expr {
private:
    Expr* expr;
    char op;

public:
    Unary(char op, Expr *expr);
    ~Unary();
    double evaluate() const override;
};`;

    const cOOP = `typedef enum {
        EXPR_KIND_BINARY = 0,
        EXPR_KIND_UNARY,
} expr_kind;

typedef struct {
        expr_kind kind;
} expr;

typedef struct {
        expr base;
        expr *left;
        char op;
        expr *right;
} binary;

typedef struct {
        expr base;
        char op;
        expr *expr;
} unary;

binary *
binary_alloc(expr *left, char op, expr *right)
{
        binary *bin = (binary *)malloc(sizeof(binary));
        ((expr *)bin)->kind = EXPR_KIND_BINARY;
        bin->left = left;
        bin->op = op;
        bin->right = right;
        return bin;
}

unary *
unary_alloc(char op, expr *expr)
{
        // similar to binary_alloc()
}

double
expr_evaluate(expr *e)
{
        double res = 0.;

        switch (e->kind) {
        case EXPR_KIND_BINARY: res = binary_evaluate((binary *)e); break;
        case EXPR_KIND_UNARY:  res = unary_evaluate((unary *)e);   break;
        default: {} break;
        }

        return res;
}`;

    return (
        <>
            <div>
                <h1>Languages of Choice: {yel('C')}, {yel('OCaml')}</h1>
                <h2>Why {yel('C')} and not {yel('C++')}?</h2>
                <p>
                    I prefer it for various reasons, but mainly because I value simplicity and explicitness
                    over layers of abstraction. Take {yel('std::vector<T>')} as an example. If you are just starting {yel('C++')}, all you know that it is
                    a useful container for a growable array. Behind the scenes however, there are several things that you need to be aware of
                    (if you are implementing containers for yourself).
                </p>
                <ul>
                    <li>Rule of 5 (if &gt;= {yel('C++11')}, otherwise Rule of 3)</li>
                    <li>Resource Acquisition is Initialization (RAII)</li>
                </ul>
                <p>
                    I am generally not a fan of this model. If I want something similar to this in {yel('C')}, you can do it via function signatures.
                    The following are some functions that I may implement:
                </p>
                    <ul>
                        <li>{yel('vector vector_create(void)')}</li>
                        <li>{yel('void vector_destroy(void)')}</li>
                        <li>{yel('vector vector_copy(const vector *)')}</li>
                        <li>{yel('vector vector_move(vector *)')}</li>
                        <li>{yel('void vector_take(vector *, uint8_t *)')}</li>
                    </ul>
                <p>
                    I prefer the "explicitness" of the {yel('C')} version. Refer to the following code:
                </p>
                    <h3>{yel('C++')} Version</h3>
                    <CollapseSnippet><div className='csnippet'>{cppRAII}</div></CollapseSnippet>
                    <h3>{yel('C')} Version</h3>
                    <CollapseSnippet><div className='csnippet'>{cRAII}</div></CollapseSnippet>

                <p>
                    The {yel('C')} version clearly shows that {yel('s')} is a non-primitive type, or a structure,
                    and that it (probably) allocates memory on the heap (inferred from {yel('string_destroy()')}).

                    While the {yel('C++')} version is less lines, it is less explicit. You cannot infer anything from it (unless you already know
                    the underlying data structure).
                </p>

                <aside className='note'>
                    Note: Any programmer can tell you that strings are almost always going to use the heap. I am just using it as an example.
                </aside>

                <p>
                    I am also not a fan of <a className='readme-link' href='https://en.wikipedia.org/wiki/Object-oriented_programming'>Object Oriented Programming ({yel('OOP')})</a>.
                    When using a language with OOP support, it can be very easy to put <i>everything</i> in an object to a point where you move away from <a className='readme-link' href='programming'>imperitive programming</a> and
                    go to OOP when it is not needed. Sure, a language may implement <a className='readme-link' href='https://stackoverflow.com/questions/69178380/what-does-zero-cost-abstraction-mean'>zero-cost-abstractions</a>, but it makes it more unreadable in my opinion.
                </p>

                <p>
                    However, there are times when OOP is wanted (or even needed).
                    One of these times may be when creating an <a className='readme-link' href='https://en.wikipedia.org/wiki/Abstract_syntax_tree'>Abstract Syntax Tree (AST)</a>.
                </p>

                <p>
                    As an example, lets define some rules:
                </p>
                <ul>
                    <li>
                        <div>Expression ({yel('expr')})</div>
                        <div className='indent'>type expr =</div>
                        <div style={{'paddingLeft': '60px'}}>| {yel('binary')}</div>
                        <div style={{'paddingLeft': '60px'}}>| {yel('unary')}</div>
                    </li>
                    <li>
                        <div>Unary Expression ({yel('unary')}) inherits from {yel('expr')}</div>
                        <div className='indent'>type unary =</div>
                        <div style={{'paddingLeft': '60px'}}>&#123; op : {yel('char')}</div>
                        <div style={{'paddingLeft': '60px'}}>, expr : {yel('expr')}</div>
                        <div style={{'paddingLeft': '60px'}}>&#125;</div>
                    </li>
                    <li>
                        <div>Binary Expression ({yel('binary')}) inherits from {yel('expr')}</div>
                        <div className='indent'>type binary =</div>
                        <div style={{'paddingLeft': '60px'}}>&#123; expr : {yel('expr')}</div>
                        <div style={{'paddingLeft': '60px'}}>, op : {yel('char')}</div>
                        <div style={{'paddingLeft': '60px'}}>, expr : {yel('expr')}</div>
                        <div style={{'paddingLeft': '60px'}}>&#125;</div>
                    </li>
                </ul>

                <aside className='note'>
                    Note: I have added more implementation for the {yel('C')} version for clarity.
                </aside>

                <p>

                    <h3>{yel('C++')} Version</h3>
                    <CollapseSnippet><div className='csnippet'>{cppOOP}</div></CollapseSnippet>
                    <h3>{yel('C')} Version</h3>
                    <CollapseSnippet><div className='csnippet'>{cOOP}</div></CollapseSnippet>
                    You can achieve something similar to OOP in {yel('C')} by using <a className='readme-link' href='https://en.wikipedia.org/wiki/Type_punning'>Type Pruning</a> and <a className='readme-link' href='https://stackoverflow.com/questions/42844423/writing-a-safe-tagged-union-in-c'>Tagged Unions</a>.
                </p>

                <p>
                    I am not saying that {yel('C')} is superior to {yel('C++')}, this is just my preference.
                </p>
            </div>

            <div>
                <h2>Why {yel('OCaml')}?</h2>
                <p>
                    I will sometimes use the functional paradigm to create projects because sometimes it is just
                    better for the situation (i.e., <a className='readme-link' href='https://en.wikipedia.org/wiki/Lexical_analysis'>lexical analysis</a>, <a className='readme-link' href='https://en.wikipedia.org/wiki/Parsing'>parsing</a>).
                </p>
                <p>
                    I perfer {yel('OCaml')} over {yel('Haskell')} because it provides the freedom to write imperatively when you need to.
                    However this make {yel('OCaml')} not a <i>purely</i> functional language.

                </p>
                <p>
                    One thing that I have learned from functional programming is that once you write a program, 90% of the time it will
                    work the way you want. However debugging is a nightmare if it does not.
                </p>
            </div>

            <div>
                <h1>Operating System of Choice</h1>
                <p>
                    I solely use {yel('Linux')} on all of my computers, and almost never run {yel('Windows')} or {yel('OSX')}.
                    For my distribution, I commonly switch between {yel('Gentoo')} and {yel('Debian')}, although I am currently experimenting
                    with <a className='readme-link' href='https://www.linuxfromscratch.org/lfs/'>Linux From Scratch</a>.
                </p>
            </div>

            <div>
                <h1>Editors of Choice</h1>
                <p>
                    This section really does not matter at all, but I want to put it on here anyways. I
                    use <a className='readme-link' href='https://www.gnu.org/software/emacs/'>Emacs</a> for the majority of the time but occasionally I will
                    use <a className='readme-link' href='https://www.vim.org/'>Vim</a>.
                </p>
            </div>
        </>
    );
}

export default Technology;
