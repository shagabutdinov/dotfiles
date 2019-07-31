import sublime
import sublime_plugin
import re

from Semicolon import semicolon

class AddSemicolonToStatement(sublime_plugin.TextCommand):
  def run(self, edit):
    for sel in self.view.sel():
      semicolon.add(self.view, edit, sel.b);