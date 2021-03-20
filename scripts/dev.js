import consola from 'consola'
import shell from 'shelljs'
import fs from 'fs-extra'
import { resolve } from 'path'
import inquirer from 'inquirer'


const exec = () => {
    console.clear()
    inquirer.prompt([
        {
            type:'list',
            name: 'Jane',
            message: '请选择要启动的项目',
            choices: [
                'web',
                'admin',
                'server'
            ],
            default: 'web'
        }
    ]).then(answers => {
        consola.info(answers)
    }).catch(e => {
        consola.error(e)
    })
    
}

exec()