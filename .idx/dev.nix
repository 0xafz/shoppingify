{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.openssl
    pkgs.nodejs_20
    pkgs.yarn
  ];

  services = {
    mysql = {
      enable = true;
    };
  };

  idx.extensions = [
    "vscodevim.vim"
    "esbenp.prettier-vscode"
  ];
  
  # Sets environment variables in the workspace
  env = {
    DATABASE_URL = "mysql://root@localhost:3306/database1";
    SHADOW_DATABASE_URL = "mysql://root@localhost:3306/database2";
    JWT_SECREET = "sdfjsdfjd";
  };

  # idx.previews = {
  #   previews = {
  #     web = {
  #       command = [
  #         "npm"
  #         "run"
  #         "dev"
  #         "--"
  #         "--port"
  #         "$PORT"
  #         "--hostname"
  #         "0.0.0.0"
  #       ];
  #       manager = "web";
  #     };
  #   };
  # };
  

  # Workspace lifecycle hooks
  idx.workspace =  {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "yarn install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # start-db = "mysql";
        # Example: start a background task to watch and re-build backend code
        # start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
        init-db = "bash .idx/init-db.sh";
        build = "yarn p:gen && yarn p:mig dev && yarn build";
      };
    };
}