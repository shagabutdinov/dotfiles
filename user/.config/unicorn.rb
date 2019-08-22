worker_processes Integer(ENV['WEB_CONCURRENCY'] || 3)
logger Logger.new(STDOUT)

STDOUT.sync = true
STDERR.sync = true
