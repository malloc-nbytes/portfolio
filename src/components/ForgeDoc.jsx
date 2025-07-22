import "../doc.css";
import CollapseSnippet from './CollapseSnippet'

const forgeWalkthrough1 = `#include <forge/forge.h>

char *deps[] = {NULL}; // Must be NULL terminated

char *getname(void) { return "author@pkg_name"; }
char *getver(void) { return "1.0.0"; }
char *getdesc(void) { return "My Description"; }
char **getdeps(void) { return deps; }
char *download(void) {
        return NULL; // should return the name of the final directory!
}
void build(void) {}
void install(void) {}
void uninstall(void) {}
int update(void) {
        return 0; // return 1 if it needs a rebuild, 0 otherwise
}
void get_changes(void) {
        // Pull in changes if update() returns 1
}

FORGE_GLOBAL pkg package = {
        .name = getname,
        .ver = getver,
        .desc = getdesc,
        .deps = NULL,
        .download = download,
        .build = build,
        .install = install,
        .uninstall = uninstall,
        .update = forge_pkg_git_update, // or define your own if not using git

        // Make this NULL to just re-download the source code
        // or define your own if not using git
        .get_changes = forge_pkg_git_pull,
};`;

function yel(s) {
    return <span className='yellow'>{s}</span>;
}

function ForgeDoc() {
    return (
        <>
            <h1>Introduction</h1>
            <p>
                {yel('Forge')} is a package manager where you "forge" your own packages in the form
                of {yel('C')} source files. Every package that you want to install must have an
                associated {yel('C')} file that contains rules and functions on how to build, install, uninstall, etc.
                To help with this, a suite of functions and data structures are supplied as the {yel('forge API')}.
            </p>
            <h1>Getting Started</h1>
            <p>
                The first time you run {yel('forge')} must be as root. This sets up the database.
                All subsequent calls do not need it (unless the action has an {yel('R')} tag, see {yel('--help')} for more information).
            </p>
            <p>
                To begin creating a new package, run {yel('sudo forge new <pkg>')}. This will open an editor to start
                definining the package rules and behavior. When you are finished, save and quit.
            </p>
            <p>
                When new packages are added, they must be built with sudo {yel('forge --rebuild')}.
                This will compile them and show any errors if needed.
                If there are errors, you can run {yel('sudo forge edit <pkg>')} to start editing it again.
                When all of your packages have been compiled, run {yel('forge list')} to see all available.
            </p>
            <p>
                You can then run the following to install them: {yel('sudo forge install <pkg1> <pkg2>, ..., <pkgN>')}.
                If you want to remove them, run {yel('sudo forge uninstall <pkg1> ,pkg2>, ..., <pkgN>')}.
                If you want to update, do {yel('sudo forge update <pkg1> <pkg2>, ..., <pkgN>')} or have no arguments to update all of them.
            </p>
            <p>
                You will notice that there are packages already available when doing {yel('forge list')}. These were downloaded from
                the forge-modules repository. These cannot be edited, but can be updated by doing {yel('forge --rebuild --sync')} or {yel('forge -rs')}.
            </p>
            <h1>Walkthrough of Adding a New Project</h1>
            <p>
                Here is an example of how to add a package.
                I will add one of my packages called {yel('AnimX')}.
                Start the module with {yel('forge new malloc-nbytes@AnimX')}. This will generate the following:
            </p>
            <CollapseSnippet>
                <div className="csnippet">
                    {forgeWalkthrough1}
                </div>
            </CollapseSnippet>
        </>
    );
}

export default ForgeDoc;
