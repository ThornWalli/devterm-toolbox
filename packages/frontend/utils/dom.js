import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

// https://github.com/vuejs/vue-rx
export const resizeObserver = fromEvent(window, 'resize').pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
export const keyPressObserver = fromEvent(window, 'keypress').pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
export const keyUpObserver = fromEvent(window, 'keyup').pipe(share({ resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));

// keyUpObserver

// // ArrowDown, ArrowUp

// //   .pipe(filter(({ key }) => key === 'PrintScreen'))
//   .subscribe((e) => {
//     console.log(e);
//   });

export const selectFiles = (accept) => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = (accept || []).join(',');
    input.click();
    input.addEventListener('change', (e) => {
      const files = (e.dataTransfer || e.target).files;
      input.remove();
      resolve(files);
    });
  });
};
