'use strict';

module.exports = `
/* Animations */
@keyframes scaleInAnimation {
  from {
    transform: translate(-5px, 5px) scale(0);
  }
  to {
    transform: translate(-5px, 5px) scale(1);
  }
}
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;
