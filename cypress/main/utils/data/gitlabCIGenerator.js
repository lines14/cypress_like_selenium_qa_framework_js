const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const JSONLoader = require('./JSONLoader');

const testSuites = JSONLoader.testSuitesNames;
const jobs = testSuites.map((suite) => ({
  [`e2e tests ${suite}`]: {
    image: 'lines14/cypress-java-dind:latest',
    stage: 'test',
    variables: {
      DOCKER_HOST: 'tcp://docker:2375',
      DOCKER_TLS_CERTDIR: '',
      DOCKER_DRIVER: 'overlay2',
      DOCKER_DAEMON_TIMEOUT: 600,
    },
    only: [
      'dev',
    ],
    services: [
      {
        name: 'docker:dind',
        command: ['--tls=false', '--host=tcp://0.0.0.0:2375'],
      },
    ],
    needs: [],
    tags: [
      'k8s',
    ],
    before_script: [
      // eslint-disable-next-line no-template-curly-in-string
      'echo "${AMANAT24_TEST}" | tr -d "\r" > ./.env.test',
      'docker login --username $USER --password $PASS registry.gitlab.com',
      'npm ci --prefix ./cypress',
      'npm run lint --prefix ./cypress',
    ],
    script: [
      'npm run start:ci --prefix ./cypress',
      `file=${suite} npm run test --prefix ./cypress`,
    ],
    artifacts: {
      when: 'always',
      expire_in: '1 month',
      paths: [
        'cypress/artifacts',
        'cypress/screenshots',
        'cypress/videos',
        'cypress/resources/data/configData.json',
        'cypress/resources/data/testClients.json',
        'cypress/resources/data/testCars.json',
      ],
    },
  },
}));

const gitlabCIConfig = Object.assign({}, ...jobs);

fs.writeFileSync(
  path.join(__dirname, '..', '..', '..', '..', '.split-config.yml'),
  YAML.dump(gitlabCIConfig),
);
