const $ = require('jquery');

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
