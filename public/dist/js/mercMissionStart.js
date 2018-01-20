webpackJsonp([4],{

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

const $ = __webpack_require__(0);

let bladeIds = [];
// requirementId: remainingCount
let requirements = new Map();
// fieldSkillId: count
let fieldSkills = new Map();

$(document).ready(function () {
    const formBladeList = $('#merc_mission_start_blades');
    const formLeader = $('#merc_mission_start_leader');
    const bladeList = $('#blade-list');
    const allRequirementsList = $('#mission-requirements-required');
    const unmetRequirementsList = $('#mission-requirements-unmet');
    const fieldSkillsList = $('#mission-fieldskills');
    const bladeButtons = $('#blade-select-list').find('button');

    updateMissionInfo();

    $('.blade-select').on('click', function () {
        // Cap the number of Blades at 6.
        if (bladeIds.length < 6) {
            const addButton = $(this);
            const bladeId = parseInt(addButton.data('blade-id'));
            const view = $.parseHTML(addButton.data('blade-view'))[0];

            // Enable the remove button and leader selection
            $(view).ready(function () {
                $('.blade-remove[data-blade-id="' + bladeId + '"]').on('click', function () {
                    const removeButton = $(this);
                    const bladeCard = bladeList.find('.blade-card[data-blade-id="' + bladeId + '"]').first();

                    // Remove the click handler
                    removeButton.off('click');

                    // Remove the actual view
                    bladeCard.remove();
                    setBladeButtonDisabled(bladeId, false);

                    // Remove the blade from the data.
                    const bladeIdIndex = bladeIds.indexOf(bladeId);
                    bladeIds.splice(bladeIdIndex, 1);
                    // If this blade was the leader, reset the leader value to nothing
                    if (formLeader.attr('value') == bladeId) {
                        formLeader.attr('value', null);
                    }

                    updateBladeIds();
                    updateMissionInfo();
                });
                $('.blade-leader[data-blade-id="' + bladeId + '"]').on('click', function () {
                    // Deselect the other radio buttons
                    $('.blade-leader[data-blade-id!="' + bladeId + '"]').prop('checked', false);

                    // Save this to the form
                    formLeader.attr('value', bladeId);
                    readyToStart();
                });
            });

            // Add data to the view so it can be tracked
            $(view).data('blade-requirements', addButton.data('blade-requirements'));
            $(view).data('blade-fieldskills', addButton.data('blade-fieldskills'));

            bladeList.append(view);
            setBladeButtonDisabled(bladeId, true);
            bladeIds.push(bladeId);
            updateMissionInfo();
            updateBladeIds();
        }
    });

    function updateBladeIds() {
        formBladeList.attr('value', JSON.stringify(bladeIds));
    }

    function setBladeButtonDisabled(bladeId, state) {
        bladeButtons.filter('[data-blade-id="' + bladeId + '"]').prop('disabled', state);
    }

    function initializeMissionData() {
        // Requirements
        for (let requirement of allRequirementsList.children()) {
            requirements.set(getSetRequirementId(requirement), getSetRequirementCount(requirement));
        }

        // Field Skills
        for (let fieldSkill of fieldSkillsList.children()) {
            fieldSkills.set(getSetFieldSkillId(fieldSkill), 0);
        }
    }

    function readyToStart() {
        const nextTaskAlert = $('#blade-next-task');
        let readyToStart = true;
        let nextTaskMessage;
        if (formLeader.attr('value') == undefined) {
            readyToStart = false;
            nextTaskMessage = 'Choose a blade to be the leader.';
        }
        for (let neededRequirementCount of requirements.values()) {
            if (neededRequirementCount > 0) {
                readyToStart = false;
                nextTaskMessage = 'Select Blades that meet the requirements.';
                break;
            }
        }
        if (readyToStart) {
            nextTaskMessage = 'Ready to start!';
        }

        const oldNextTaskMessage = nextTaskAlert.text();
        nextTaskAlert.text(nextTaskMessage);
        if (oldNextTaskMessage != nextTaskMessage) {
            flash(nextTaskAlert);
        }
        $('#merc_mission_start_submit').prop('disabled', !readyToStart);
    }

    function updateMissionInfo() {
        // Iterate through Blades, updating the appropriate list.
        initializeMissionData();

        let bladeRequirements;
        let bladeFieldSkills;
        for (let blade of bladeList.children()) {
            bladeRequirements = $(blade).data('blade-requirements');
            bladeFieldSkills = $(blade).data('blade-fieldskills');
            for (let bladeRequirement of bladeRequirements) {
                if (requirements.has(bladeRequirement)) {
                    // This Blade meets a requirement, decrement the number needed.
                    requirements.set(bladeRequirement, Math.max(0, requirements.get(bladeRequirement) - 1));
                }
            }
            for (let bladeFieldSkill of bladeFieldSkills) {
                if (fieldSkills.has(bladeFieldSkill)) {
                    // This blade contributes a field skill, increment the number available.
                    fieldSkills.set(bladeFieldSkill, Math.max(0, fieldSkills.get(bladeFieldSkill) + 1));
                }
            }
        }

        // Display the list.
        const newRequirementsList = allRequirementsList.children().clone();
        let requirementId;
        let fieldSkillId;
        for (let listRequirement of newRequirementsList) {
            requirementId = $(listRequirement).data('requirement-id');
            $(listRequirement).find('.requirement-count').text(requirements.get(requirementId));
        }
        for (let listFieldSkill of $(fieldSkillsList).children()) {
            fieldSkillId = $(listFieldSkill).data('fieldskill-id');
            $(listFieldSkill).find('.fieldskill-count').text(fieldSkills.get(fieldSkillId));
        }
        unmetRequirementsList.empty();
        unmetRequirementsList.append(newRequirementsList);

        // Is the mission ready to start?
        readyToStart();
    }
});

function getSetFieldSkillId(fieldSkill, id = undefined) {
    let value;
    if (id === undefined) {
        value = parseInt($(fieldSkill).data('fieldskill-id'));
    } else {
        value = $(fieldSkill).data('fieldskill-id', id);
    }

    return value;
}

function getSetFieldSkillCount(fieldSkill, count = undefined) {
    let value;
    if (count === undefined) {
        value = parseInt($(fieldSkill).find('.fieldskill-count').text());
    } else {
        value = $(fieldSkill).find('.fieldskill-count').text(count);
    }

    return value;
}

function getSetRequirementId(requirement, id = undefined) {
    let value;
    if (id === undefined) {
        value = parseInt($(requirement).data('requirement-id'));
    } else {
        value = $(requirement).data('requirement-id', id);
    }

    return value;
}

function getSetRequirementCount(requirement, count = undefined) {
    let value;
    if (count === undefined) {
        value = parseInt($(requirement).find('.requirement-count').text());
    } else {
        value = $(requirement).find('.requirement-count').text(count);
    }

    return value;
}

function flash(element) {
    element.animate({opacity: 0.5}, 100).animate({opacity: 1}, 800);
}


/***/ })

},[17]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWVyY01pc3Npb25TdGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGFBQWEsZ0JBQWdCLFdBQVc7QUFDN0QiLCJmaWxlIjoianMvbWVyY01pc3Npb25TdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxubGV0IGJsYWRlSWRzID0gW107XG4vLyByZXF1aXJlbWVudElkOiByZW1haW5pbmdDb3VudFxubGV0IHJlcXVpcmVtZW50cyA9IG5ldyBNYXAoKTtcbi8vIGZpZWxkU2tpbGxJZDogY291bnRcbmxldCBmaWVsZFNraWxscyA9IG5ldyBNYXAoKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZvcm1CbGFkZUxpc3QgPSAkKCcjbWVyY19taXNzaW9uX3N0YXJ0X2JsYWRlcycpO1xuICAgIGNvbnN0IGZvcm1MZWFkZXIgPSAkKCcjbWVyY19taXNzaW9uX3N0YXJ0X2xlYWRlcicpO1xuICAgIGNvbnN0IGJsYWRlTGlzdCA9ICQoJyNibGFkZS1saXN0Jyk7XG4gICAgY29uc3QgYWxsUmVxdWlyZW1lbnRzTGlzdCA9ICQoJyNtaXNzaW9uLXJlcXVpcmVtZW50cy1yZXF1aXJlZCcpO1xuICAgIGNvbnN0IHVubWV0UmVxdWlyZW1lbnRzTGlzdCA9ICQoJyNtaXNzaW9uLXJlcXVpcmVtZW50cy11bm1ldCcpO1xuICAgIGNvbnN0IGZpZWxkU2tpbGxzTGlzdCA9ICQoJyNtaXNzaW9uLWZpZWxkc2tpbGxzJyk7XG4gICAgY29uc3QgYmxhZGVCdXR0b25zID0gJCgnI2JsYWRlLXNlbGVjdC1saXN0JykuZmluZCgnYnV0dG9uJyk7XG5cbiAgICB1cGRhdGVNaXNzaW9uSW5mbygpO1xuXG4gICAgJCgnLmJsYWRlLXNlbGVjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ2FwIHRoZSBudW1iZXIgb2YgQmxhZGVzIGF0IDYuXG4gICAgICAgIGlmIChibGFkZUlkcy5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICBjb25zdCBhZGRCdXR0b24gPSAkKHRoaXMpO1xuICAgICAgICAgICAgY29uc3QgYmxhZGVJZCA9IHBhcnNlSW50KGFkZEJ1dHRvbi5kYXRhKCdibGFkZS1pZCcpKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSAkLnBhcnNlSFRNTChhZGRCdXR0b24uZGF0YSgnYmxhZGUtdmlldycpKVswXTtcblxuICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSByZW1vdmUgYnV0dG9uIGFuZCBsZWFkZXIgc2VsZWN0aW9uXG4gICAgICAgICAgICAkKHZpZXcpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCcuYmxhZGUtcmVtb3ZlW2RhdGEtYmxhZGUtaWQ9XCInICsgYmxhZGVJZCArICdcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsYWRlQ2FyZCA9IGJsYWRlTGlzdC5maW5kKCcuYmxhZGUtY2FyZFtkYXRhLWJsYWRlLWlkPVwiJyArIGJsYWRlSWQgKyAnXCJdJykuZmlyc3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGNsaWNrIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnV0dG9uLm9mZignY2xpY2snKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGFjdHVhbCB2aWV3XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlQ2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QmxhZGVCdXR0b25EaXNhYmxlZChibGFkZUlkLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBibGFkZSBmcm9tIHRoZSBkYXRhLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBibGFkZUlkSW5kZXggPSBibGFkZUlkcy5pbmRleE9mKGJsYWRlSWQpO1xuICAgICAgICAgICAgICAgICAgICBibGFkZUlkcy5zcGxpY2UoYmxhZGVJZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBibGFkZSB3YXMgdGhlIGxlYWRlciwgcmVzZXQgdGhlIGxlYWRlciB2YWx1ZSB0byBub3RoaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtTGVhZGVyLmF0dHIoJ3ZhbHVlJykgPT0gYmxhZGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUxlYWRlci5hdHRyKCd2YWx1ZScsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQmxhZGVJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlTWlzc2lvbkluZm8oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKCcuYmxhZGUtbGVhZGVyW2RhdGEtYmxhZGUtaWQ9XCInICsgYmxhZGVJZCArICdcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIERlc2VsZWN0IHRoZSBvdGhlciByYWRpbyBidXR0b25zXG4gICAgICAgICAgICAgICAgICAgICQoJy5ibGFkZS1sZWFkZXJbZGF0YS1ibGFkZS1pZCE9XCInICsgYmxhZGVJZCArICdcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhpcyB0byB0aGUgZm9ybVxuICAgICAgICAgICAgICAgICAgICBmb3JtTGVhZGVyLmF0dHIoJ3ZhbHVlJywgYmxhZGVJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9TdGFydCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBkYXRhIHRvIHRoZSB2aWV3IHNvIGl0IGNhbiBiZSB0cmFja2VkXG4gICAgICAgICAgICAkKHZpZXcpLmRhdGEoJ2JsYWRlLXJlcXVpcmVtZW50cycsIGFkZEJ1dHRvbi5kYXRhKCdibGFkZS1yZXF1aXJlbWVudHMnKSk7XG4gICAgICAgICAgICAkKHZpZXcpLmRhdGEoJ2JsYWRlLWZpZWxkc2tpbGxzJywgYWRkQnV0dG9uLmRhdGEoJ2JsYWRlLWZpZWxkc2tpbGxzJykpO1xuXG4gICAgICAgICAgICBibGFkZUxpc3QuYXBwZW5kKHZpZXcpO1xuICAgICAgICAgICAgc2V0QmxhZGVCdXR0b25EaXNhYmxlZChibGFkZUlkLCB0cnVlKTtcbiAgICAgICAgICAgIGJsYWRlSWRzLnB1c2goYmxhZGVJZCk7XG4gICAgICAgICAgICB1cGRhdGVNaXNzaW9uSW5mbygpO1xuICAgICAgICAgICAgdXBkYXRlQmxhZGVJZHMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQmxhZGVJZHMoKSB7XG4gICAgICAgIGZvcm1CbGFkZUxpc3QuYXR0cigndmFsdWUnLCBKU09OLnN0cmluZ2lmeShibGFkZUlkcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEJsYWRlQnV0dG9uRGlzYWJsZWQoYmxhZGVJZCwgc3RhdGUpIHtcbiAgICAgICAgYmxhZGVCdXR0b25zLmZpbHRlcignW2RhdGEtYmxhZGUtaWQ9XCInICsgYmxhZGVJZCArICdcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHN0YXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplTWlzc2lvbkRhdGEoKSB7XG4gICAgICAgIC8vIFJlcXVpcmVtZW50c1xuICAgICAgICBmb3IgKGxldCByZXF1aXJlbWVudCBvZiBhbGxSZXF1aXJlbWVudHNMaXN0LmNoaWxkcmVuKCkpIHtcbiAgICAgICAgICAgIHJlcXVpcmVtZW50cy5zZXQoZ2V0U2V0UmVxdWlyZW1lbnRJZChyZXF1aXJlbWVudCksIGdldFNldFJlcXVpcmVtZW50Q291bnQocmVxdWlyZW1lbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpZWxkIFNraWxsc1xuICAgICAgICBmb3IgKGxldCBmaWVsZFNraWxsIG9mIGZpZWxkU2tpbGxzTGlzdC5jaGlsZHJlbigpKSB7XG4gICAgICAgICAgICBmaWVsZFNraWxscy5zZXQoZ2V0U2V0RmllbGRTa2lsbElkKGZpZWxkU2tpbGwpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5VG9TdGFydCgpIHtcbiAgICAgICAgY29uc3QgbmV4dFRhc2tBbGVydCA9ICQoJyNibGFkZS1uZXh0LXRhc2snKTtcbiAgICAgICAgbGV0IHJlYWR5VG9TdGFydCA9IHRydWU7XG4gICAgICAgIGxldCBuZXh0VGFza01lc3NhZ2U7XG4gICAgICAgIGlmIChmb3JtTGVhZGVyLmF0dHIoJ3ZhbHVlJykgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWFkeVRvU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIG5leHRUYXNrTWVzc2FnZSA9ICdDaG9vc2UgYSBibGFkZSB0byBiZSB0aGUgbGVhZGVyLic7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgbmVlZGVkUmVxdWlyZW1lbnRDb3VudCBvZiByZXF1aXJlbWVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChuZWVkZWRSZXF1aXJlbWVudENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHJlYWR5VG9TdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5leHRUYXNrTWVzc2FnZSA9ICdTZWxlY3QgQmxhZGVzIHRoYXQgbWVldCB0aGUgcmVxdWlyZW1lbnRzLic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWR5VG9TdGFydCkge1xuICAgICAgICAgICAgbmV4dFRhc2tNZXNzYWdlID0gJ1JlYWR5IHRvIHN0YXJ0ISc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvbGROZXh0VGFza01lc3NhZ2UgPSBuZXh0VGFza0FsZXJ0LnRleHQoKTtcbiAgICAgICAgbmV4dFRhc2tBbGVydC50ZXh0KG5leHRUYXNrTWVzc2FnZSk7XG4gICAgICAgIGlmIChvbGROZXh0VGFza01lc3NhZ2UgIT0gbmV4dFRhc2tNZXNzYWdlKSB7XG4gICAgICAgICAgICBmbGFzaChuZXh0VGFza0FsZXJ0KTtcbiAgICAgICAgfVxuICAgICAgICAkKCcjbWVyY19taXNzaW9uX3N0YXJ0X3N1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgIXJlYWR5VG9TdGFydCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWlzc2lvbkluZm8oKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBCbGFkZXMsIHVwZGF0aW5nIHRoZSBhcHByb3ByaWF0ZSBsaXN0LlxuICAgICAgICBpbml0aWFsaXplTWlzc2lvbkRhdGEoKTtcblxuICAgICAgICBsZXQgYmxhZGVSZXF1aXJlbWVudHM7XG4gICAgICAgIGxldCBibGFkZUZpZWxkU2tpbGxzO1xuICAgICAgICBmb3IgKGxldCBibGFkZSBvZiBibGFkZUxpc3QuY2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgYmxhZGVSZXF1aXJlbWVudHMgPSAkKGJsYWRlKS5kYXRhKCdibGFkZS1yZXF1aXJlbWVudHMnKTtcbiAgICAgICAgICAgIGJsYWRlRmllbGRTa2lsbHMgPSAkKGJsYWRlKS5kYXRhKCdibGFkZS1maWVsZHNraWxscycpO1xuICAgICAgICAgICAgZm9yIChsZXQgYmxhZGVSZXF1aXJlbWVudCBvZiBibGFkZVJlcXVpcmVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlbWVudHMuaGFzKGJsYWRlUmVxdWlyZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgQmxhZGUgbWVldHMgYSByZXF1aXJlbWVudCwgZGVjcmVtZW50IHRoZSBudW1iZXIgbmVlZGVkLlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlbWVudHMuc2V0KGJsYWRlUmVxdWlyZW1lbnQsIE1hdGgubWF4KDAsIHJlcXVpcmVtZW50cy5nZXQoYmxhZGVSZXF1aXJlbWVudCkgLSAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgYmxhZGVGaWVsZFNraWxsIG9mIGJsYWRlRmllbGRTa2lsbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRTa2lsbHMuaGFzKGJsYWRlRmllbGRTa2lsbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBibGFkZSBjb250cmlidXRlcyBhIGZpZWxkIHNraWxsLCBpbmNyZW1lbnQgdGhlIG51bWJlciBhdmFpbGFibGUuXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkU2tpbGxzLnNldChibGFkZUZpZWxkU2tpbGwsIE1hdGgubWF4KDAsIGZpZWxkU2tpbGxzLmdldChibGFkZUZpZWxkU2tpbGwpICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIGxpc3QuXG4gICAgICAgIGNvbnN0IG5ld1JlcXVpcmVtZW50c0xpc3QgPSBhbGxSZXF1aXJlbWVudHNMaXN0LmNoaWxkcmVuKCkuY2xvbmUoKTtcbiAgICAgICAgbGV0IHJlcXVpcmVtZW50SWQ7XG4gICAgICAgIGxldCBmaWVsZFNraWxsSWQ7XG4gICAgICAgIGZvciAobGV0IGxpc3RSZXF1aXJlbWVudCBvZiBuZXdSZXF1aXJlbWVudHNMaXN0KSB7XG4gICAgICAgICAgICByZXF1aXJlbWVudElkID0gJChsaXN0UmVxdWlyZW1lbnQpLmRhdGEoJ3JlcXVpcmVtZW50LWlkJyk7XG4gICAgICAgICAgICAkKGxpc3RSZXF1aXJlbWVudCkuZmluZCgnLnJlcXVpcmVtZW50LWNvdW50JykudGV4dChyZXF1aXJlbWVudHMuZ2V0KHJlcXVpcmVtZW50SWQpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsaXN0RmllbGRTa2lsbCBvZiAkKGZpZWxkU2tpbGxzTGlzdCkuY2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgZmllbGRTa2lsbElkID0gJChsaXN0RmllbGRTa2lsbCkuZGF0YSgnZmllbGRza2lsbC1pZCcpO1xuICAgICAgICAgICAgJChsaXN0RmllbGRTa2lsbCkuZmluZCgnLmZpZWxkc2tpbGwtY291bnQnKS50ZXh0KGZpZWxkU2tpbGxzLmdldChmaWVsZFNraWxsSWQpKTtcbiAgICAgICAgfVxuICAgICAgICB1bm1ldFJlcXVpcmVtZW50c0xpc3QuZW1wdHkoKTtcbiAgICAgICAgdW5tZXRSZXF1aXJlbWVudHNMaXN0LmFwcGVuZChuZXdSZXF1aXJlbWVudHNMaXN0KTtcblxuICAgICAgICAvLyBJcyB0aGUgbWlzc2lvbiByZWFkeSB0byBzdGFydD9cbiAgICAgICAgcmVhZHlUb1N0YXJ0KCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldFNldEZpZWxkU2tpbGxJZChmaWVsZFNraWxsLCBpZCA9IHVuZGVmaW5lZCkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KCQoZmllbGRTa2lsbCkuZGF0YSgnZmllbGRza2lsbC1pZCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9ICQoZmllbGRTa2lsbCkuZGF0YSgnZmllbGRza2lsbC1pZCcsIGlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldFNldEZpZWxkU2tpbGxDb3VudChmaWVsZFNraWxsLCBjb3VudCA9IHVuZGVmaW5lZCkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoY291bnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KCQoZmllbGRTa2lsbCkuZmluZCgnLmZpZWxkc2tpbGwtY291bnQnKS50ZXh0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gJChmaWVsZFNraWxsKS5maW5kKCcuZmllbGRza2lsbC1jb3VudCcpLnRleHQoY291bnQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0UmVxdWlyZW1lbnRJZChyZXF1aXJlbWVudCwgaWQgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludCgkKHJlcXVpcmVtZW50KS5kYXRhKCdyZXF1aXJlbWVudC1pZCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9ICQocmVxdWlyZW1lbnQpLmRhdGEoJ3JlcXVpcmVtZW50LWlkJywgaWQpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0UmVxdWlyZW1lbnRDb3VudChyZXF1aXJlbWVudCwgY291bnQgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKGNvdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludCgkKHJlcXVpcmVtZW50KS5maW5kKCcucmVxdWlyZW1lbnQtY291bnQnKS50ZXh0KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gJChyZXF1aXJlbWVudCkuZmluZCgnLnJlcXVpcmVtZW50LWNvdW50JykudGV4dChjb3VudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBmbGFzaChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5hbmltYXRlKHtvcGFjaXR5OiAwLjV9LCAxMDApLmFuaW1hdGUoe29wYWNpdHk6IDF9LCA4MDApO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvanMvbWVyY01pc3Npb25TdGFydC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSA0Il0sInNvdXJjZVJvb3QiOiIifQ==