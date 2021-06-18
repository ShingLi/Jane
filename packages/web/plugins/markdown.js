import MarkdownIt from 'markdown-it'
import prism from 'prismjs'

// import Prism  from 'markdown-it-prism'
// import Prism from 'prismjs'
// import 'prismjs/themes/prism-dark.css'
import 'prismjs/themes/prism-okaidia.css'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/dark.css'
// import 'highlight.js/styles/monokai.css'
function wrap(code, lang) {
    // if (lang === 'text') {
    //     code = escapeHtml(code)
    // }
    return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}
const md = new MarkdownIt({
    breaks: true,
    highlight(str, lang) {
        if (prism.languages[lang]) {
            const code = prism.highlight(str, prism.languages[lang], lang)
            return wrap(code, lang)
        }
    }
})

// 代码块中增加类名
// md.use(Prism)

export default md
