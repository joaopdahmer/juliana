const RELATIONSHIP_START = new Date("2026-03-08T21:52:00-03:00");

const daysElement = document.querySelector("#days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");

function updateCounter() {
  const now = new Date();
  const difference = Math.max(0, now.getTime() - RELATIONSHIP_START.getTime());

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  daysElement.textContent = Math.floor(difference / day);
  hoursElement.textContent = String(
    Math.floor((difference % day) / hour)
  ).padStart(2, "0");

  minutesElement.textContent = String(
    Math.floor((difference % hour) / minute)
  ).padStart(2, "0");

  secondsElement.textContent = String(
    Math.floor((difference % minute) / second)
  ).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

const elementsToReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  elementsToReveal.forEach((element) => observer.observe(element));
} else {
  elementsToReveal.forEach((element) => element.classList.add("visible"));
}
