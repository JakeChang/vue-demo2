<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" href="/">Vue Demo</a>
    </div>
    <div class="flex-none">
      <a class="btn">
        <router-link to="/post">新增文章</router-link></a>
    </div>
  </div>

  <router-view />
</template>
