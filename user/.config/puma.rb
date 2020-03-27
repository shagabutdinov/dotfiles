# frozen_string_literal: true

workers Integer(ENV['WEB_CONCURRENCY'] || 1)
threads_count = Integer(ENV['MAX_THREADS'] || 2)
threads threads_count, threads_count

port        ENV['PORT'] || 3000
environment ENV['RACK_ENV'] || 'development'
