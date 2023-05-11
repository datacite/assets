# DataCite Assets Server

![Release](https://github.com/datacite/assets/workflows/Release/badge.svg)

The DataCite Assets Server. Uses the [middleman](https://middlemanapp.com/) static site generator.
## Local development

Note: does not work with Ruby 3.x+ or Node 15.x+ . To run locally without installing older versions of Ruby/Node, follow the Docker steps

### Run directly on your OS
#### Prerequisites
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Ruby v2.6](https://www.ruby-lang.org/en/)
- [RubyGems](https://rubygems.org/)
- [Node.js v14.x](https://nodejs.org/en/)
- [Bundler](https://bundler.io/)
- [Yarn Classic](https://classic.yarnpkg.com/)

#### Install and start
1. `git clone <repository-url> this repository`
2. `cd assets`
3. `yarn install`
4. `bundle exec middleman server`
5. `Visit the app at http://localhost:4567`

### Run in Docker

#### Prerequisites
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker desktop](https://www.docker.com/products/docker-desktop/)

#### Install and start
1. `git clone <repository-url> this repository`
2. `cd assets`
3. `docker-compose up -d`
5. `Visit the app at http://localhost:4567`

### Build the Static Site

1. `git clone <repository-url> this repository`
2. `cd assets`
3. `yarn install`
4. `bundle exec middleman build -e production`

Find the static site in the ./build directory.

## Issues

Follow along via [Github Issues](https://github.com/datacite/assets/issues).

## Notes on Patches/Pull Requests

* Fork the project
* Write tests for your new feature or a test that reproduces a bug
* Implement your feature or make a bug fix
* Do not mess with version or history
* Commit, push and make a pull request. Bonus points for topical branches.

## License
**Assets** is released under the [MIT License](https://github.com/datacite/assets/blob/master/LICENSE.md).
