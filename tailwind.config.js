const plugin = require('tailwindcss/plugin')

// tailwind.config.js
const isProduction = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
module.exports = {
  variants: {
    'bg-none': ['important'],
    'p-0': ['important'],
    'border-4': ['important'],
    'h-12': ['important'],
    'ml-20': ['important']
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
        'smallBase': "url('/icons/smallBase.png')",
        'base': "url('/icons/base.png')",
        'worker': "url('/icons/worker.png')",
        'science': "url('/icons/science.png')",
        'barracks': "url('/icons/barracks.png')",
        'expedition': "url('/icons/expedition.png')",
        'save': "url('/icons/save.png')",
        'greenCheckmark': "url('/icons/greenCheckmark.png')"
      })
    }
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    }),
  ],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include HTML files
      // "./src/**/*.html"
    ], 
    enabled: isProduction // disable purge in dev
  },
  important: true
};