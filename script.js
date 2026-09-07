
document.addEventListener("DOMContentLoaded", () => {
  loadPlanets();
  setupVideo();
  setupContactForm();
});


const PLANETS_ENDPOINT = "https://anurella.github.io/json/planets.json";

async function loadPlanets() {
  const grid = document.getElementById("planetGrid");

  try {
    const response = await fetch(PLANETS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const planets = await response.json();
    renderPlanets(grid, planets);
  } catch (error) {
    console.error("Could not load planet data:", error);
    grid.innerHTML = `<p class="grid-status is-error">We couldn't load planet data right now. Please refresh the page.</p>`;
  }
}

function renderPlanets(grid, planets) {
  if (!Array.isArray(planets) || planets.length === 0) {
    grid.innerHTML = `<p class="grid-status">No planet data available.</p>`;
    return;
  }

  const distanceFormatter = new Intl.NumberFormat("en-US");

  grid.innerHTML = planets
    .map(({ planet, distanceFromSun, image }) => `
      <figure class="planet-card">
        <img src="${image}" alt="${planet}" loading="lazy">
        <figcaption>
          <span class="planet-name">${planet}</span>
          <span class="planet-distance">${distanceFormatter.format(distanceFromSun)} million km from the Sun</span>
        </figcaption>
      </figure>
    `)
    .join("");
}


function setupVideo() {
  const video = document.getElementById("aboutVideo");
  const toggle = document.getElementById("videoToggle");
  const iconPlay = toggle.querySelector(".icon-play");
  const iconPause = toggle.querySelector(".icon-pause");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showPlayIcon = () => {
    iconPlay.hidden = false;
    iconPause.hidden = true;
    toggle.setAttribute("aria-label", "Play video");
    toggle.setAttribute("aria-pressed", "false");
  };
  const showPauseIcon = () => {
    iconPlay.hidden = true;
    iconPause.hidden = false;
    toggle.setAttribute("aria-label", "Pause video");
    toggle.setAttribute("aria-pressed", "true");
  };

  if (prefersReducedMotion) {
    video.pause();
    video.removeAttribute("autoplay");
    showPlayIcon();
  } else {
    showPauseIcon();
  }

  toggle.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      showPauseIcon();
    } else {
      video.pause();
      showPlayIcon();
    }
  });

  video.addEventListener("ended", showPlayIcon);
}


const CONTACT_ENDPOINT = "https://whitebricks.com/tsacademy.php";


const MESSAGE_MAX_LENGTH = 100;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const message = document.getElementById("message");
  const messageCount = document.getElementById("messageCount");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  updateCharCount();
  message.addEventListener("input", updateCharCount);

  function updateCharCount() {
    const remaining = MESSAGE_MAX_LENGTH - message.value.length;
    messageCount.textContent = `${remaining} characters remaining`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const values = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    const errors = validate(values);
    renderErrors(errors);

    if (Object.keys(errors).length > 0) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.classList.add("is-error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      status.textContent = "Thanks — your message has been sent. We'll get back to you soon.";
      status.classList.add("is-success");
      form.reset();
      updateCharCount();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      status.textContent = "Something went wrong sending your message. Please try again in a moment.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
}

function validate({ fullName, email, phone, message }) {
  const errors = {};

  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (message.length === 0) {
    errors.message = "Please enter a message.";
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  return errors;
}

function renderErrors(errors) {
  const fields = ["fullName", "email", "phone", "message"];

  fields.forEach((name) => {
    const input = document.getElementById(name);
    const errorEl = document.getElementById(`${name}Error`);
    const field = input.closest(".field");
    const hasError = Boolean(errors[name]);

    field.classList.toggle("has-error", hasError);
    errorEl.textContent = hasError ? errors[name] : "";
    input.setAttribute("aria-invalid", hasError ? "true" : "false");
  });
}
