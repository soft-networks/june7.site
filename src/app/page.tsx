"use client";

import Head from "next/head";
import GuideModal from "./components/guide";
import IFrame from "./components/iframe";
import { useState, useRef } from "react";
import { useEffect } from "react";
import useModalStage from "./components/useModalStage";
import useModalIsOpen from "./components/useModalIsOpen";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000  // 1 minute

export default function Home() {
  const [lastReset, setLastReset] = useState(0);
  const currentTimer = useRef<NodeJS.Timeout | null>(null);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const setStage = useModalStage((state) => state.setStage);
  const openModal = useModalIsOpen((state) => state.open);
  const [warning, setWarning] = useState(false);

  const resetTimer = () => {
    console.log("resetting timer");
    if (currentTimer.current) {
      clearTimeout(currentTimer.current);
    }
    if (warningTimer.current) {
      setWarning(false);
      clearTimeout(warningTimer.current);
    }
    currentTimer.current = setTimeout(() => {
      console.log("resetting due to inactivity");
      openModal();
      setStage(0);
      setWarning(false);
      setLastReset(Date.now());
    }, INACTIVITY_TIMEOUT);
    warningTimer.current = setTimeout(() => {
      setWarning(true);
    }, INACTIVITY_TIMEOUT *0.9);
  }

  const handleUserActivity = () => {
    resetTimer();
  }

  useEffect(() => {
    // Set up event listeners for user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'touchmove'
    ];

    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      if (currentTimer.current) {
        clearTimeout(currentTimer.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>june7.site</title>
        <meta name="description" content="june7.site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div key={lastReset}>
        <IFrame />
        <GuideModal />
        {warning && <div className="position:absolute:bottomright">⚠️ interact to stop refresh</div>}
      </div>
    </>
  );
}
