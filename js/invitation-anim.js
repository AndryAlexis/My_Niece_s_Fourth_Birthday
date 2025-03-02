import { clamp } from './utils/helper.js';
import { CSS_VARIABLES, MAX_DEGREES, ACCELERATION, SCROLL_EVENT, MAIN_TAG, DEGREES, PERCENTAGE } from './utils/constants.js';

window.onload = () => {
    let currentInvitationState = 0
    let currentInvitationPosition = 0

    const main = document.querySelector(MAIN_TAG);

    main.addEventListener(SCROLL_EVENT, () => {
        const normalizedScrollPosition = main.scrollTop / (main.scrollHeight - main.clientHeight);
        currentInvitationState = clamp(MAX_DEGREES * normalizedScrollPosition * ACCELERATION, 0, MAX_DEGREES);
        document.documentElement.style.setProperty(CSS_VARIABLES.INVITATION_STATE, `${currentInvitationState * -1}${DEGREES}`);

        if (normalizedScrollPosition <= 0.5) {
            currentInvitationPosition = clamp(normalizedScrollPosition * ACCELERATION, 0, 1);
        } else {
            currentInvitationPosition = clamp((1 - normalizedScrollPosition) * ACCELERATION, 0, 1);
        }

        document.documentElement.style.setProperty(CSS_VARIABLES.INVITATION_POSITION, `${currentInvitationPosition * 100}${PERCENTAGE}`);
    });
}