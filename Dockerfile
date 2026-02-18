# Dockerfile

FROM ruby:2.7

WORKDIR /app

# Install Node 14 (direct binary - NodeSource script is deprecated), pandoc, and yarn
ENV NODE_VERSION=14.21.3
RUN apt-get update && apt-get install -y curl xz-utils wget && \
    curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" | tar -xJ -C /usr/local --strip-components=1 && \
    npm install -g yarn && \
    wget https://github.com/jgm/pandoc/releases/download/1.19.2.1/pandoc-1.19.2.1-1-amd64.deb && \
    dpkg -i pandoc-1.19.2.1-1-amd64.deb && rm pandoc-1.19.2.1-1-amd64.deb

# Copy Ruby and Node dependencies
COPY . .

# Install dependencies (aligned with _build.yml)
RUN gem install bundler:1.17.3 && \
    bundle _1.17.3_ install --jobs 4 --retry 3 && yarn install

EXPOSE 4567
