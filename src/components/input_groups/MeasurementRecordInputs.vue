<script setup lang="ts">
import IdInput from '@/components/inputs/IdInput.vue'
import CreatedAtInput from '@/components/inputs/CreatedAtInput.vue'
import ParentIdSelect from '@/components/inputs/ParentIdSelect.vue'
import NoteInput from '@/components/inputs/NoteInput.vue'
import RecordStatusSelect from '@/components/inputs/RecordStatusSelect.vue'
import ParentTypeSelect from '@/components/inputs/ParentTypeSelect.vue'
import ValueInput from '@/components/inputs/ValueInput.vue'
</script>

<template>
  <IdInput />
  <CreatedAtInput />
  <ParentIdSelect />
  <NoteInput />
  <RecordStatusSelect />
  <ParentTypeSelect />
  <ValueInput />
</template>
