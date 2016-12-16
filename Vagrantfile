# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.network :forwarded_port, guest: 8081, host: 8081 
  config.vm.network :forwarded_port, guest: 27017, host: 27017 

  config.vm.synced_folder '.', '/vagrant'

  config.vm.provision :shell, path: 'bootstrap.sh', keep_color: true

  config.vm.provider "virtualbox" do |v|
    v.name = "MEAN16-BankinIt"
    # max 75% CPU cap
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "75"]
    # 2GB ram
    v.memory = 2048
    v.customize ["setextradata", :id, 
                  "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]

  end

end
