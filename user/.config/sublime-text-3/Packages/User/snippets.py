import sublime
import re

from MysqlConsole import mysql

def get_class_name(file, options = {'delimeter': '::'}):
  if file == None:
    return None

  match = re.search(r'/lib/(?!.*/lib/)(.*)\.\w+$', file)

  if match == None:
    match = re.search(r'/([^/]*)\.\w+$', file)

  if match == None:
    return None

  replacer = lambda match: ((match.group(1) == '/' and options['delimeter'] or
    '') + match.group(2).upper())

  result = re.sub(r'(^|/)(\w)', replacer, match.group(1))
  result = re.sub(r'_(\w)', lambda match: match.group(1).upper(), result)
  return result

def to_snake_case(string):
  return re.sub('([a-z0-9])([A-Z])', r'\1_\2', re.sub('(.)([A-Z][a-z]+)',
    r'\1_\2', string)).lower()

def get_mysql_set(view):
  sel = view.sel()[0]
  prefix = view.substr(sublime.Region(
    max(0, sel.begin() - 512),
    sel.begin()
  ))

  table = re.search(r'`([^`]+)`\s*$', prefix)
  if table == None:
    return None

  success, definition = mysql.run_query(view, 'SHOW CREATE TABLE `' +
    table.group(1) + '`\G')

  if not success:
    return None

  fields = re.finditer(r'(?:CREATE TABLE `[^`]+` \(|,)\s*`([^`]+)`', definition)
  result = []
  for index, field in enumerate(fields):
    result.append('`' + field.group(1) + '` = ${' + str(index + 1) + ':NULL}')

  return ",\n".join(result)

def convert_to_variable(string, options = {}):
  match = re.search(r'(\w+)(::|\s*$|\()', string)
  if match != None:
    string = match.group(1)

  string = re.sub(r'\W', '', string)
  string = re.sub(r'^_', '', string)

  if options.get('singular'):
    string = re.sub(r'ies([A-Z]|_|$)', 'y\\1', string)
    string = re.sub(r'(es|s)([A-Z]|_|$)', '\\2', string)

  return string
