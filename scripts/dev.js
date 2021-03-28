import consola from 'consola'
import shell from 'shelljs'
import fs from 'fs-extra'
import { resolve } from 'path'
import inquirer from 'inquirer'


async function exec () {
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            message: '启动',
            name: 'server',
            prefix: 'Jane/server'
        },
        {
            type: 'confirm',
            message: '是否启动',
            name: 'web',
            prefix: 'Jane/web'
        },
        {
            type: 'confirm',
            message: '是否启动',
            name: 'admin',
            prefix: 'Jane/admin',
            default: false
        },
    ])
    
    for (let k in answer) {
        
    }
}

exec().catch(e => {
    consola.error(e)
    process.exit(1)
})