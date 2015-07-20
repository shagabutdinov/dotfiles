// {{{ INFO
var INFO =xml`
<plugin name="reload-plugins.js" version="0.2"
        summary="vimperator reload plugins"
        href="http://github.com/shagabutdinov/vimperator-reload-plugins/blob/master/reload-plugins.js"
        xmlns="http://vimperator.org/namespaces/liberator">
  <author email="leonid@shagabutdinov.com">Leonid Shagabutdinov</author>
  <license href="http://opensource.org/licenses/mit-license.php">MIT</license>
  <project name="Vimperator" minVersion="3.3"/>
  <p>Redmine utilities</p>
  <item>
    <tags>'reloadPlugins'</tags>
    <spec>:reloadPlugins</spec>
    <description>
      <p>Reload plugins</p>
    </description>
  </item>
</plugin>`;
// }}}

function reloadPlugins(status) {
  liberator.pluginFiles = {};
  liberator.loadPlugins();
}

commands.addUserCommand(['reloadPlugins'], 'reload all plugins',
  reloadPlugins, {}, true);