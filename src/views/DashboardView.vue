<script setup lang="ts">
import { QBtn } from 'quasar'
import IdInput from '@/components/shared/IdInput.vue'
import CreatedAtInput from '@/components/shared/CreatedAtInput.vue'
import FinishedAtInput from '@/components/shared/FinishedAtInput.vue'
import NameInput from '@/components/shared/NameInput.vue'
import TextBlockInput from '@/components/shared/TextBlockInput.vue'
import { ref, type Ref } from 'vue'
import { createId } from '@/utils/build-id'
import type { Id, CreatedAt, FinishedAt, ActivityName, TextBlock } from '@/constants/types'
import { database } from '@/services/LocalDatabase'
import { DBTable } from '@/constants/enums'
import { useDateFormat } from '@vueuse/core'

const dateFormat = useDateFormat(new Date(), 'YYYY-MM-DDTHH:mm:ss.000')

const id: Ref<Id> = ref(createId())
const createdAt: Ref<CreatedAt> = ref(new Date().toISOString())
const finishedAt: Ref<FinishedAt> = ref('')
const name: Ref<ActivityName> = ref('My Activity')
const description: Ref<TextBlock> = ref(null)
const note: Ref<TextBlock> = ref(null)

async function testDB() {
  const obj = {
    id: id.value,
    createdAt: createdAt.value,
    name: 'TESTING',
  }
  await database.updateById(DBTable.EXERCISES, '1111-1111-1111', obj)
}
</script>

<template>
  <h3>Dashboard</h3>

  {{ dateFormat }}Z

  <QBtn color="primary" label="Print" @click="testDB()" />

  <IdInput :id="id" @update:id="id = $event" />
  <CreatedAtInput :createdAt="createdAt" @update:createdAt="createdAt = $event" />
  <FinishedAtInput :finishedAt="finishedAt" @update:finishedAt="finishedAt = $event" />
  <NameInput :name="name" @update:name="name = $event" />
  <TextBlockInput :text="description" label="Description" @update:text="description = $event" />
  <TextBlockInput :text="note" label="Note" @update:text="note = $event" />
</template>
