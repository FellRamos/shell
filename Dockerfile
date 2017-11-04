FROM shell-test-base

WORKDIR /tests

# auth keys
ADD .openwhisk-shell /.openwhisk-shell

ADD dist /dist

# some fake bits needed by compile.js
RUN echo "API_HOST=foo" > ~/.wskprops
RUN echo "AUTH=bar" >>  ~/.wskprops

ADD app /app
RUN cd /app && npm install --unsafe-perm

# remove the fake bits
RUN rm ~/.wskprops

ADD tests /tests
RUN cd /tests && npm install

CMD ./bin/runWithXvfb.sh