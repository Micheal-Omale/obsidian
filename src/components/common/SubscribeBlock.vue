<template>
  <div class="sub-block w-full bg-white text-black py-32 px-8 flex flex-col md:flex-row items-center justify-between border-t border-b border-white select-none relative z-10 my-32">
    <!-- Massive Text Area -->
    <div class="mb-12 md:mb-0 w-full md:w-1/2">
      <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none m-0">TRANSMIT<br>PROTOCOL</h2>
      <p class="mt-8 font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#555]">Establish direct server link for updates.</p>
    </div>
    
    <!-- Violent Input Box -->
    <div class="w-full md:w-1/2 flex flex-col md:flex-row border-b-4 border-black pb-2 items-center">
      <input type="email" placeholder="ENTER YOUR EMAIL DATA" class="w-full bg-transparent outline-none font-bold text-sm tracking-widest placeholder-black/30 uppercase py-4" />
      <button class="shrink-0 bg-black text-white px-10 py-5 font-black text-xs tracking-[0.3em] uppercase hover:bg-[#333] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto mt-6 md:mt-0 shadow-lg shadow-black/20">
        [ INITIATE SUB ]
      </button>
    </div>
  </div>
</template>

<style scoped>
.w-full { width: 100%; }
.bg-white { background-color: #ffffff; }
.text-black { color: #000000; }
.py-32 { padding-top: 8rem; padding-bottom: 8rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.border-b-4 { border-bottom-width: 4px; border-bottom-style: solid; }
.border-black { border-color: #000000; }
.pb-2 { padding-bottom: 0.5rem; }
.font-black { font-weight: 900; }
.font-bold { font-weight: 700; }
.uppercase { text-transform: uppercase; }
.tracking-tighter { letter-spacing: -0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
.tracking-\[0\.3em\] { letter-spacing: 0.3em; }
.leading-none { line-height: 1; }
.m-0 { margin: 0; }
.mt-8 { margin-top: 2rem; }
.mt-6 { margin-top: 1.5rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
.bg-transparent { background-color: transparent; }
.outline-none { outline: 2px solid transparent; outline-offset: 2px; }
.shrink-0 { flex-shrink: 0; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-300 { transition-duration: 300ms; }
.my-32 { margin-top: 8rem; margin-bottom: 8rem; }
.select-none { user-select: none; }
.hover\:bg-\[\#333\]:hover { background-color: #333333; cursor: pointer; }
.hover\:-translate-y-1:hover { transform: translateY(-0.25rem); }
input { border: none !important; }

@media (min-width: 768px) {
  .md\:flex-row { flex-direction: row; }
  .md\:mb-0 { margin-bottom: 0; }
  .md\:w-1\/2 { width: 50%; }
  .md\:w-auto { width: auto; }
  .md\:mt-0 { margin-top: 0; }
  .md\:text-7xl { font-size: 4.5rem; }
  .md\:text-xs { font-size: 0.75rem; }
}
.text-4xl { font-size: 2.25rem; }
.text-sm { font-size: 0.875rem; }
.text-\[10px\] { font-size: 10px; }
</style>
