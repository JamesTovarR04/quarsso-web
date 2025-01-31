const typeEnum = [
  'feat', // Una nueva caracterestica o funcionalidad. Tendra correlacion con una version MINOR
  'fix', // Un error corregido. Tendra correlacion con una version PATCH
  'style', // Cambios que no afectan el significado del codigo (espacios en blanco, formato, puntos y comas faltantes, etc).
  'refactor', // Un cambio de codigo que no corrige un error ni agrega una caracteristica.
  'test', // Agregar pruebas faltantes o corregir pruebas existentes.
  'docs', // Cambios en la documentacion
  'ci', // Cambios en archivos y scripts de configuracion de integracion continua.
  'build', // Cambios que afectan el sistema de compilacion o dependencias externas,
  'chore', // Otros cambios que no afectan el codigo fuente.
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', typeEnum],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
  plugins: [
    {
      rules: {
        'type-enum': ({ type, subject }) => {
          if (typeEnum?.includes(type) && /^#\d+ /.test(subject)) {
            return [true];
          }
          return [
            false,
            !/^#\d+ /.test(subject)
              ? ` Commit message is incorrect 'Example: "feat: #21 change message" '.`
              : !typeEnum?.includes(type) &&
                `Los tipos pueden ser 'feat',
                            'fix',
                            'style',
                            'refactor',
                            'test',
                            'docs',
                            'ci',
                            'build',
                            'chore'`,
          ];
        },
      },
    },
  ],
};
