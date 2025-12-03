<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="h-16"></header>

    <main class="relative isolate flex-1 overflow-hidden">
      <div class="absolute inset-0">
        <NuxtImg src="/images/bgphoto.png" alt="Lake" class="h-full w-full object-cover opacity-70" />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/75 to-slate-950"></div>
      </div>

      <div class="relative mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        <div class="max-w-3xl space-y-6">
          <p class="text-xs uppercase tracking-[0.35em] text-slate-300">Geoportal</p>
          <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Clear water intelligence for North Kazakhstan
          </h1>
          <p class="text-base leading-relaxed text-slate-200">
            Explore hydrological parameters of lakes and rivers, assess pathogen risk, and stay aligned with regional
            water stewardship goals through a focused, interactive map experience.
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/map"
              class="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Launch the map
            </NuxtLink>
            <NuxtLink
              to="/temperature"
              class="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white hover:bg-white/10">
              Browse water bodies
            </NuxtLink>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-slate-950">
              <span class="text-base font-semibold">01</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-white">Real-time positions</p>
              <p class="text-sm text-slate-300">Accurate coordinates for every lake, reservoir, and river we monitor.</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950">
              <span class="text-base font-semibold">02</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-white">Risk visibility</p>
              <p class="text-sm text-slate-300">Quickly understand pathogen risk levels through clear status badges.</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur sm:col-span-2 lg:col-span-1">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-sky-500 text-slate-950">
              <span class="text-base font-semibold">03</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-white">Field-ready</p>
              <p class="text-sm text-slate-300">Responsive layouts and concise cards designed for both desktop and mobile crews.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur sm:p-7">
          <div class="max-w-xl space-y-2">
            <p class="text-sm font-semibold text-white">Aligned with local stewardship</p>
            <p class="text-sm text-slate-300">
              Built for North Kazakhstan Region teams to monitor water bodies with clarity, share updates, and act fast when
              conditions change.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/20">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Data focused
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/20">
              <span class="h-2 w-2 rounded-full bg-sky-400"></span>
              Responsive UI
            </span>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>
