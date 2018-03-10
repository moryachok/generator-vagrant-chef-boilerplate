'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const prompt = require('./prompt');

// Load prompts
const PromptLinux   = new prompt.linux();
const PromptVagrant = new prompt.vagrant();

module.exports = class extends Generator {
    initializing() {
      this.log(chalk.cyan('Welcome to the Yeoman Generator to create Vagrant development environment!'));
    }
    
    askForVagrantSettings(){
      return this.prompt(PromptVagrant.MainPrompt).then((answers)=>{
        this.VmName             = answers.VmName;
        this.VmPrivateIp        = answers.VmPrivateIp;
        this.VmMemory           = answers.VmMemory;
        this.VmCpus             = answers.VmCpus;
        this.VmRole             = answers.VmRole;
      })

    }
    

    askForLinuxSettings(){
      return this.prompt(PromptLinux.MainPrompt).then((answers)=>{
        this.VmImageName = answers.VmImageName;
      })
    }
    
    
    askForSoftware(){
      return this.prompt(PromptLinux.SoftwarePrompt).then((answers)=>{
        this.SoftwareGit        = answers.VmSoftware.includes('git');
        this.SoftwareTree       = answers.VmSoftware.includes('tree');
        this.SoftwareWget       = answers.VmSoftware.includes('wget');
        this.SoftwareZip        = answers.VmSoftware.includes('zip');
        this.VmChefRecipes      = answers.VmChefRecipes;
      })
 
    }
    
    askForRecipes(){
      if (this.VmChefRecipes) {
        return this.prompt(PromptLinux.ChefRecipesPrompt).then((answers)=>{
          this.docker     = answers.ChefRecipes.includes('docker');
          this.nodejs     = answers.ChefRecipes.includes('nodejs');
        })
      } 
    }
    
    
    createVagrantfile(){
      this.fs.copyTpl(
        this.templatePath('Vagrantfile'), 
        "Vagrantfile",
        {
          VmImageName: this.VmImageName, 
          VmName: this.VmName,
          VmPrivateIp: this.VmPrivateIp,
          VmMemory: this.VmMemory,
          VmCpus: this.VmCpus,
          VmRole: this.VmRole
        }
      );
    }
    
    createChefConfiguration(){
      let options = {
        role: this.VmRole
      };
      
      options.recipes = [];
      if(this.docker) options.recipes.push("docker");
      if(this.nodejs) options.recipes.push("nodejs");
      
      this.composeWith(require.resolve('../chef'), options);
    }
    
    
};



