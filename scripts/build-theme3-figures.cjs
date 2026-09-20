// Compile the TikZ fragments used by the French lessons; intermediates stay outside the repo.
const {execFile} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const {tmpdir} = require('node:os');

const root = process.cwd();
const sources = path.join(root, 'content/tex/figs-src/fr/theme3').replaceAll('\\', '/');
const output = path.join(root, 'content/tex/site-assets/figs/fr/theme3');
const build = fs.mkdtempSync(path.join(tmpdir(), 'quantum-theme3-figures-'));
const lessons = Array.from({length: 11}, (_,i) =>
  fs.readFileSync(path.join(root, `content/tex/theme3_fr/lecon${i + 1}.tex`), 'utf8')).join('\n');
const names = [...new Set([...lessons.matchAll(/\\input\{figs-src\/fr\/theme3\/(t3_l\d+_[a-z0-9_]+)(?:\.tex)?\}/g)].map(match => match[1]))];
if (!names.length) throw new Error('No theme 3 TikZ inputs found');
fs.mkdirSync(output, {recursive: true});
const preamble = String.raw`\documentclass[tikz,border=6pt]{standalone}
\usepackage[T1]{fontenc}\usepackage[utf8]{inputenc}\usepackage{lmodern}
\usepackage[french]{babel}\usepackage{amsmath,amssymb,mathtools}
\newcommand{\ket}[1]{\lvert #1\rangle}\newcommand{\bra}[1]{\langle #1\rvert}
\newcommand{\braket}[2]{\langle #1\mid #2\rangle}
\newcommand{\C}{\mathbb C}\newcommand{\R}{\mathbb R}\newcommand{\N}{\mathbb N}
\newcommand{\norm}[1]{\lVert #1\rVert}\newcommand{\transpose}[1]{{#1}^{\mathsf T}}
\AtBeginDocument{\renewcommand{\H}{\mathcal H}}
` + `\\input{${sources}/parametres}\n\\begin{document}\n`;

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
  await Promise.all(Array.from({length: 3}, async () => {
    while (next < names.length) {
      const name = names[next++];
      fs.writeFileSync(path.join(build, `${name}.tex`), preamble + `\\input{${sources}/${name}}\n\\end{document}\n`);
      try {
        await run('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', `${name}.tex`]);
        const log = fs.readFileSync(path.join(build, `${name}.log`), 'utf8');
        if (/Missing character:|Overfull \\[hv]box/.test(log)) throw new Error(`Typography warning in ${name}.log`);
        await run('pdftoppm', ['-png', '-r', '200', '-singlefile', `${name}.pdf`, path.join(output, name)]);
        console.log(`Rendered fr/theme3/${name}.png`);
      } catch (error) {
        failures.push(name);
        console.error(`${name}: ${error.message.slice(-1400)}`);
      }
    }
  }));
  console.log(`${names.length - failures.length}/${names.length} figures rendered. Logs: ${build}`);
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
