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

const forgeWalkthrough2 = `#include <forge/forge.h>

char *getname(void) { return "malloc-nbytes@AnimX"; }
char *getver(void) { return "1.0.0"; }
char *getdesc(void) { return "Animated Wallpapers for X"; }
char *download(void) {
        // This download() function must return the name
        // of the directory that gets downloaded. The result
        // of git_clone() will return "AnimX". You could also do:
        //  char *download(void) {
        //    cmd("git clone https://www.github.com/malloc-nbytes/AnimX.git");
        //    return "AnimX";
        //  }
        return git_clone("malloc-nbytes", "AnimX");
}
void build(void) {
        cmd("autoreconf --install");
        configure("./", NULL);
        make(NULL);
}
void install(void) {
        make("install");
}
void uninstall(void) {
        make("uninstall");
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
        .update = forge_pkg_git_update, // using default git update

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
                <CollapseSnippet>
                    <div className="csnippet">{forgeWalkthrough1}</div>
                </CollapseSnippet>


            <h1>Introduction</h1>
            <CollapseSnippet>
                <p>
                    {yel('Forge')} is a package manager where you "forge" your own packages in the form
                    of {yel('C')} source files. Every package that you want to install must have an
                    associated {yel('C')} file that contains rules and functions on how to build, install, uninstall, etc.
                    To help with this, a suite of functions and data structures are supplied as the {yel('forge API')}.
                </p>
            </CollapseSnippet>
            <h1>Getting Started</h1>
            <CollapseSnippet>
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
            </CollapseSnippet>
            <h1>Walkthrough of Adding a New Project</h1>
            <CollapseSnippet>
                <p>
                    Here is an example of how to add a package.
                    I will add one of my packages called {yel('AnimX')}.
                    Start the module with {yel('forge new malloc-nbytes@AnimX')}. This will generate the following:
                </p>
                <CollapseSnippet>
                    <div className="csnippet">{forgeWalkthrough1}</div>
                </CollapseSnippet>
                <p>
                    Start filling out the missing fields. Also fill out how to build, install, uninstall, and (optionally) update.
                </p>
                <CollapseSnippet>
                    <div className="csnippet">{forgeWalkthrough2}</div>
                </CollapseSnippet>
                <p>
                    I have decided to get rid of the update() function because, since this is a git repo, we can use
                    the {yel('forge_pkg_git_update()')} provided by {yel('forge/pkg.h')} (included by {yel('forge/forge.h')}).
                </p>
                <p>
                    If you were to create your own {yel('update()')} function, it must return {yel('1')} if it should get the
                    new changes and rebuild, and {yel('0')} if otherwise.
                    If you do not know any of the other functions that are being used
                    i.e., {yel('cmd()')}, {yel('make()')}, {yel('configure()')},
                    run {yel('forge api-list')} and then {yel('forge api <api_name>')} to see documentation.
                </p>
                <p>
                    Once you are done with your package, call {yel('forge --rebuild')} or {yel('forge -r')} to rebuild all {yel('C')} modules.
                    If there are any errors, they will be reported. If you need to fix anything, do {yel('forge edit <pkgname>')}.
                </p>
                <p>
                    You should now see your new package available by running {yel('forge list')}.
                    To get rid of it, run {yel('forge drop <pkgname>')}. This will create a backup and you can
                    use {yel('forge restore <pkgname>')} to get it back.
                </p>
            </CollapseSnippet>
            <h1>Rules</h1>
            <CollapseSnippet>
                <p>
                    When creating a {yel('C')} module, there are some rules and assumptions that must be kept in mind:
                    <ul>
                        <li>For your package to be visible, you must put {yel('FORGE_GLOBAL')} aka {yel('__attribute__((visibility("default")))')} before
                        the {yel('pkg')} struct definition</li>
                        <li>The dependencies array ({yel('char **')}) must be {yel('NULL')} terminated</li>
                        <li>{yel('pkg->download()')} is guaranteed to be the first function that runs when doing {yel('forge install')}</li>
                        <li>All memory allocated in {yel('pkg')} functions needs to be manually {yel('free()')}'d</li>
                        <li>
                            You may assume that you are inside of the directory where the package
                            source code resides for the following functions:
                            <ul>
                                <li>{yel('pkg->build()')}</li>
                                <li>{yel('pkg->install()')}</li>
                                <li>{yel('pkg->uninstall()')}</li>
                                <li>{yel('pkg->update()')}</li>
                                <li>{yel('pkg->get_changes()')}</li>
                            </ul>
                        </li>
                        <li>{yel('pkg->update')} must return {yel('1')} if it should be updated (i.e., the [git] remote hash != local hash), and {yel('0')} if not.</li>
                        <li>{yel('pkg->get_changes')} will run if {yel('pkg->update')} returns {yel('1')}.</li>
                        <li>
                            The functions
                            <ul>
                                <li>{yel('pkg->update')}</li>
                                <li>{yel('pkg->get_changes')}</li>
                            </ul>
                            are allowed to be {yel('NULL')} -- use {yel('forge_pkg_update_manual_check')} and {yel('forge_pkg_get_changes_redownload')} if you can.
                        </li>
                        <li>
                            If {yel('pkg->update()')} is {yel('NULL')}, then it will not do any update checking and it will prompt
                            the user to check for updates manually.
                        </li>
                        <li>
                            If {yel('pkg->get_changes()')} is {yel('NULL')}, then it will delete the cached source code and reinstall it.
                        </li>
                    </ul>
                </p>
            </CollapseSnippet>
        </>
    );
}

export default ForgeDoc;
