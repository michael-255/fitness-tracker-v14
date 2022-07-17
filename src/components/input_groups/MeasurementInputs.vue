<script setup lang="ts">
import IdInput from '@/components/inputs/IdInput.vue'
import CreatedAtInput from '@/components/inputs/CreatedAtInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import DescriptionInput from '@/components/inputs/DescriptionInput.vue'
import ActivityStatusSelect from '@/components/inputs/ActivityStatusSelect.vue'
import MeasurementTypeSelect from '@/components/inputs/MeasurementTypeSelect.vue'
</script>

<template>
  <IdInput />
  <CreatedAtInput />
  <NameInput />
  <DescriptionInput />
  <ActivityStatusSelect />
  <MeasurementTypeSelect />
</template>
