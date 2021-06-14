import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'

import 'prismjs/themes/prism-okaidia.css'

const md = new MarkdownIt({

})

// 代码块中增加类名
// md.use(Prism)

export default md
