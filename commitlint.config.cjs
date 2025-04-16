// build: Changes that affect the build system or external dependencies (e.g., gulp, broccoli, npm).
// ci: Changes to CI/CD configuration files or scripts (e.g., Travis, CircleCI, BrowserStack, SauceLabs).
// docs: Documentation-only changes, without modifying any source code.
// feat: A new feature added to the codebase.
// fix: A bug fix in the code.
// perf: Code changes that improve performance without altering functionality.
// refactor: Code restructuring without changing existing functionality or fixing bugs.
// style: Changes that do not affect logic, such as formatting, whitespace, or missing semicolons.
// test: Adding or updating test cases without modifying production code.
// translation: Changes that update translations.
// security: Changes that improve security.
// changeset: Changes that update the changelog.

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset'
      ]
    ]
  }
}
