<script setup lang="ts">
import { QBtn, QLayout, QHeader, QToolbar, QToolbarTitle, QPageContainer } from 'quasar'
import { useRouter } from 'vue-router'
import { Views } from '@/constants/enums'

const router = useRouter()
</script>

<template>
  <QLayout elevated view="hHh lpR lFf">
    <QHeader class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="home" @click="router.push({ name: Views.DASHBOARD })" />

        <QToolbarTitle>Back to Dashboard</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
