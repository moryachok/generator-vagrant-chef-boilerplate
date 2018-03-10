log 'message' do
  message 'This was generated with `yo vagrant-chef-boilerplate`'
  level :info
end

execute "apt-get-update" do
  command "apt-get update"
end

['tree','wget','git', 'zip', 'unzip', 'python-pip', 'build-essential'].each do |p|
  package p do
    action :install
  end
end

