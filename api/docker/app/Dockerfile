FROM ruby:2.7.3-alpine3.13
RUN apk add --update build-base sqlite-dev tzdata
RUN mkdir /app
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v '1.17.3' && bundle install
COPY . .

EXPOSE 9292
