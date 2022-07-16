<script setup lang="ts">
import {
  DialogType,
  DBTable,
  MeasurementType,
  ActivityStatus,
  LogLevel,
  Icon,
} from '@/constants/enums'
import { type Ref, ref } from 'vue'
import { Measurement } from '@/models/Measurement'
import { useVModel } from '@vueuse/core'
import { useMessaging } from '@/use/useMessaging'
import IdInput from '@/components/inputs/IdInput.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import NameInput from '@/components/inputs/NameInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import EnumSelect from '@/components/inputs/EnumSelect.vue'
import FullscreenDialog from '@/components/dialogs/FullscreenDialog.vue'
import { database } from '@/services/LocalDatabase'

const { log, notify } = useMessaging()

const props = defineProps<{
  measurement: any // Database item
  dialogType: DialogType
  table: DBTable
  dialog: boolean
}>()

const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
  (event: 'saved'): void
}>()

const dialog = useVModel(props, 'dialog', emits)

const id: Ref<string> = ref('')
const createdAt: Ref<string> = ref('')
const name: Ref<string> = ref('')
const description: Ref<string> = ref('')
const status: Ref<ActivityStatus> = ref(ActivityStatus.ENABLED)
const type: Ref<MeasurementType> = ref(MeasurementType.INCHES)

function updateDialog(event: any): void {
  emits('update:dialog', event)
  emits('saved')
}

function clearRefs(): void {
  id.value = ''
  createdAt.value = ''
  name.value = ''
  description.value = ''
  status.value = ActivityStatus.ENABLED
  type.value = MeasurementType.INCHES
}

async function onSave(): Promise<void> {
  try {
    switch (props.dialogType) {
      case DialogType.CREATE:
        await database.add<Measurement>(
          DBTable.MEASUREMENTS,
          new Measurement({
            id: id.value,
            createdAt: createdAt.value,
            name: name.value,
            description: description.value,
            status: status.value,
            type: type.value,
          })
        )
        notify(`Measurement ${name.value} Created`)
        break
      case DialogType.EDIT:
        await database.updateById<Measurement>(
          DBTable.MEASUREMENTS,
          id.value,
          new Measurement({
            id: id.value,
            createdAt: createdAt.value,
            name: name.value,
            description: description.value,
            status: status.value,
            type: type.value,
          })
        )
        notify(`Measurement ${name.value} Updated`)
        break
    }
  } catch (error) {
    const callerName = `onSave:measurement`
    log({ error, level: LogLevel.ERROR, callerName })
    notify(`Error with operation: ${callerName}`, Icon.ACTIVE, 'negative')
  }

  clearRefs()
  emits('saved')
}
</script>

<template>
  <FullscreenDialog
    :dialogType="dialogType"
    :table="table"
    :dialog="dialog"
    @update:dialog="updateDialog($event)"
    @on-save="onSave()"
  >
    <div v-if="dialogType === DialogType.DETAILS">
      <div v-for="(value, key, i) in measurement" :key="i">
        <div class="q-mb-sm">
          <div class="text-subtitle1 text-weight-bold">{{ key }}</div>
          <div>{{ value || '-' }}</div>
        </div>
      </div>
    </div>

    <div v-else>
      <IdInput :id="id" @update:id="id = $event" />
      <DateInput :date="createdAt" label="Created Date" @update:date="createdAt = $event" />
      <NameInput :name="name" @update:name="name = $event" />
      <TextAreaInput :text="description" label="Description" @update:text="description = $event" />
      <EnumSelect label="Activity Status" :value="status" @update:value="status = $event" />
      <EnumSelect label="Type" :value="type" @update:value="type = $event" />
    </div>
  </FullscreenDialog>
</template>
