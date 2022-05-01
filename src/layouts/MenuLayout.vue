<script setup lang="ts">
import { QBtn, QLayout, QHeader, QToolbar, QToolbarTitle, QDrawer, QPageContainer, QList, QSeparator } from 'quasar'
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

        <QToolbarTitle>Fitness Tracker</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: Views.DASHBOARD }" :icon="Icons.DASHBOARD" label="Dashboard" />
        <DrawerItem :to="{ name: Views.CHARTS }" :icon="Icons.CHART" label="Charts" />
        <QSeparator />
        <DrawerItem :to="{ name: Views.MEASUREMENTS }" :icon="Icons.MEASUREMENT" label="Measurements" />
        <DrawerItem :to="{ name: Views.EXERCISES }" :icon="Icons.EXERCISE" label="Exercises" />
        <DrawerItem :to="{ name: Views.WORKOUTS }" :icon="Icons.WORKOUT" label="Workouts" />
        <QSeparator />
        <DrawerItem :to="{ name: Views.OPTIONS }" :icon="Icons.SETTINGS" label="Options" />
        <DrawerItem :to="{ name: Views.ABOUT }" :icon="Icons.INFO" label="About" />
      </QList>
    </QDrawer>

    <QPageContainer class="q-mx-sm">
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
