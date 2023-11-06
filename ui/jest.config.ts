import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['node_modules/(?!(react-markdown)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
