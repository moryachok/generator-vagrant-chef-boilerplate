apt_repository 'docker' do
  uri 'https://download.docker.com/linux/ubuntu'
  components ['stable']
  action :add
  arch "amd64"
  key "https://download.docker.com/linux/ubuntu/gpg"
  notifies :run, 'execute[apt-get-update]', :immediately
  not_if { ::File.exists?("/etc/apt/sources.list.d/docker.list") }
end

package 'docker-ce' do
  action :install
  notifies :run, 'apt_repository[docker]', :before
end

service 'docker' do
  supports status: true
  action [:enable, :start]
end

group 'docker' do
  members [node[:app][:group][:name]]
  action :create
  append true
end

execute 'install_docker_compose' do
  command 'pip install docker-compose'
  action :run
end
