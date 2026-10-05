// Compile the TikZ fragments used by one language's lessons; intermediates stay outside the repo.
const {execFile} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const {tmpdir} = require('node:os');

const root = process.cwd();
const lang = process.argv.find(arg => arg.startsWith('--lang='))?.slice(7) || 'fr';
if (!['fr', 'en'].includes(lang)) throw new Error(`Unsupported theme 3 figure language: ${lang}`);
const jobs = Number(process.argv.find(arg => arg.startsWith('--jobs='))?.slice(7) || 3);
if (!Number.isInteger(jobs) || jobs < 1) throw new Error(`Invalid job count: ${jobs}`);
const sources = path.join(root, `content/tex/figs-src/${lang}/theme3`).replaceAll('\\', '/');
const output = path.join(root, `content/tex/site-assets/figs/${lang}/theme3`);
const build = fs.mkdtempSync(path.join(tmpdir(), 'quantum-theme3-figures-'));
const lessonDirectory = path.join(root, `content/tex/theme3_${lang}`);
const lessonPrefix = lang === 'fr' ? 'lecon' : 'lesson';
const lessons = fs.readdirSync(lessonDirectory)
  .filter(name => new RegExp(`^${lessonPrefix}\\d+\\.tex$`).test(name))
  .map(name => fs.readFileSync(path.join(lessonDirectory, name), 'utf8'))
  .join('\n');
const names = [...new Set([...lessons.matchAll(/\\input\{figs-src\/fr\/theme3\/(t3_l\d+_[a-z0-9_]+)(?:\.tex)?\}/g)].map(match => match[1]))];
if (!names.length) throw new Error('No theme 3 TikZ inputs found');
fs.mkdirSync(output, {recursive: true});
const preamble = String.raw`\documentclass[tikz,border=6pt]{standalone}
\usepackage[T1]{fontenc}\usepackage[utf8]{inputenc}\usepackage{lmodern}
\usepackage[${lang === 'fr' ? 'french' : 'english'}]{babel}\usepackage{amsmath,amssymb,mathtools}
\newcommand{\ket}[1]{\lvert #1\rangle}\newcommand{\bra}[1]{\langle #1\rvert}
\newcommand{\braket}[2]{\langle #1\mid #2\rangle}
\newcommand{\C}{\mathbb C}\newcommand{\R}{\mathbb R}\newcommand{\N}{\mathbb N}
\newcommand{\norm}[1]{\lVert #1\rVert}\newcommand{\transpose}[1]{{#1}^{\mathsf T}}
\AtBeginDocument{\renewcommand{\H}{\mathcal H}}
` + `\\input{${path.join(root, 'content/tex/figs-src/fr/theme3/parametres').replaceAll('\\', '/')}}\n\\begin{document}\n`;

function run(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, {cwd: build, timeout: 120000, maxBuffer: 10e6}, (error, stdout, stderr) => {
      if (error) reject(new Error(`${command}: ${stdout}\n${stderr}`));
      else resolve();
    });
  });
}

(async () => {
  let next = 0;
  const failures = [];
  await Promise.all(Array.from({length: jobs}, async () => {
    while (next < names.length) {
      const name = names[next++];
      fs.writeFileSync(path.join(build, `${name}.tex`), preamble + `\\input{${sources}/${name}}\n\\end{document}\n`);
      try {
        await run('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', `${name}.tex`]);
        const log = fs.readFileSync(path.join(build, `${name}.log`), 'utf8');
        if (/Missing character:|Overfull \\[hv]box/.test(log)) throw new Error(`Typography warning in ${name}.log`);
        await run('pdftoppm', ['-png', '-r', '200', '-singlefile', `${name}.pdf`, path.join(output, name)]);
        console.log(`Rendered ${lang}/theme3/${name}.png`);
      } catch (error) {
        failures.push(name);
        console.error(`${name}: ${error.message.slice(-1400)}`);
      }
    }
  }));
  console.log(`${names.length - failures.length}/${names.length} figures rendered. Logs: ${build}`);
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
