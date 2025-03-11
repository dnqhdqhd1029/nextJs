// lint-staged.config.js
module.exports = {
  // TypeScript 파일에 대한 타입 체크
  '**/*.(ts|tsx)': () => 'npm run tsc -- --noEmit',

  // TypeScript 및 JavaScript 파일 Lint 그리고 포맷
  '**/*.(ts|tsx|js)': () => 'npm run lint:fix',

  // MarkDown 및 JSON 포맷
  '**/*.(md|json)': filenames => `npm run prettier -- --write ${filenames.join(' ')}`,
}
