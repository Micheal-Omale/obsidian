<template>
  <aside class="sidebar-wrapper w-full md:w-64 shrink-0 md:pr-12 md:border-r border-white/20 h-full hidden md:block select-none">
    
    <!-- Filter Category -->
    <div class="filter-block mb-12">
      <h3 class="font-black text-lg uppercase tracking-widest mb-6 border-b border-white/30 pb-3">[ CATEGORY ]</h3>
      <ul class="space-y-4 text-xs font-bold tracking-[0.2em] text-[#666]">
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">ALL ITEMS</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">HEAVY METALS</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">RAW CERAMIC</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">TECHNICAL GEAR</li>
      </ul>
    </div>

    <!-- Filter Brand -->
    <div class="filter-block mb-12">
      <h3 class="font-black text-lg uppercase tracking-widest mb-6 border-b border-white/30 pb-3">[ BRAND ]</h3>
      <ul class="space-y-4 text-xs font-bold tracking-[0.2em] text-[#666]">
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">OBSIDIAN LABS</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">VOID INC.</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">STUDIO_04</li>
      </ul>
    </div>

    <!-- Filter Parameters -->
    <div class="filter-block">
      <h3 class="font-black text-lg uppercase tracking-widest mb-6 border-b border-white/30 pb-3">[ PRICE DATA ]</h3>
      <ul class="space-y-4 text-xs font-bold tracking-[0.2em] text-[#666]">
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">&lt; $100 : ENTRY</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">$100 - $300 : CORE</li>
        <li class="cursor-pointer hover:text-white hover:line-through transition-all duration-300">&gt; $300 : PREMIUM</li>
      </ul>
    </div>

  </aside>
</template>

<style scoped>
/* Fallback Brutalist Utility Classes */
.w-full { width: 100%; }
.shrink-0 { flex-shrink: 0; }
.mb-12 { margin-bottom: 3rem; }
.mb-6 { margin-bottom: 1.5rem; }
.border-b { border-bottom-width: 1px; }
.border-white\/30 { border-color: rgba(255, 255, 255, 0.3); }
.pb-3 { padding-bottom: 0.75rem; }
.cursor-pointer { cursor: pointer; }
.hover\:text-white:hover { color: #ffffff; }
.hover\:line-through:hover { text-decoration: line-through; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-300 { transition-duration: 300ms; }
.text-lg { font-size: 1.125rem; }
.text-xs { font-size: 0.75rem; }
.font-black { font-weight: 900; }
.font-bold { font-weight: 700; }
.uppercase { text-transform: uppercase; }
.tracking-widest { letter-spacing: 0.1em; }
.tracking-\[0\.2em\] { letter-spacing: 0.2em; }
.text-\[\#666\] { color: #666; }
.space-y-4 > * + * { margin-top: 1rem; }
.select-none { user-select: none; }

@media (min-width: 768px) {
  .md\:w-64 { width: 16rem; }
  .md\:pr-12 { padding-right: 3rem; }
  .md\:border-r { border-right-width: 1px; }
  .md\:block { display: block; }
}
.hidden { display: none; }
</style>
