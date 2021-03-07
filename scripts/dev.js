import consola from 'consola'
import shell from 'shelljs'
import fs from 'fs-extra'
import { resolve } from 'path'

export default async function  run () {
    const rootDir = process.cwd()
    const argv  = process.argv.slice(2)
    if (argv.includes('web')) {

        consola.info('执行', argv[0])
        
        process.argv.splice(2)

        let execPtah = resolve(rootDir, 'packages/web')
        fs.ensureDir(execPtah).then(() => {
            consola.success('找到web/package目录')
            
            if (shell.which('npm')) {
                shell.cd(execPtah)
                const child_process = shell.exec('npm run dev',{ async: true })
                child_process.stdout.on('data', (data) => {
                    consola.info('callbackData', data)
                })
            }
        }).catch(e => {
            consola.error(e)
            shell.exit(1)
        })
        
    }
}

run()