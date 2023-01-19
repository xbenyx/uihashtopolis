
export const DEFAULT_CONFIG = {
  prodApiEndpoint: 'https://crackz.one/api/v2',
  prodApiPort: '8080',
  frontEndUrl: 'https://crackz.one/',
  prodApiMaxResults: '3000',
  devApiEndpoint: 'http://localhost:3000',
  agentURL: '/api/server.php',
  agentdownloadURL: '/agents.php?download=',
  appName: 'Hashtopolis V1',
  favicon: 'assets/img/favicon.ico',
  header: {
    brand: {
      logo: 'assets/img/logo_alter_1.png',
      name: '',
      height: '60',
      width: '70'
    },
  },
  footer:{
    copyright: 's3in!c Hashtopolis: 0.12.0 commit 0cabad9 branch h2p',
    footer_link_one: {
      link: 'https://github.com/hashtopolis/server',
      name: 'Github'
    },
    footer_link_two: {
      link: '',
      name: 'About'
    },
    footer_link_three: {
      link: '',
      name: 'Help'
    }
  },
  tasks:{
    priority: 0,
    maxAgents: 0,
    chunkTime: 600,
    chunkSize: 0,
    statusTimer: 5,
  },
  // File settings
  chunkSizeTUS: 5000,
};


