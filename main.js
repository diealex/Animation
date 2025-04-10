var showGroupAfterCloseAnimation = false;

var grpBasic = document.getElementById("grpBasic");
var grpIntegration = document.getElementById("grpIntegration");
var grpSolution = document.getElementById("grpSolution");

var descBasic = document.getElementById("descBasic");
var descIntegration = document.getElementById("descIntegration");
var descSolution = document.getElementById("descSolution");

var grpBasicInitClassName = grpBasic.getAttribute("class") || "";
var grpIntegrationInitClassName = grpIntegration.getAttribute("class") || "";
var grpSolutionInitClassName = grpSolution.getAttribute("class") || "";

var descBasicInitClassName = descBasic.className || "";
var descIntegrationInitClassName = descIntegration.className || "";
var descSolutionInitClassName = descSolution.className || "";

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
    if (
      !curGroupDescription.groupElement.classList.contains(
        curGroupDescription.openAnimation
      ) &&
      !curGroupDescription.groupElement.classList.contains(
        curGroupDescription.closeAnimation
      )
    ) {
      (function (desc) {
        window.setTimeout(function () {
          desc.groupElement.setAttribute(
            "class",
            desc.groupInitClassName + " animate-hide"
          );
        }, 1);
      })(curGroupDescription);
    } else {
      curGroupDescription.groupClose(false);
    }
  }

  if (grpDescription) {
    grpDescription.groupElement.setAttribute(
      "class",
      grpDescription.groupInitClassName + " " + grpDescription.openAnimation
    );
    grpDescription.descElement.className =
      grpDescription.descInitClassName + " desc-animate-show";
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
    curGroupDescription.groupElement.setAttribute(
      "class",
      curGroupDescription.groupInitClassName
    );
  }

  if (grpDescription) {
    showGroupAfterCloseAnimation = showGroupAfterCollapse;
    grpDescription.descElement.className =
      grpDescription.descInitClassName + " desc-animate-hide";
    grpDescription.groupElement.setAttribute(
      "class",
      grpDescription.groupInitClassName + " " + grpDescription.closeAnimation
    );
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
  if (
    grpDescription &&
    event.animationName === grpDescription.rectCloseAnimationName
  ) {
    curGroup.setAttribute(
      "class",
      grpDescription.groupInitClassName + " animate-show"
    );
  }
}

function onTextAnimationEnd(event) {
  if (event && event.animationName === "elem_show") {
    var curDescHolder = event.currentTarget.parentElement;
    var n = groupDescriptions.length;
    for (var i = 0; i < n; i++) {
      var curGroupDescription = groupDescriptions[i];
      if (curGroupDescription.descElement !== curDescHolder) {
        curGroupDescription.groupElement.setAttribute(
          "class",
          curGroupDescription.groupInitClassName + " animate-show"
        );
      }
    }
  }
}

var groupDescriptions = [
  {
    groupElement: grpIntegration,
    descElement: descIntegration,
    groupInitClassName: grpIntegrationInitClassName,
    descInitClassName: descIntegrationInitClassName,
    openAnimation: "integration-open-animate",
    closeAnimation: "integration-close-animate",
    rectCloseAnimationName: "integration_main_rect_constrict",
    groupClose: function (showGroupAfterCollapse) {
      closeInfo(showGroupAfterCollapse, grpIntegration);
    },
  },
  {
    groupElement: grpBasic,
    descElement: descBasic,
    groupInitClassName: grpBasicInitClassName,
    descInitClassName: descBasicInitClassName,
    openAnimation: "basic-open-animate",
    closeAnimation: "basic-close-animate",
    rectCloseAnimationName: "basic_main_rect_constrict",
    groupClose: function (showGroupAfterCollapse) {
      closeInfo(showGroupAfterCollapse, grpBasic);
    },
  },
  {
    groupElement: grpSolution,
    descElement: descSolution,
    groupInitClassName: grpSolutionInitClassName,
    descInitClassName: descSolutionInitClassName,
    openAnimation: "solution-open-animate",
    closeAnimation: "solution-close-animate",
    rectCloseAnimationName: "solution_main_rect_constrict",
    groupClose: function (showGroupAfterCollapse) {
      closeInfo(showGroupAfterCollapse, grpSolution);
    },
  },
];
