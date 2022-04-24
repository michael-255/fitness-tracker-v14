<script setup lang="ts">
import {
  QBtn,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QDrawer,
  QPageContainer,
  QList,
} from 'quasar'
import DrawerItem from '@/components/shared/DrawerItem.vue'
import { useUIStore } from '@/stores/ui'
import { Views, Icons } from '@/constants'

const ui = useUIStore()
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader bordered elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="ui.toggleDrawer()" />

        <QToolbarTitle>Menu Layout</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: Views.DASHBOARD }" :icon="Icons.DASHBOARD" label="Dashboard" />
        <DrawerItem :to="{ name: Views.CHARTS }" :icon="Icons.CHART" label="Charts" />
        <DrawerItem :to="{ name: Views.MANAGEMENT }" :icon="Icons.MANAGEMENT" label="Management" />
        <DrawerItem :to="{ name: Views.SETTINGS }" :icon="Icons.SETTINGS" label="Settings" />
        <DrawerItem :to="{ name: Views.ABOUT }" :icon="Icons.INFO" label="About" />
        <DrawerItem to="/example404" :icon="Icons.WARN" label="Not Found" />
      </QList>
    </QDrawer>

    <QPageContainer class="q-mx-sm">
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
