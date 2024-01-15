import React, { useEffect, useContext , useLayoutEffect , useState } from 'react';
import '../evo-calendar.midnight-blue.css';
import styles from '../style';
import Spinner from './Spinner';

const CalendarComponent = () => {

  const [stylesLoaded, setStylesLoaded] = useState(false);

  useLayoutEffect(() => {
    const loadCssFile = async () => {
      try {
        await import('../evo-calendar.midnight-blue.css');
        setStylesLoaded(true);
      } catch (error) {
        console.error('Error loading CSS file:', error);
      }
    };

    loadCssFile();
  }, []);

  // useEffect(() => {
  //   const loadCalendarScripts = async () => {
  //     await import('https://code.jquery.com/jquery-3.4.1.min.js');

  //     await import(
  //       'https://cdn.jsdelivr.net/npm/evo-calendar@latest/evo-calendar/js/evo-calendar.min.js'
  //     );

  //     $('#calendar').evoCalendar({});
  //   };

  //   loadCalendarScripts();
  // }, []);

  useLayoutEffect(() => {
    if (stylesLoaded) {
      const loadCalendarScripts = async () => {
        await import('https://code.jquery.com/jquery-3.4.1.min.js');
        await import(
          'https://cdn.jsdelivr.net/npm/evo-calendar@latest/evo-calendar/js/evo-calendar.min.js'
        );

        $('#calendar').evoCalendar({
          theme: 'Midnight Blue',

        });
      };

      loadCalendarScripts();
    }
  }, [stylesLoaded]);

  useEffect(() => {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    jqueryScript.async = true;
    jqueryScript.defer = true;

    jqueryScript.onload = () => {
      const evoCalendarScript = document.createElement('script');
      evoCalendarScript.src =
        'https://cdn.jsdelivr.net/npm/evo-calendar@1.1.3/evo-calendar/js/evo-calendar.min.js';
      evoCalendarScript.async = true;
      evoCalendarScript.defer = true;

      evoCalendarScript.onload = () => {
        $('#calendar').evoCalendar({
          theme: 'Midnight Blue',
          calendarEvents: [
            {
              id: 'independence-day',
              name: 'Independence-Day',
              badge: 'PublicHoliday',
              date: 'August 15, 2024',
              type: 'holiday',
              color: '#63d867',
              everyYear: true,
            },
            {
              id: 'diwali',
              name: 'Diwali',
              badge: 'PublicHoliday',
              date: 'October 24, 2024',
              type: 'holiday',
              color: '#63d867',
              everyYear: true,
            },
            {
              id: 'asDf87L',
              name: 'Graduation Day!',
              badge: 'PublicHoliday',
              date: 'March 21, 2024',
              type: 'event',
            },
            {
              id: 'kNybja6',
              name: "Mom's Birthday",
              date: 'May 27, 1965',
              type: 'birthday',
              everyYear: true,
            },
          ],
        });
      };

      const evoCalendarCSS = document.createElement('link');
      evoCalendarCSS.href =
        'https://cdn.jsdelivr.net/npm/evo-calendar@1.1.3/evo-calendar/css/evo-calendar.min.css';
      evoCalendarCSS.rel = 'stylesheet';

      document.head.appendChild(evoCalendarCSS);
      document.head.appendChild(evoCalendarScript);
    };

    document.head.appendChild(jqueryScript);
  }, []);

  return (
    <div className={`${styles.paddingX}`}>
      <div className={`${styles.paddingX} ${styles.paddingY}`}>
        <div id="calendar"></div>
      </div>
    </div>
  );
};

export default CalendarComponent;
