// Paleta Toski — fonte única das cores dos dois temas.
// Cores com alpha (8 dígitos) são sempre cores desta paleta com transparência.

export const brand = {
  caramelo: '#DB9A5B',
  ferrugem: '#A9541F',
  creme: '#F4E4CC',
  papel: '#F7F1E8',
  carvao: '#231B17',
};

export const dark = {
  name: 'Toski Dark',
  type: 'dark',
  bg: '#231B17', // editor
  panel: '#1B1511', // activity bar, abas inativas, títulos
  side: '#2A201A', // sidebar
  border: '#43352B',
  fg: '#F1E6D8',
  fg2: '#AA9481', // texto secundário (#A8927F ajustado para 4,5:1 sobre o item ativo)
  lineNumber: '#A08A78',
  lineNumberActive: '#F1E6D8',
  accent: '#DB9A5B', // destaque da interface
  onAccent: '#231B17',
  link: '#DB9A5B',
  status: '#A9541F',
  onStatus: '#FFF8EE',
  lineHighlight: '#2E241D',
  listActive: '#3A2D23',
  selection: '#4A3A2E',
  cursor: '#DB9A5B',
  syntax: {
    keyword: '#DB9A5B',
    function: '#F4D3A8',
    type: '#8FB8C9',
    string: '#A9C98F',
    number: '#E39A8E',
    property: '#CDA6D0',
    comment: '#B5A496', // #A08A78 ajustado para 4,5:1 sobre a seleção
    punctuation: '#C2AE98',
    variable: '#F1E6D8',
    regexp: '#8CC7BA',
  },
  // Igual ao Toski Dark.itermcolors (toski-labs-iterm-theme)
  ansi: {
    black: '#43352B', red: '#E0705E', green: '#A9C98F', yellow: '#E8C26B',
    blue: '#8FB8C9', magenta: '#CDA6D0', cyan: '#8CC7BA', white: '#C2AE98',
    brightBlack: '#A08A78', brightRed: '#F09A78', brightGreen: '#C2DDB0', brightYellow: '#F2D693',
    brightBlue: '#B3D0DC', brightMagenta: '#E0C4E2', brightCyan: '#B0DBD1', brightWhite: '#F7F1E8',
  },
  terminal: { bg: '#231B17', fg: '#F1E6D8', cursor: '#DB9A5B', cursorText: '#231B17', selection: '#4A3A2E' },
  // Estados (erro, aviso, info, git) usam as cores ANSI da própria paleta
  error: '#F09A78', // vermelho bright do iTerm2 (passa sobre o item ativo da lista)
  warning: '#E8C26B',
  info: '#8FB8C9',
  success: '#A9C98F',
  git: {
    added: '#A9C98F', modified: '#E8C26B', deleted: '#F09A78', untracked: '#8CC7BA',
    conflict: '#CDA6D0', ignored: '#AA9481', submodule: '#8FB8C9', renamed: '#8CC7BA',
  },
  // Fundos com alpha (cor da paleta + transparência)
  alpha: {
    findMatch: '#DB9A5B2B', findMatchHighlight: '#DB9A5B1F', findRange: '#DB9A5B14',
    wordHighlight: '#8FB8C92B', wordHighlightStrong: '#CDA6D02B', selectionHighlight: '#4A3A2EB3',
    inactiveSelection: '#4A3A2EB3', bracketMatch: '#DB9A5B33',
    diffInsertedLine: '#A9C98F0F', diffInsertedText: '#A9C98F1F',
    diffRemovedLine: '#E0705E14', diffRemovedText: '#E0705E2B',
    hover: '#3A2D23B3', inactiveList: '#3A2D23B3', statusHover: '#231B1733',
    mergeCurrent: '#A9C98F33', mergeIncoming: '#8FB8C933', mergeCommon: '#C2AE9833',
    shadow: '#1B151199', rangeHighlight: '#DB9A5B14',
  },
};

export const light = {
  name: 'Toski Light',
  type: 'light',
  bg: '#FBF6EE',
  panel: '#EFE5D6',
  side: '#F5ECDF',
  border: '#E2D3BE',
  fg: '#231B17',
  fg2: '#6E5A4B',
  lineNumber: '#7A6556',
  lineNumberActive: '#231B17',
  accent: '#A9541F',
  onAccent: '#FFF8EE',
  link: '#994C1C', // ferrugem ajustado para texto (4,5:1 em todos os fundos)
  status: '#A9541F',
  onStatus: '#FFF8EE',
  lineHighlight: '#F7EFE3',
  listActive: '#EBDAC2',
  selection: '#EBDAC2',
  cursor: '#A9541F',
  syntax: {
    keyword: '#994C1C', // #A9541F ajustado para 4,5:1 sobre a seleção
    function: '#7A4A12',
    type: '#2F6185',
    string: '#3D6B39', // #3F6E3B ajustado para 4,5:1 sobre a seleção
    number: '#A23B3B',
    property: '#7A4E8C',
    comment: '#705D4F', // #7A6556 ajustado para 4,5:1 sobre a seleção
    punctuation: '#6B5648',
    variable: '#231B17',
    regexp: '#245C53', // ciano bright do iTerm2 (o normal fica abaixo de 4,5:1 sobre a seleção)
  },
  // Igual ao Toski Light.itermcolors (toski-labs-iterm-theme)
  ansi: {
    black: '#231B17', red: '#B23A2E', green: '#3F6E3B', yellow: '#8A6A00',
    blue: '#2F6185', magenta: '#7A4E8C', cyan: '#2E7468', white: '#E2D3BE',
    brightBlack: '#6E5A4B', brightRed: '#A3341A', brightGreen: '#33592F', brightYellow: '#6E5500',
    brightBlue: '#244C69', brightMagenta: '#633E72', brightCyan: '#245C53', brightWhite: '#FFFDF9',
  },
  terminal: { bg: '#FBF6EE', fg: '#231B17', cursor: '#A9541F', cursorText: '#FFF8EE', selection: '#EBDAC2' },
  // Estados usam as cores "bright" do iTerm2 claro, que são as mais escuras
  error: '#A3341A',
  warning: '#6E5500',
  info: '#244C69',
  success: '#33592F',
  git: {
    added: '#33592F', modified: '#6E5500', deleted: '#A3341A', untracked: '#245C53',
    conflict: '#633E72', ignored: '#6E5A4B', submodule: '#244C69', renamed: '#245C53',
  },
  alpha: {
    findMatch: '#DB9A5B40', findMatchHighlight: '#DB9A5B26', findRange: '#DB9A5B14',
    wordHighlight: '#2F618514', wordHighlightStrong: '#7A4E8C14', selectionHighlight: '#EBDAC2B3',
    inactiveSelection: '#EBDAC2B3', bracketMatch: '#DB9A5B33',
    diffInsertedLine: '#3F6E3B0F', diffInsertedText: '#3F6E3B1F',
    diffRemovedLine: '#B23A2E0F', diffRemovedText: '#B23A2E1A',
    hover: '#EBDAC299', inactiveList: '#EBDAC2B3', statusHover: '#231B1733',
    mergeCurrent: '#3F6E3B26', mergeIncoming: '#2F618526', mergeCommon: '#6B564826',
    shadow: '#231B172E', rangeHighlight: '#DB9A5B14',
  },
};
