<template>
  <div class="sub-block">
    <!-- Massive Text Area -->
    <div class="sub-text">
      <h2 class="sub-heading">TRANSMIT<br>PROTOCOL</h2>
      <p class="sub-desc">Establish direct server link for updates.</p>
    </div>
    
    <!-- Violent Input Box -->
    <div class="sub-input-wrap">
      <input type="email" placeholder="ENTER YOUR EMAIL DATA" class="sub-input" />
      <button class="sub-btn">
        [ INITIATE SUB ]
      </button>
    </div>
  </div>
</template>

<style scoped>
.sub-block {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #000000;
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  user-select: none;
  position: relative;
  z-index: 10;
  margin: 4rem 0;
  gap: 2.5rem;
}

.sub-text {
  width: 100%;
  margin-bottom: 0;
}

.sub-heading {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 8vw, 4.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0;
  color: #000000;
}

.sub-desc {
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #555555;
}

.sub-input-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 4px solid #000000;
  padding-bottom: 0.5rem;
  gap: 1rem;
}

.sub-input {
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none !important;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 0;
  color: #000000;
  box-sizing: border-box;
}

.sub-input::placeholder {
  color: rgba(0, 0, 0, 0.3);
}

.sub-btn {
  width: 100%;
  flex-shrink: 0;
  background-color: #000000;
  color: #ffffff;
  padding: 1.25rem 2.5rem;
  font-weight: 900;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.sub-btn:hover {
  background-color: #333333;
  transform: translateY(-0.25rem);
}

/* ── Tablet and up ── */
@media (min-width: 768px) {
  .sub-block {
    flex-direction: row;
    align-items: center;
    padding: 8rem 3rem;
    margin: 8rem 0;
    gap: 3rem;
  }

  .sub-text {
    width: 50%;
  }

  .sub-heading {
    font-size: 4.5rem;
  }

  .sub-desc {
    font-size: 0.75rem;
  }

  .sub-input-wrap {
    width: 50%;
    flex-direction: row;
    align-items: center;
    gap: 0;
  }

  .sub-btn {
    width: auto;
  }
}
</style>
