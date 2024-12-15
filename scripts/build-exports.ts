const tree: Record<string, string> = {
    '.': './src/mod.ts',
};

export default async function build(dir: string) {
    const entries = Deno.readDir(dir);
    for await (const entry of entries) {
        if (entry.name === '.' || entry.name === '..' || entry.name === '.DS_Store') {
            continue;
        }

        if (entry.name === 'mod.ts') {
            continue;
        }

        const full = dir + '/' + entry.name;
        if (entry.isFile) {
            let key = full.replace('/src/', '/');
            if (key.endsWith('.ts')) {
                key = key.slice(0, -3);
            }
            tree[key] = full;
        } else if (entry.isDirectory) {
            await build(full);
        }
    }
}

build('./src').then(() => {
    console.log(tree);
});
