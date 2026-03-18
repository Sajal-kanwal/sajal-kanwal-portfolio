'use client';

import { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { formatTime, getWeatherEmoji } from '@/lib/utils';
import type { Metadata } from 'next';

export default function ContactPage() {
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
    <section id="page-contact" className="contact-section" data-page-section="contact">
      <div className="contact-box-wrapper">
        <div className="contact-box">
          <ul className="contact-socialmedia">
            <li>
              <h4>Email</h4>
              <a href="mailto:desn.yeomsydney@gmail.com" data-text="Send Me an Email">yeomsydney@gmail.com</a>
            </li>
            <li>
              <h4>LinkedIn</h4>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" data-text="Follow Me!">@seunghyeon</a>
            </li>
            <li>
              <h4>GitHub</h4>
              <a href={SOCIAL_LINKS.github} target="_blank" data-text="Follow Me!">@Sajal-kanwal</a>
            </li>
            <li>
              <h4>Instagram</h4>
              <a href={SOCIAL_LINKS.instagram} target="_blank" data-text="Follow Me!">@anytng.sajal</a>
            </li>
          </ul>

          <div className="contact-intro">
            <div className="contact-intro-box">
              <h2>Contact Me,<br />Anytime.</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <ul>
          <li><a href="/">© 2026 Sajal Kanwal All rights reserved</a></li>
        </ul>
        <ul>
          <li className="footer-time">{time}</li>
          <li className="footer-weather">{weather}</li>
        </ul>
      </div>
    </section>
  );
}
