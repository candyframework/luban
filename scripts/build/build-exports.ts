const tree: Record<string, string> = {
    '.': './mod.ts',
};

const blackList = [
    '.git',
    '.vscode',
    '.gitignore',
    'scripts',
    'mod.ts',
    'deno.json',
    'LICENSE',
    'README.md',
];

export default async function build(dir: string) {
    const entries = Deno.readDir(dir);
    for await (const entry of entries) {
        if (blackList.includes(entry.name)) {
            continue;
        }

        if (entry.name === '.' || entry.name === '..' || entry.name === '.DS_Store') {
            continue;
        }

        const full = dir + '/' + entry.name;
        if (entry.isFile) {
            let key = full;
            if (key.endsWith('.ts')) {
                // Remove the file extension
                key = key.slice(0, -3);
            }
            tree[key] = full;
        } else if (entry.isDirectory) {
            await build(full);
        }
    }
}

build('.').then(() => {
    console.log(tree);
});
