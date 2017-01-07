Vagrant.configure("2") do |config|

  config.vm.box = "bento/ubuntu-16.10"
  config.vm.network :forwarded_port, guest: 8081, host: 8081 
  config.vm.network :forwarded_port, guest: 27017, host: 27017 

  config.ssh.username = 'vagrant'
  config.ssh.password = 'vagrant'

  config.vm.synced_folder '.', '/vagrant'

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    # max 75% CPU cap
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "75"]
    # 2GB ram
    v.memory = 2048
    v.customize ["setextradata", :id, 
                 "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]
  end

  config.vm.provision :chef_solo do |chef|
    chef.add_recipe "nodejs"
    chef.add_recipe "mongodb::default"
    chef.json = {
      "nodejs" => {
        "install_method" => "binary",
        "binary" => {
          "checksum" => "d4eb161e4715e11bbef816a6c577974271e2bddae9cf008744627676ff00036a"
        },
        "version" => "7.3.0"
      },
      "mongodb" => {
        "port" => "27017",
        "dbpath"  => "/var/lib/mongodb",
        "logpath" => "/var/log/mongodb"
      },
    }
  end
end
