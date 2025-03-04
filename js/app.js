import { clamp } from './utils/helper.js';
import { CSS_VARIABLES, MAX_DEGREES, ACCELERATION, SCROLL_EVENT, MAIN_TAG, DEGREES, PERCENTAGE } from './utils/constants.js';

window.onload = () => {
    invitationAnim(); // Initialize invitation animation
    doScrollMessageBehavior(); // Initialize scroll behavior
    confirmButtonBehavior(); // Initialize confirm button behavior
}

const invitationAnim = () => {
    let currentInvitationState = 0;
    let currentInvitationPosition = 0;
    
    const main = document.querySelector(MAIN_TAG);
    
    main.addEventListener(SCROLL_EVENT, () => {
        // Calculate normalized scroll position
        const normalizedScrollPosition = main.scrollTop / (main.scrollHeight - main.clientHeight);
        
        // Update invitation state based on scroll position
        currentInvitationState = clamp(MAX_DEGREES * normalizedScrollPosition * ACCELERATION, 0, MAX_DEGREES);
        document.documentElement.style.setProperty(CSS_VARIABLES.INVITATION_STATE, `${currentInvitationState * -1}${DEGREES}`);
    
        // Update invitation position based on scroll position
        if (normalizedScrollPosition <= 0.5) {
            currentInvitationPosition = clamp(normalizedScrollPosition * ACCELERATION, 0, 1);
        } else {
            currentInvitationPosition = clamp((1 - normalizedScrollPosition) * ACCELERATION, 0, 1);
        }
    
        document.documentElement.style.setProperty(CSS_VARIABLES.INVITATION_POSITION, `${currentInvitationPosition * 100}${PERCENTAGE}`);
    });
}

const doScrollMessageBehavior = () => {
    const DO_SCROLL_ID = '#do-scroll';
    const IS_INVISIBLE_CLASS = 'is-invisible';
    const TRIGGER_POINT = 0.05;

    const main = document.querySelector(MAIN_TAG);
    const doScrollElement = document.querySelector(DO_SCROLL_ID);
    
    main.addEventListener(SCROLL_EVENT, () => {
        // Calculate normalized scroll position
        const normalizedScrollPosition = main.scrollTop / (main.scrollHeight - main.clientHeight);
    
        // Hide 'do-scroll' element if scrolled past a certain point
        if (normalizedScrollPosition > TRIGGER_POINT) {
            doScrollElement.classList.add(IS_INVISIBLE_CLASS);
        }
    });
}

const confirmButtonBehavior = () => {
    const CONFIRM_ID = '#confirm';
    const ENABLE_CLASS = 'enable';
    const TRIGGER_POINT = 0.98;

    const main = document.querySelector(MAIN_TAG);
    const doScrollElement = document.querySelector(CONFIRM_ID);
    
    main.addEventListener(SCROLL_EVENT, () => {
        // Calculate normalized scroll position
        const normalizedScrollPosition = main.scrollTop / (main.scrollHeight - main.clientHeight);
    
        // Disable 'confirm' button if not scrolled to the bottom
        if (normalizedScrollPosition >= TRIGGER_POINT) {
            doScrollElement.classList.add(ENABLE_CLASS);
        } else {
            doScrollElement.classList.remove(ENABLE_CLASS);
        }
    });
}