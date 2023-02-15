var showGroupAfterCloseAnimation = false;

var grpOkoBasic = document.getElementById('grpOkoBasic');
var grpOkoIntegration = document.getElementById('grpOkoIntegration');
var grpOkoSolution = document.getElementById('grpOkoSolution');

var descOkoBasic = document.getElementById('descOkoBasic');
var descOkoIntegration = document.getElementById('descOkoIntegration');
var descOkoSolution = document.getElementById('descOkoSolution');

var grpOkoBasicInitClassName = grpOkoBasic.getAttribute('class') || '';
var grpOkoIntegrationInitClassName = grpOkoIntegration.getAttribute('class') || '';
var grpOkoSolutionInitClassName = grpOkoSolution.getAttribute('class') || '';

var descOkoBasicInitClassName = descOkoBasic.className || '';
var descOkoIntegrationInitClassName = descOkoIntegration.className || '';
var descOkoSolutionInitClassName = descOkoSolution.className || '';

function openInfo(event) {
  var grpToOpen = event.currentTarget.parentElement;

  var grpDescription = null;

  var n = groupDescriptions.length;
  for (var i = 0; i < n; i++) {
    var curGroupDescription = groupDescriptions[i];
    if (curGroupDescription.groupElement == grpToOpen) {
      grpDescription = curGroupDescription;
      continue;
    }
    if (!curGroupDescription.groupElement.classList.contains(curGroupDescription.openAnimation) && !curGroupDescription.groupElement.classList.contains(curGroupDescription.closeAnimation)) {
      (function(desc) { window.setTimeout(function() {desc.groupElement.setAttribute('class', desc.groupInitClassName + ' animate-hide');}, 1);})(curGroupDescription);
    } else {
      curGroupDescription.groupClose(false);
    }
  }
  
  if (grpDescription) {
    grpDescription.groupElement.setAttribute('class', grpDescription.groupInitClassName + ' ' + grpDescription.openAnimation);
    grpDescription.descElement.className = grpDescription.descInitClassName + ' desc-animate-show';
  }
}

function closeInfo(showGroupAfterCollapse, groupToClose) {
  var grpDescription = null;

  var n = groupDescriptions.length;
  for (var i = 0; i < n; i++) {
    var curGroupDescription = groupDescriptions[i];
    if (curGroupDescription.groupElement == groupToClose) {
      grpDescription = curGroupDescription;
      continue;
    }
    curGroupDescription.groupElement.setAttribute('class', curGroupDescription.groupInitClassName);
  }

  if (grpDescription) {
    showGroupAfterCloseAnimation = showGroupAfterCollapse;
    grpDescription.descElement.className = grpDescription.descInitClassName + ' desc-animate-hide';
    grpDescription.groupElement.setAttribute('class', grpDescription.groupInitClassName + ' ' + grpDescription.closeAnimation);
  }
}

function onRectAnimationEnd(event) {
  if (!showGroupAfterCloseAnimation || !event || !event.currentTarget) {
    return;
  }

  var curGroup = event.currentTarget.parentElement;
  var grpDescription = null;
  var n = groupDescriptions.length;
  for (var i = 0; i < n; i++) {
    if (groupDescriptions[i].groupElement == curGroup) {
      grpDescription = groupDescriptions[i];
      break;
    }
  }
  if (grpDescription && event.animationName === grpDescription.rectCloseAnimationName) {
    curGroup.setAttribute('class', grpDescription.groupInitClassName + ' animate-show');
  }
}

function onTextAnimationEnd(event) {
  if (event && event.animationName === 'elem_show') {
    var curDescHolder = event.currentTarget.parentElement;
    var n = groupDescriptions.length;
    for (var i = 0; i < n; i++) {
      var curGroupDescription = groupDescriptions[i];
      if (curGroupDescription.descElement !== curDescHolder) {
        curGroupDescription.groupElement.setAttribute('class', curGroupDescription.groupInitClassName + ' animate-show');
      }
    }
  }
}

var groupDescriptions = [ { 
    groupElement: grpOkoIntegration,
    descElement: descOkoIntegration,
    groupInitClassName: grpOkoIntegrationInitClassName,
    descInitClassName: descOkoIntegrationInitClassName,
    openAnimation: 'integration-open-animate',
    closeAnimation: 'integration-close-animate',
    rectCloseAnimationName: 'integration_main_rect_constrict',
    groupClose: function(showGroupAfterCollapse) { closeInfo(showGroupAfterCollapse, grpOkoIntegration); }
  }, { 
    groupElement: grpOkoBasic,
    descElement: descOkoBasic,
    groupInitClassName: grpOkoBasicInitClassName,
    descInitClassName: descOkoBasicInitClassName,
    openAnimation: 'basic-open-animate',
    closeAnimation: 'basic-close-animate',
    rectCloseAnimationName: 'basic_main_rect_constrict',
    groupClose: function(showGroupAfterCollapse) { closeInfo(showGroupAfterCollapse, grpOkoBasic); }
  }, { 
    groupElement: grpOkoSolution,
    descElement: descOkoSolution,
    groupInitClassName: grpOkoSolutionInitClassName,
    descInitClassName: descOkoSolutionInitClassName,
    openAnimation: 'solution-open-animate',
    closeAnimation: 'solution-close-animate',
    rectCloseAnimationName: 'solution_main_rect_constrict',
    groupClose: function(showGroupAfterCollapse) { closeInfo(showGroupAfterCollapse, grpOkoSolution); }
  }
];