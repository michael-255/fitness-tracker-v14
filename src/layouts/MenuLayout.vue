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
  QSeparator,
} from 'quasar'
import DrawerItem from '@/components/drawer/DrawerItem.vue'
import { useUIStore } from '@/stores/ui'
import { Views, Icon } from '@/constants/enums'

const ui = useUIStore()
</script>

<template>
  <QLayout view="hHh lpR lFf">
    <QHeader elevated class="bg-primary text-white">
      <QToolbar>
        <QBtn dense flat round icon="menu" @click="ui.toggleDrawer()" />

        <QToolbarTitle>Fitness Tracker</QToolbarTitle>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="ui.drawer" :width="200" show-if-above side="left" bordered>
      <QList>
        <DrawerItem :to="{ name: Views.DASHBOARD }" :icon="Icon.DASHBOARD" label="Dashboard" />
        <DrawerItem :to="{ name: Views.ACTIVE }" :icon="Icon.ACTIVE" label="Active" />
        <QSeparator />
        <DrawerItem
          :to="{ name: Views.MEASUREMENTS }"
          :icon="Icon.MEASUREMENTS"
          label="Measurements"
        />
        <DrawerItem :to="{ name: Views.EXERCISES }" :icon="Icon.EXERCISES" label="Exercises" />
        <DrawerItem :to="{ name: Views.WORKOUTS }" :icon="Icon.WORKOUTS" label="Workouts" />
        <QSeparator />
        <DrawerItem :to="{ name: Views.APPLOGS }" :icon="Icon.APPLOGS" label="App Logs" />
        <DrawerItem :to="{ name: Views.OPTIONS }" :icon="Icon.SETTINGS" label="Options" />
        <DrawerItem :to="{ name: Views.ABOUT }" :icon="Icon.INFO" label="About" />
      </QList>
    </QDrawer>

    <QPageContainer>
      <router-view />
    </QPageContainer>
  </QLayout>
</template>
