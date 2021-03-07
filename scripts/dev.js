import fs from 'fs-extra'
import consola from 'consola'

export default async function  run () {
    const argv  = process.argv.slice(2)
    if (argv.includes('web')) {
        consola.info('执行', argv[0])
        process.argv.splice(2)
        
    }
}

run()