# Dockerfile

FROM ruby:2.6.3

WORKDIR /app

# Can use npm or yarn.
RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh  && \
    bash nodesource_setup.sh && \
    apt install nodejs && \
    apt-get install -y pandoc && \
    npm install -g yarn

# Copy Ruby and Node dependencies
#COPY Gemfile Gemfile.lock package.json package-lock.json ./
COPY . .

# Install dependencies
RUN bundle install --without debug && npm install

EXPOSE 4567
