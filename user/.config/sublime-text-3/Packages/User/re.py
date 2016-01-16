import re

def search(expr, text, group = 1):
  match = re.search(expr, text)
  if match == None:
    return None

  return match.group(group)