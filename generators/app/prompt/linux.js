'use strict';

/**
 * Linux prompt definitions
 * @return {object}
 */
var linux = module.exports = (function () {
    this.MainPrompt = [{
        type: 'list',
        name: 'VmImageName',
        message: 'Select the Box Image',
        default: 1,
        choices: [{
            name: 'ubuntu/trusty64 - Official Ubuntu Server 14.04 LTS (Trusty Tahr) builds',
            value: 'ubuntu/trusty64'
        },{
            name: 'bento/ubuntu-16.04 - Ubuntu Trusty 16.04 LTS x64',
            value: 'bento/ubuntu-16.04'
        }]
    }];

    this.SoftwarePrompt = [{
        type: 'checkbox',
        name: 'VmSoftware',
        message: 'Select your Software Packages',
        choices: [{
            name: 'Git',
            value: 'git',
            checked: true
        },{
            name: 'Tree',
            value: 'tree',
            checked: true
        },{
            name: 'Wget',
            value: 'wget',
            checked: true
        },{
            name: 'zip & unzip',
            value: 'zip',
            checked: true
        }]
    },{
        type: 'confirm',
        name: 'VmChefRecipes',
        message: 'Would you like to add some recipes?',
        default: 'Y/n'
    }];


    this.ChefRecipesPrompt = [{
        type: 'checkbox',
        name: 'ChefRecipes',
        message: 'Select Chef recipes',
        choices: [{
            name: 'Docker',
            value: 'docker',
            checked: false
        },{
            name: 'NodeJS',
            value: 'nodejs',
            checked: false
        }]
    }];
});