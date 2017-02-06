import sublime
import sublime_plugin

class Enumerate(sublime_plugin.TextCommand):
  def run(self, edit):
    index = len(self.view.sel()) - 1
    for sel in reversed(self.view.sel()):
      self.view.erase(edit, sel)
      self.view.insert(edit, sel.a, str(index))
      index -= 1