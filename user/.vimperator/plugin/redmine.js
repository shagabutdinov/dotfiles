// {{{ INFO
var INFO =xml`
<plugin name="redmine.js" version="0.2"
        summary="redmine helper"
        href="http://github.com/shagabutdinov/vimperator-redmine/blob/master/redmine.js"
        xmlns="http://vimperator.org/namespaces/liberator">
  <author email="mitsugu.oyama@gmail.com">Mitsugu Oyama</author>
  <license href="http://opensource.org/licenses/mit-license.php">MIT</license>
  <project name="Vimperator" minVersion="3.3"/>
  <p>Redmine utilities</p>
  <item>
    <tags>'redmineSetIssueStatus'</tags>
    <spec>:redmineSetIssueStatus</spec>
    <description>
      <p>Shorten URL by used of google</p>
    </description>
  </item>
</plugin>`;
// }}}

function redmineSetIssueStatus(statusId) {
  var selected =
    content.document.
    querySelector('#issue_status_id option[selected="selected"]');

  if(selected) {
    selected.removeAttribute('selected');
  }

  var element =
    content.document.
    querySelector('#issue_status_id  option[value="' + statusId + '"]');

  if(element) {
    element.setAttribute('selected', 'selected');
  }
}

function redmineSetProject(projectId) {
  var selected =
    content.document.
    querySelector('#project option[selected="selected"]');

  if(selected) {
    selected.removeAttribute('selected');
  }

  var element =
    content.document.
    querySelector('#issue_project_id option[value="' + projectId + '"]');

  if(element) {
    element.setAttribute('selected', 'selected');
  }

  var select =
    content.document.
    querySelector('#issue_project_id');

  if(select) {
    window.setTimeout(function() {
      select.change();
    })
  }
}

function redmineSetAssignee(userId) {
  var selected =
    content.document.
    querySelector('#issue_assigned_to_id option[selected="selected"]');

  if(selected) {
    selected.removeAttribute('selected');
  }

  var element =
    content.document.
    querySelector('#issue_assigned_to_id option[value="' + userId + '"]');

  if(element) {
    element.setAttribute('selected', 'selected');
  }
}

function redmineReturnIssue() {
  var currentUser = content.document.querySelector('#issue_assigned_to_id ' +
    'option:nth-child(2)');

  if(!currentUser) {
    return ;
  }

  var currentUserId = currentUser.getAttribute('value');

  if(!currentUserId) {
    return ;
  }

  var users = content.document.querySelectorAll('.journal .user');
  var newUserId;
  for(var userIndex in users) {
    var user = users[userIndex];

    if(!user) {
      return ;
    }

    var userId =
      user.getAttribute &&
      user.getAttribute('href') &&
      user.getAttribute('href').match(/(\d+)$/) &&
      user.getAttribute('href').match(/(\d+)$/)[1];

    if(!userId || userId === currentUserId) {
      continue;
    }

    newUserId = userId;
  }

  if(!newUserId) {
    var author = document.querySelector('.author .user');
    if(!author) {
      return ;
    }

    var match = author.getAttribute('href').match(/(\d+)$/);
    if(!match) {
      return ;
    }

    newUserId = match[1];
    if(!newUserId || newUserId == currentUserId) {
      return ;
    }
  }

  var selected =
    content.document.
    querySelector('#issue_assigned_to_id option[selected="selected"]');

  if(selected) {
    selected.removeAttribute('selected');
  }

  var assignedTo = content.document.
    querySelector('#issue_assigned_to_id option[value="' + newUserId + '"]');

  if(assignedTo) {
    assignedTo.setAttribute('selected', 'selected');
  }
}

function redmineSaveIssue() {
  var element = content.document.querySelector('.edit_issue [type="submit"]');
  if(element) {
    element.click();
  }
}

function redmineShowComment() {
  var element = content.document.querySelector('.icon.icon-edit');
  if(element) {
    window.setTimeout(function() {
      element.click();
    })
  }
}

function redmineFocusComment() {
  var element = content.document.querySelector('#issue_notes');
  if(element) {
    window.setTimeout(function() {
      element.focus();
    })
  }
}

function redmineReplyIssue() {
  redmineReturnIssue();
  redmineSetIssueStatus(4);
  redmineShowComment();
  redmineFocusComment();
}

function redmineCloseIssue() {
  redmineSetIssueStatus(5);
  redmineShowComment();
  redmineFocusComment();
}

function redmineOpenAllIssues() {
  var issues = content.document.querySelectorAll('.issues .subject a');
  var baseUrl = content.location.href.match(/(.*?\w)\//)[1];
  for(var issueIndex in issues) {
    var issue = issues[issueIndex];
    if(issue.getAttribute) {
      liberator.open(
        baseUrl + '/' + issue.getAttribute('href'),
        liberator.NEW_BACKGROUND_TAB
      );
    }
  }

  tabs.select("+1", true);
}

commands.addUserCommand(['redmineSetIssueStatus'], 'set redmine issue status',
  redmineSetIssueStatus, {}, true);

commands.addUserCommand(['redmineSetAssignee'], 'set redmine assignee',
  redmineSetAssignee, {}, true);

commands.addUserCommand(['redmineReplyIssue'], 'reply to redmine issue',
  redmineReplyIssue, {}, true);

commands.addUserCommand(['redmineShowComment'], 'save redmine issue',
  redmineShowComment, {}, true);

commands.addUserCommand(['redmineSaveIssue'], 'save redmine issue',
  redmineSaveIssue, {}, true);

commands.addUserCommand(['redmineOpenAllIssues'], 'open all redmine issues ' +
  'in tabs', redmineOpenAllIssues, {}, true);

commands.addUserCommand(['redmineSetProject'], 'set issue project',
    redmineSetProject, {}, true);

commands.addUserCommand(['redmineFocusComment'], 'set issue project',
    redmineFocusComment, {}, true);

commands.addUserCommand(['redmineReturnIssue'], 'set issue project',
    redmineReturnIssue, {}, true);