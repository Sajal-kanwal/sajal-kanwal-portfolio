'use client';

import { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { formatTime, getWeatherEmoji } from '@/lib/utils';

export default function Footer() {
  const [time, setTime] = useState('--:--');
  const [weather, setWeather] = useState('Loading Weather...');

  useEffect(() => {
    setTime(formatTime());
    const timer = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=32.22&lon=76.32&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        );
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;
        const emoji = getWeatherEmoji(condition);
        setWeather(`${emoji} ${temp}°C · Dharamshala`);
      } catch {
        setWeather('Weather unavailable');
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer-container">
      <div className="footer-container-wrapper">
        <div className="footer-credit-top">
          <div className="footer-credit-top-line">
            <h3>Hello, there, this is Sajal</h3>
            <h4>Get in Touch! ツ゚</h4>
          </div>

          <div className="footer-credit-top-connect">
            <div className="footer-credit-connectBox footer-credit-socialmedia">
              <h3 className="footer-credit-connectBox-title">Connect</h3>
              <ul>
                <li>
                  <a className="ft-credit-connectBox-each" href={SOCIAL_LINKS.linkedin} target="_blank" data-text="LinkedIn">
                    <i className="ri-linkedin-fill" />
                  </a>
                </li>
                <li>
                  <a className="ft-credit-connectBox-each" href={SOCIAL_LINKS.behance} target="_blank" data-text="Behance">
                    <i className="ri-behance-fill" />
                  </a>
                </li>
                <li>
                  <a className="ft-credit-connectBox-each" href={SOCIAL_LINKS.instagram} target="_blank" data-text="Instagram">
                    <i className="ri-instagram-fill" />
                  </a>
                </li>
                <li>
                  <a className="ft-credit-connectBox-each" href={SOCIAL_LINKS.github} target="_blank" data-text="GitHub">
                    <i className="ri-github-fill" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-credit-connectBox footer-credit-calls">
              <h3 className="footer-credit-connectBox-title">Let&apos;s Talk</h3>
              <ul>
                <li>
                  <a className="ft-credit-call-each" href={SOCIAL_LINKS.calendly} target="_blank" data-text="Book a call">
                    <h4>Book a Call</h4>
                    <i className="ri-arrow-right-line" />
                  </a>
                  <h5>Always open to talk!</h5>
                </li>
                <li>
                  <span className="ft-credit-call-each deactivated">
                    <h4>Digital Planner</h4>
                    <i className="ri-arrow-right-line" />
                  </span>
                  <h5>Stay Tuned</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-credit-bottom" />
      </div>

      <div className="footer-container-misc">
        <ul>
          <li><a href="/">© 2026 Sajal Kanwal All rights reserved</a></li>
        </ul>
        <ul>
          <li className="footer-time">{time}</li>
          <li className="footer-weather">{weather}</li>
        </ul>
      </div>
    </div>
  );
}
