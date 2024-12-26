type handleMouseDown = (event: MouseEvent) => void;
export const drag = {
  mounted(el: HTMLElement & { _handleMouseDown?: handleMouseDown }) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const rect = el.getBoundingClientRect();
      const offsetX = startX - rect.left;
      const offsetY = startY - rect.top;
      const parentRect = el.parentElement?.getBoundingClientRect();
      if (!parentRect) {
        return;
      }

      const handleMouseMove = (event: MouseEvent) => {
        let moveX = event.clientX - offsetX;
        let moveY = event.clientY - offsetY;

        if (moveX < parentRect.left) {
          moveX = parentRect.left;
        }
        if (moveY < parentRect.top) {
          moveY = parentRect.top;
        }
        if (moveX + rect.width > parentRect.right) {
          moveX = parentRect.right - rect.width;
        }
        if (moveY + rect.height > parentRect.bottom) {
          moveY = parentRect.bottom - rect.height;
        }

        el.style.left = `${moveX - parentRect.left}px`;
        el.style.top = `${moveY - parentRect.top}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    el.addEventListener('mousedown', handleMouseDown);
    el._handleMouseDown = handleMouseDown;
  },

  beforeUnmount(el: HTMLElement & { _handleMouseDown?: handleMouseDown }) {
    if (el._handleMouseDown) {
      el.removeEventListener('mousedown', el._handleMouseDown);
    }
  }
};