'use strict';

const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  
  initializing() {
    this.log(chalk.green('Chef configuration started!'));
    this.role = this.options.role;
    this.recipes = this.options.recipes.map(recipe=>`recipe[main::${recipe}]`);
  }
  
  createDirectoriesStructure(){
    let dirList = [
      "/chef/roles",
      "/chef/environments",
      "/chef/cookbooks/main/recipes",
      "/chef/cookbooks/main/attributes",
      "/chef/cookbooks/main/templates"
    ];
    dirList.forEach((dir) => {
      mkdirp.sync(this.contextRoot + dir)
    });
  }
  
  createRoleFile(){
    let roleJson = this.fs.readJSON(this.templatePath("roles/role.json"));
    roleJson.name = this.role;

    roleJson.env_run_lists.development = roleJson.env_run_lists.development.concat(this.recipes);
    roleJson.env_run_lists.production  = roleJson.env_run_lists.development.slice();
    this.fs.write(
      this.destinationPath(`${this.contextRoot}/chef/roles/${this.role}.json`),
      JSON.stringify(roleJson)
    );
  }
  
  createEnvironmentFiles(){
    ["development", "production"].forEach((env) => {
      this.fs.copy(
        this.templatePath(`environments/${env}.rb`),
        this.destinationPath(`${this.contextRoot}/chef/environments/${env}.rb`)
      );
    });
  }
  
  createAttributesFile(){
    this.fs.copy(
      this.templatePath("cookbooks/main/attributes/default.rb"),
      this.destinationPath(`${this.contextRoot}/chef/cookbooks/main/attributes/default.rb`)
    );
  }
  
  createRecipesFiles(){
    let recipes = ["default"].concat(this.options.recipes);
    recipes.forEach((recipe)=>{
      this.fs.copy(
        this.templatePath(`cookbooks/main/recipes/${recipe}.rb`),
        this.destinationPath(`${this.contextRoot}/chef/cookbooks/main/recipes/${recipe}.rb`)
      );
    });
  }
  
  
}






