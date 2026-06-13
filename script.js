/* S-Club × Hessentag 2026 — dynamisches HEUTE-Banner
   Die Seite verhält sich wie ein täglich neuer Flyer:
   an Eventtagen wird das heutige Event + Special gezeigt,
   sonst ein Countdown zum nächsten Event. */

(function () {
  "use strict";

  /* Eine Eventnacht läuft bis in den Morgen: bis zu dieser
     Stunde zählt der Vorabend noch als "heute". */
  const NACHT_CUTOFF_STUNDE = 6;

  /* Specials als Segmente (vip: true → goldene Hervorhebung) */
  const EVENTS = [
    {
      date: "2026-06-12",
      name: "Sunglasses at Night",
      special: [
        { text: "Zeig am Einlass dein Bändchen — und du bekommst heute einen " },
        { text: "Shot aufs Haus", vip: true },
        { text: "." },
      ],
    },
    { date: "2026-06-13", name: "Partyalarm mit Mütze Katze", special: null },
    { date: "2026-06-18", name: "2€ Party — The Start", special: null },
    { date: "2026-06-19", name: "Abiball Aftershow hosted by RMS", special: null },
    { date: "2026-06-20", name: "2000er & 2010er", special: null },
  ];

  const SPECIAL_FALLBACK = [
    {
      text: "Bändchen an? Dann wartet heute Abend ein Special auf dich — was genau, wird erst im Club enthüllt.",
    },
  ];

  const el = {
    label: document.getElementById("today-label"),
    event: document.getElementById("today-event"),
    special: document.getElementById("today-special"),
    countdown: document.getElementById("today-countdown"),
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
  };

  function toDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  /* "Heute" im Sinne der Eventnacht (vor 6 Uhr zählt der Vorabend) */
  function effectiveToday() {
    const now = new Date();
    now.setHours(now.getHours() - NACHT_CUTOFF_STUNDE);
    return toDateString(now);
  }

  function eventStart(event) {
    return new Date(`${event.date}T23:00:00`);
  }

  function setSpecial(segments) {
    el.special.replaceChildren();
    segments.forEach((segment) => {
      if (segment.vip) {
        const span = document.createElement("span");
        span.className = "vip";
        span.textContent = segment.text;
        el.special.appendChild(span);
      } else {
        el.special.appendChild(document.createTextNode(segment.text));
      }
    });
  }

  function markTodayCard(dateString) {
    const card = document.querySelector(`.card[data-date="${dateString}"]`);
    if (card) card.classList.add("card--today");
  }

  function showToday(event) {
    el.label.textContent = "Heute";
    el.event.textContent = event.name;
    setSpecial(event.special || SPECIAL_FALLBACK);
    el.countdown.hidden = true;
    markTodayCard(event.date);
  }

  function showCountdown(event) {
    const start = eventStart(event);
    const weekday = start.toLocaleDateString("de-DE", { weekday: "short" });
    const dayMonth = start.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    });

    el.label.textContent = "Nächstes Event";
    el.event.textContent = `${weekday} ${dayMonth} — ${event.name}`;
    setSpecial(SPECIAL_FALLBACK);
    el.countdown.hidden = false;

    function tick() {
      const diff = start - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        render();
        return;
      }
      const mins = Math.floor(diff / 60000);
      el.days.textContent = Math.floor(mins / 1440);
      el.hours.textContent = Math.floor((mins % 1440) / 60);
      el.mins.textContent = mins % 60;
    }

    const timer = setInterval(tick, 1000);
    tick();
  }

  function showFinished() {
    el.label.textContent = "Das war's";
    el.event.textContent = "Danke, Fulda!";
    setSpecial([
      {
        text: "Der 63. Hessentag im S-Club ist Geschichte — wir sehen uns auf der nächsten Party.",
      },
    ]);
    el.countdown.hidden = true;
  }

  function render() {
    const today = effectiveToday();

    const current = EVENTS.find((event) => event.date === today);
    if (current) {
      showToday(current);
      return;
    }

    const next = EVENTS.find((event) => event.date > today);
    if (next) {
      showCountdown(next);
      return;
    }

    showFinished();
  }

  render();
})();
