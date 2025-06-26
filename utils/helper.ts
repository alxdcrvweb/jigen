import { RefObject } from 'react';

export const mouseMoveHandler = (e: globalThis.MouseEvent, ref: RefObject<HTMLDivElement | HTMLElement>) => {
    if (!ref.current) return
    ref.current.querySelectorAll('.paralaxItem')?.forEach((image: any) => {
        const speed: any = image.getAttribute('data-speed');
        const x = ((window.innerWidth / 2 - e.pageX) * speed) / 120;
        const y = ((window.innerHeight / 2 - e.pageY) * speed) / 30;
        image.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}