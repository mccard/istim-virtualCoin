REPORTER = spec

test:
		@NODE_ENV=testLocal ./node_modules/.bin/mocha \
				--reporter $(REPORTER) \
				--require should \

test-coveralls:
		@NODE_ENV=testTravis istanbul cover \
		./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
				cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

test-cov:
		@NODE_ENV=testLocal ./node_modules/.bin/istanbul cover \
				./node_modules/mocha/bin/_mocha --report html -- -R $(REPORTER)

.PHONY: test test-w