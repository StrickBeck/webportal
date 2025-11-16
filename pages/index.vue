<template>
  <section class="relative h-screen w-full overflow-hidden">
    <img
      src="/public/images/bgphoto.png"
      alt="Lake"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-black/35"></div>

    <div class="relative z-10 flex h-full items-center px-8 md:px-20">
      <div class="max-w-2xl text-white">
        <p class="uppercase tracking-[0.35em] mb-3 text-sm">
          SKOHydroVision
        </p>

        <h1 class="text-4xl md:text-6xl font-semibold tracking-widest mb-4">
          Welcome to
        </h1>

        <p class="max-w-xl text-sm md:text-base leading-relaxed mb-8">
          Explore the hydrological parameters of North Kazakhstan's reservoirs
          and the risk of pathogen infection through our interactive geoportal.
        </p>

        <NuxtLink
          to="/index"
          class="inline-flex items-center rounded-full bg-white text-slate-900 px-8 py-3 text-sm md:text-base font-semibold shadow-lg hover:bg-slate-200 transition"
        >
          Discover More
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
