// Confere o contraste (WCAG 2.x) de cada par texto/fundo dos temas Toski.
// Fundos com alpha são misturados sobre o fundo onde aparecem antes do cálculo.
// Uso: node scripts/contrast.mjs  (sai com código 1 se algum par obrigatório falhar)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIN = 4.5;

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const alpha = (h) => (h.length === 9 ? parseInt(h.slice(7, 9), 16) / 255 : 1);
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
// mistura uma ou mais camadas (com alpha) sobre uma base opaca
function over(base, ...layers) {
  let c = rgb(base);
  for (const l of layers) {
    const a = alpha(l), t = rgb(l);
    c = c.map((v, i) => v * (1 - a) + t[i] * a);
  }
  return hex(c);
}
function lum(h) {
  return rgb(h).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

let failures = 0;
const md = [];

for (const file of ['toski-dark-color-theme.json', 'toski-light-color-theme.json']) {
  const t = JSON.parse(fs.readFileSync(path.join(root, 'themes', file), 'utf8'));
  const c = t.colors;
  const bg = c['editor.background'];

  // Cor de cada categoria de sintaxe, lida das próprias regras do tema
  const byName = Object.fromEntries(t.tokenColors.map((r) => [r.name, r.settings.foreground]));
  const syntax = {
    'texto/variável': c['editor.foreground'],
    'palavra-chave': byName['Keyword'],
    'função': byName['Function'],
    'tipo/classe': byName['Type & class'],
    'string': byName['String'],
    'número/constante': byName['Number & constants'],
    'propriedade': byName['Property'],
    'comentário': byName['Comment'],
    'pontuação/operador': byName['Operators & punctuation'],
    'regex/escape': byName['String escape & interpolation'],
    'diff +': byName['Diff inserted'],
    'diff −': byName['Diff deleted'],
    'diff ~': byName['Diff changed'],
  };

  const editorBgs = {
    'fundo': bg,
    'linha atual': over(bg, c['editor.lineHighlightBackground']),
    'seleção': over(bg, c['editor.selectionBackground']),
    'seleção na linha atual': over(bg, c['editor.lineHighlightBackground'], c['editor.selectionBackground']),
    'seleção inativa': over(bg, c['editor.inactiveSelectionBackground']),
    'mesma seleção': over(bg, c['editor.selectionHighlightBackground']),
    'busca (atual)': over(bg, c['editor.findMatchBackground']),
    'busca (outras)': over(bg, c['editor.findMatchHighlightBackground']),
    'busca na linha atual': over(bg, c['editor.lineHighlightBackground'], c['editor.findMatchBackground']),
    'palavra destacada': over(bg, c['editor.wordHighlightBackground']),
    'palavra (escrita)': over(bg, c['editor.wordHighlightStrongBackground']),
    'bracket match': over(bg, c['editorBracketMatch.background']),
    'diff adicionado': over(bg, c['diffEditor.insertedLineBackground'], c['diffEditor.insertedTextBackground']),
    'diff removido': over(bg, c['diffEditor.removedLineBackground'], c['diffEditor.removedTextBackground']),
  };

  const side = c['sideBar.background'];
  const listActive = over(side, c['list.activeSelectionBackground']);
  const listHover = over(side, c['list.hoverBackground']);
  const listInactive = over(side, c['list.inactiveSelectionBackground']);
  const widget = c['editorWidget.background'];
  const status = c['statusBar.background'];

  // [texto, cor do texto, fundo, cor do fundo]
  const ui = [];
  const add = (fgName, fg, bgName, b) => ui.push([fgName, fg, bgName, b]);
  add('números de linha', c['editorLineNumber.foreground'], 'fundo', bg);
  add('número da linha atual', c['editorLineNumber.activeForeground'], 'linha atual', editorBgs['linha atual']);
  add('inlay hint / code lens', c['editorInlayHint.foreground'], 'fundo', bg);
  add('breadcrumb', c['breadcrumb.foreground'], 'fundo', c['breadcrumb.background']);
  for (const [n, k] of [['texto', 'sideBar.foreground'], ['texto secundário', 'descriptionForeground']]) {
    add(n, c[k], 'sidebar', side);
    add(n, c[k], 'item ativo da lista', listActive);
    add(n, c[k], 'hover da lista', listHover);
    add(n, c[k], 'seleção inativa da lista', listInactive);
    add(n, c[k], 'activity bar / títulos', c['activityBar.background']);
    add(n, c[k], 'widget (hover/sugestão/busca)', widget);
    add(n, c[k], 'sugestão selecionada', over(widget, c['editorSuggestWidget.selectedBackground']));
    add(n, c[k], 'painel/terminal', c['panel.background']);
    add(n, c[k], 'notificação', c['notifications.background']);
  }
  add('aba ativa', c['tab.activeForeground'], 'aba ativa', c['tab.activeBackground']);
  add('aba inativa', c['tab.inactiveForeground'], 'aba inativa', c['tab.inactiveBackground']);
  add('título da janela', c['titleBar.activeForeground'], 'title bar', c['titleBar.activeBackground']);
  add('placeholder', c['input.placeholderForeground'], 'input', c['input.background']);
  add('texto do input', c['input.foreground'], 'input', c['input.background']);
  add('barra de status', c['statusBar.foreground'], 'barra de status', status);
  add('barra de status', c['statusBarItem.hoverForeground'], 'barra de status (hover)', over(status, c['statusBarItem.hoverBackground']));
  add('botão', c['button.foreground'], 'botão', c['button.background']);
  add('botão', c['button.foreground'], 'botão (hover)', c['button.hoverBackground']);
  add('botão secundário', c['button.secondaryForeground'], 'botão secundário', c['button.secondaryBackground']);
  add('badge', c['badge.foreground'], 'badge', c['badge.background']);
  add('badge da activity bar', c['activityBarBadge.foreground'], 'badge', c['activityBarBadge.background']);
  for (const [n, b] of [['fundo', bg], ['sidebar', side], ['widget', widget], ['notificação', c['notifications.background']]])
    add('link', c['textLink.foreground'], n, b);
  add('match na lista', c['list.highlightForeground'], 'item ativo da lista', listActive);
  add('match na sugestão', c['editorSuggestWidget.highlightForeground'], 'sugestão selecionada', over(widget, c['editorSuggestWidget.selectedBackground']));
  for (const k of ['added', 'modified', 'deleted', 'untracked', 'renamed', 'conflicting', 'ignored', 'submodule']) {
    const fg = c[`gitDecoration.${k}ResourceForeground`];
    add(`git ${k}`, fg, 'sidebar', side);
    add(`git ${k}`, fg, 'item ativo da lista', listActive);
    add(`git ${k}`, fg, 'hover da lista', listHover);
  }
  for (const [n, k] of [['erro', 'errorForeground'], ['aviso', 'list.warningForeground'], ['info', 'editorInfo.foreground']]) {
    add(n, c[k], 'painel (Problems)', c['panel.background']);
    add(n, c[k], 'sidebar', side);
    add(n, c[k], 'item ativo da lista', listActive);
    add(n, c[k], 'widget', widget);
  }

  const rows = [];
  for (const [sn, sc] of Object.entries(syntax))
    for (const [bn, b] of Object.entries(editorBgs)) rows.push(['código', sn, sc, bn, b, true]);
  for (const [fn, fg, bn, b] of ui) rows.push(['interface', fn, fg, bn, b, true]);

  // Terminal: as cores 0 (preto) e 7/15 (branco) seguem a convenção ANSI e o iTerm2;
  // a cor que fica “perto do fundo” de cada tema não é usada para texto comum.
  const tb = c['terminal.background'];
  const isDark = t.type === 'dark';
  const exempt = isDark ? ['ansiBlack'] : ['ansiWhite', 'ansiBrightWhite'];
  rows.push(['terminal', 'texto', c['terminal.foreground'], 'terminal', tb, true]);
  for (const k of Object.keys(c).filter((k) => k.startsWith('terminal.ansi'))) {
    const n = k.replace('terminal.', '');
    rows.push(['terminal', n, c[k], 'terminal', tb, !exempt.includes(n)]);
  }
  rows.push(['terminal', 'texto', c['terminal.foreground'], 'seleção do terminal', over(tb, c['terminal.selectionBackground']), true]);

  console.log(`\n${t.name}`);
  md.push(`\n### ${t.name}\n\n| Grupo | Texto | Cor | Fundo | Cor do fundo | Contraste | |\n|---|---|---|---|---|---:|---|`);
  for (const [g, fn, fg, bn, b, required] of rows) {
    const r = ratio(fg, b);
    const ok = r >= MIN;
    if (!ok && required) failures++;
    const mark = ok ? 'ok' : required ? 'FALHA' : 'isento (ANSI)';
    if (!ok || process.argv.includes('--all'))
      console.log(`  ${mark.padEnd(13)} ${r.toFixed(2).padStart(5)}  ${g.padEnd(9)} ${fn.padEnd(26)} ${fg}  sobre ${bn} ${b}`);
    md.push(`| ${g} | ${fn} | \`${fg}\` | ${bn} | \`${b}\` | ${r.toFixed(2)} | ${mark} |`);
  }
  const req = rows.filter((r) => r[5]);
  const minRow = req.reduce((m, r) => (ratio(r[2], r[4]) < ratio(m[2], m[4]) ? r : m));
  console.log(`  ${rows.length} pares; menor obrigatório: ${ratio(minRow[2], minRow[4]).toFixed(2)} (${minRow[1]} sobre ${minRow[3]})`);

  // Nada de cor pura
  const pure = JSON.stringify(t).match(/#(000000|FFFFFF|000|FFF)(?![0-9A-F])/gi);
  if (pure) { console.log('  FALHA: cor pura encontrada', pure); failures++; }
}

if (process.argv.includes('--md')) fs.writeFileSync(path.join(root, 'scripts', 'contrast-report.md'), '# Relatório de contraste\n' + md.join('\n') + '\n');
console.log(failures ? `\n${failures} par(es) abaixo de ${MIN}:1` : `\nTodos os pares obrigatórios ≥ ${MIN}:1`);
process.exit(failures ? 1 : 0);
