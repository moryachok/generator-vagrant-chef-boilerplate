# installing NodeJS

bash 'installing nvm' do
  guard_interpreter :bash
  user 'root'
  environment 'PROFILE' => "/etc/profile", 
              'NVM_DIR' => "/usr/local/nvm" ,
              "NODE_VERSION" => node[:app]["node_version"]
  cwd '/tmp'
  code <<-EOH
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
  source /etc/profile
  EOH
  not_if "command -v nvm"
end


['nodemon'].each do |p|
  bash "npm install #{p}" do
    code <<-EOH
      source /etc/profile
      npm install #{p} -g
    EOH
    not_if { File.exist?("/usr/local/nvm/versions/node/v#{node[:app][:node_version]}/lib/node_modules/#{p}") }
  end
end





