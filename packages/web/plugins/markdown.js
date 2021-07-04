import MarkdownIt from 'markdown-it'
import prism from 'prismjs'

import 'prismjs/themes/prism-okaidia.css'

// import loadLanguages from 'prismjs/components/index'

// loadLanguages(['markup', 'css', 'javascript','jq', 'php', 'scss', 'jsx'])
// loadLanguages(['markup', 'css', 'javascript'])

function wrap(code, lang) {
    if (lang === 'text') {
        // code = escapeHtml(code)
    }
    return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}
const md = new MarkdownIt({
    breaks: true,
    highlight(str, lang) {
        if (!lang) {
            return wrap(str, 'text')
        }
        if (!prism.languages[lang]) {
            try {
              loadLanguages([lang])
            } catch (e) {
                console.log('不支持高亮', e)
            }
          }
        if (prism.languages[lang]) {
            const code = prism.highlight(str, prism.languages[lang], lang)
            return wrap(code, lang)
        }
        return wrap(str, 'text')
    }
})

export default md
