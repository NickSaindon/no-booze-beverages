import {useEffect, useState, useRef} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Image from "next/image";
import gsap from 'gsap';

const PageTransitions = ({ children, route }) => {
    const [transitioning, setTransitioning] = useState();
    const tl = useRef();
    const transitionRef = useRef();

    const playTransition = () => {
        tl.current.play(0);
        setTransitioning(true);
    }

    const stopTransition = () => {
        setTransitioning("");
    }

    useEffect(() => {
        if(!transitionRef.current) {
            return;
        }
        const squares = transitionRef.current.children;

        gsap.set(squares, { autoAlpha: 1});

        tl.current = gsap.timeline({
            repeat: 1,
            repeatDelay: 0.2,
            yoyo: true,
            paused: true
        })
        .fromTo(squares, 
          { scale: 0},
          { scale: 1, stagger: {
            grid: 'auto',
            from: 'edges',
            ease: 'sine',
            amount: 0.5
          }},

          )    


        return () => {
            tl.current.kill()
        } 
    }, []);

    return (
        <>
        <TransitionGroup className={transitioning ? "transitioning" : ""}>
          <CSSTransition 
            key={route} 
            classNames="fade" 
            timeout={2300}
            onEnter={playTransition}
            onExited={stopTransition}
          >
            <main>
              {children}
            </main>
          </CSSTransition>
        </TransitionGroup>
        <div className="page-grid" ref={transitionRef}>
            <Image src="/images/no-booze-logo.png" className="no-booze-logo" width={175} height={175} alt=""/>
            {[ ...Array(100)].map((_, i) => (
              <div key={i} className="text-center">
              </div>
            ))}

        </div>
      </>
    )
}

export default PageTransitions;